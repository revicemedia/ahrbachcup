'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import type { ResolvedMatch, StandingRow } from '@/lib/schedule/types'
import MatchRow from './MatchRow'

// Tabelle und Spiele einer Gruppe; Plätze aus qualifiedRanks führen direkt in die K.-o.-Runde und sind markiert.
// Auf dem Handy zugeklappt, damit man bei vielen Gruppen schnell die eigene findet; ab lg immer offen.
export default function GroupCard({
  name,
  table,
  matches,
  qualifiedRanks,
}: {
  name: string
  table: StandingRow[]
  matches: ResolvedMatch[]
  qualifiedRanks: number[]
}) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const live = matches.some((match) => match.status === 'live')
  // erst markieren, wenn in der Gruppe schon gespielt wurde; vorher sagt die Reihenfolge nichts aus
  const started = table.some((row) => row.played > 0)
  const isMarked = (index: number) => started && qualifiedRanks.includes(index + 1)

  return (
    <article className="flex min-w-0 flex-col bg-white ring-1 ring-gray-200">
      <h3 className="bg-navy text-white">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center gap-3 px-4 py-3 text-left lg:pointer-events-none"
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
              Gruppe {name}
              {live && (
                <span className="inline-flex items-center gap-1 bg-red px-1.5 py-0.5 text-xs tracking-wider">
                  <span className="size-1.5 animate-pulse bg-white" />
                  Live
                </span>
              )}
            </span>
          </span>
          <Icon name="keyboard_arrow_down" className={`size-6 shrink-0 transition-transform lg:hidden ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>

      <div id={contentId} className={open ? '' : 'hidden lg:block'}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm tabular-nums">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              <th scope="col" className="w-12 py-2 pl-4 text-left">Pl.</th>
              <th scope="col" className="py-2 text-left">Team</th>
              <th scope="col" className="px-1.5 py-2" title="Spiele">Sp</th>
              <th scope="col" className="hidden px-1.5 py-2 sm:table-cell" title="Siege">S</th>
              <th scope="col" className="hidden px-1.5 py-2 sm:table-cell" title="Unentschieden">U</th>
              <th scope="col" className="hidden px-1.5 py-2 sm:table-cell" title="Niederlagen">N</th>
              <th scope="col" className="px-1.5 py-2">Tore</th>
              <th scope="col" className="px-1.5 py-2" title="Tordifferenz">Diff</th>
              <th scope="col" className="py-2 pr-4 pl-1.5 text-right">Pkt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.map((row, index) => {
              const difference = row.goalsFor - row.goalsAgainst
              return (
                <tr key={row.team} className={isMarked(index) ? 'bg-gold/10' : undefined}>
                  <td className={`py-2 pl-4 font-bold ${isMarked(index) ? 'border-l-4 border-gold pl-3 text-navy' : 'text-gray-400'}`}>
                    {index + 1}
                  </td>
                  <td className="py-2 font-semibold text-navy">
                    <Link href={`/spielplan?team=${encodeURIComponent(row.team)}#mein-team`} className="hover:text-red hover:underline">
                      {row.team}
                    </Link>
                  </td>
                  <td className="px-1.5 py-2 text-center text-gray-600">{row.played}</td>
                  <td className="hidden px-1.5 py-2 text-center text-gray-600 sm:table-cell">{row.won}</td>
                  <td className="hidden px-1.5 py-2 text-center text-gray-600 sm:table-cell">{row.drawn}</td>
                  <td className="hidden px-1.5 py-2 text-center text-gray-600 sm:table-cell">{row.lost}</td>
                  <td className="px-1.5 py-2 text-center whitespace-nowrap text-gray-600">
                    {row.goalsFor}:{row.goalsAgainst}
                  </td>
                  <td className="px-1.5 py-2 text-center text-gray-600">{difference > 0 ? `+${difference}` : difference}</td>
                  <td className="py-2 pr-4 pl-1.5 text-right font-bold text-navy">{row.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h4 className="mt-2 border-t border-gray-200 px-4 pt-4 pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">Spiele</h4>
      <div className="divide-y divide-gray-100">
        {matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
      </div>
    </article>
  )
}
