import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import { getCompetitions, getNextMatchesByHall, getNow } from '@/lib/schedule'
import { days } from '@/lib/tournaments'
import MatchRow, { time } from './MatchRow'
import TestDataNotice from './TestDataNotice'

// Startseite: laufende und nächste Spiele je Halle, darunter Schnellzugriff auf alle Konkurrenzen
export default async function NextMatches() {
  const [hallMatches, now, competitions] = await Promise.all([getNextMatchesByHall(3), getNow(), getCompetitions()])
  const today = days.find((day) => day.isoDate === now.slice(0, 10))

  return (
    <section id="spielplan" aria-labelledby="spielplan-title" className="scroll-mt-20 bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-red uppercase">
              <span className="size-2 animate-pulse bg-red" />
              Live aus den Hallen
            </p>
            <h2 id="spielplan-title" className="mt-3 text-3xl font-extrabold tracking-tight text-navy uppercase sm:text-4xl">
              Nächste Spiele
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Stand: {today ? `${today.weekday}, ${today.date}` : now.slice(0, 10)} · {time(now)} Uhr
            </p>
            <TestDataNotice className="mt-4" />
          </div>
          <Link
            href="/spielplan"
            className="flex shrink-0 items-center justify-center gap-1 bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Zum kompletten Spielplan
            <Icon name="chevron_right" className="size-5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {hallMatches.map(({ hall, matches }) => (
            <article key={hall.id} className="bg-white ring-1 ring-gray-200">
              <h3 className="flex items-center justify-between bg-navy px-4 py-3 text-sm font-bold tracking-wide text-white uppercase">
                {hall.name}
              </h3>
              {matches.length ? (
                <ul className="divide-y divide-gray-100">
                  {matches.map((match) => (
                    <li key={match.id}>
                      <Link href={`/spielplan/${match.competition}`} className="block transition-colors hover:bg-gray-50">
                        <MatchRow
                          match={match}
                          showHall={false}
                          context={`${match.competitionName}${match.group ? ` · Gruppe ${match.group}` : match.label ? ` · ${match.label}` : ''}${match.status === 'live' ? ' · läuft' : ''}`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-8 text-center text-sm text-gray-500">In dieser Halle stehen keine Spiele mehr an.</p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {days.map((day) => (
            <div key={day.slug} className="bg-white p-5 ring-1 ring-gray-200">
              <p className="text-xs font-semibold text-red">{day.date}</p>
              <p className="mt-1 text-lg font-bold text-navy">{day.weekday}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {competitions
                  .filter((competition) => competition.day.slug === day.slug)
                  .map((competition) => (
                    <li key={competition.slug}>
                      <Link
                        href={`/spielplan/${competition.slug}`}
                        className="inline-flex items-center gap-1 border border-gray-200 px-2.5 py-1 text-sm font-semibold text-navy transition-colors hover:border-red hover:text-red"
                      >
                        {competition.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
