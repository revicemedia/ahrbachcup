'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Icon from '@/components/Icon/Icon'
import type { ScheduleMatch } from '@/lib/schedule'
import MatchRow from './MatchRow'

type DayInfo = { isoDate: string; weekday: string; date: string }

const normalize = (text: string) => text.toLocaleLowerCase('de').trim()

// Suche nach Team oder Verein über alle Konkurrenzen; der Suchbegriff steht als ?team= in der Adresse,
// damit man den gefilterten Spielplan teilen kann
export default function TeamFilter({ matches, days }: { matches: ScheduleMatch[]; days: DayInfo[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('team') ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  // alle bekannten Teams mit den Konkurrenzen (Kurzname und Name), in denen sie spielen
  const teamCompetitions = useMemo(() => {
    const map = new Map<string, Map<string, string>>()
    for (const match of matches) {
      for (const [name, known] of [[match.homeName, match.homeKnown], [match.awayName, match.awayKnown]] as const) {
        if (known) (map.get(name) ?? map.set(name, new Map()).get(name)!).set(match.competitionShort, match.competitionName)
      }
    }
    return map
  }, [matches])
  const teams = useMemo(() => [...teamCompetitions.keys()].sort((a, b) => a.localeCompare(b, 'de')), [teamCompetitions])

  const needle = normalize(query)
  // genau ein Team gewählt (z. B. "SF Ahrbach-Höhr I")? Dann nur dieses, sonst alle Teams, die den Text enthalten
  const exactTeam = teams.some((team) => normalize(team) === needle)
  const matchesTeam = (name: string, known: boolean) =>
    known && needle.length > 1 && (exactTeam ? normalize(name) === needle : normalize(name).includes(needle))
  const results = needle.length > 1 ? matches.filter((match) => matchesTeam(match.homeName, match.homeKnown) || matchesTeam(match.awayName, match.awayKnown)) : []
  const foundTeams = teams.filter((team) => matchesTeam(team, true))
  // Vorschläge ab dem ersten Buchstaben; ein exakt ausgewähltes Team braucht keine Liste mehr
  const suggestions = needle && !exactTeam ? teams.filter((team) => normalize(team).includes(needle)).slice(0, 8) : []
  const showSuggestions = open && suggestions.length > 0

  const update = (value: string) => {
    setQuery(value)
    setActive(0)
    const params = new URLSearchParams(searchParams)
    if (value.trim()) params.set('team', value.trim())
    else params.delete('team')
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  return (
    <section id="mein-team" aria-label="Spiele eines Teams" className="scroll-mt-32">
      {/* bewusst schlicht: im Mittelpunkt stehen die Spieltage, die Suche ist ein Zusatz */}
      <div className="flex flex-col items-end gap-2">
        <div className="relative w-full sm:w-80">
          <label htmlFor="team-search" className="sr-only">
            Spiele eines Teams oder Vereins anzeigen
          </label>
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
          <input
            id="team-search"
            type="search"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls="team-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={showSuggestions ? `team-option-${active}` : undefined}
            value={query}
            onChange={(event) => {
              update(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            // verzögert, damit ein Klick in die Liste noch ankommt
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={(event) => {
              if (!showSuggestions) return
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActive((index) => (index + 1) % suggestions.length)
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActive((index) => (index - 1 + suggestions.length) % suggestions.length)
              } else if (event.key === 'Enter') {
                event.preventDefault()
                update(suggestions[active])
                setOpen(false)
              } else if (event.key === 'Escape') {
                setOpen(false)
              }
            }}
            placeholder="Team oder Verein suchen"
            autoComplete="off"
            className="w-full border border-gray-200 bg-white py-2 pr-10 pl-10 text-sm text-navy placeholder:text-gray-400 focus:border-navy focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => update('')}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-400 hover:text-red"
            >
              <span className="sr-only">Suche löschen</span>
              <Icon name="close" className="size-4" />
            </button>
          )}
          {showSuggestions && (
            <ul
              id="team-suggestions"
              role="listbox"
              aria-label="Vorschläge"
              className="absolute top-full right-0 z-20 mt-1 w-full sm:w-[26rem] max-h-80 overflow-y-auto border-t-2 border-red bg-white py-1 shadow-lg ring-1 ring-gray-200"
            >
              {suggestions.map((team, index) => {
                const start = normalize(team).indexOf(needle)
                return (
                  <li
                    key={team}
                    id={`team-option-${index}`}
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    // mousedown statt click, damit das Feld den Fokus nicht vorher verliert
                    onMouseDown={(event) => {
                      event.preventDefault()
                      update(team)
                      setOpen(false)
                    }}
                    className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 aria-selected:bg-gray-50"
                  >
                    <span className="truncate text-sm text-gray-700">
                      {team.slice(0, start)}
                      <strong className="font-bold text-navy">{team.slice(start, start + needle.length)}</strong>
                      {team.slice(start + needle.length)}
                    </span>
                    <span className="flex shrink-0 gap-1">
                      {[...(teamCompetitions.get(team) ?? [])].map(([short, name]) => (
                        <span key={short} title={name} className="bg-gray-100 px-1.5 py-0.5 text-[0.65rem] font-bold whitespace-nowrap text-gray-600">
                          {short}
                        </span>
                      ))}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {needle.length > 1 && (
          <p className="text-right text-sm text-gray-600" aria-live="polite">
            {results.length
              ? `${results.length} ${results.length === 1 ? 'Spiel' : 'Spiele'} von ${foundTeams.join(', ')}`
              : 'Kein Team gefunden.'}
          </p>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-4 flex flex-col gap-4">
          {days
            .map((day) => ({ day, matches: results.filter((match) => match.start.startsWith(day.isoDate)) }))
            .filter((group) => group.matches.length)
            .map(({ day, matches: dayMatches }) => (
              <article key={day.isoDate} className="bg-white ring-1 ring-gray-200">
                <h3 className="flex items-center justify-between bg-navy px-4 py-3 text-sm font-bold tracking-wide text-white uppercase">
                  {day.weekday}, {day.date}
                  <span className="text-xs font-semibold tracking-wider text-white/60 normal-case">
                    {dayMatches.length} {dayMatches.length === 1 ? 'Spiel' : 'Spiele'}
                  </span>
                </h3>
                <ul className="divide-y divide-gray-100">
                  {dayMatches.map((match) => (
                    <li key={match.id}>
                      <Link href={`/spielplan/${match.competition}`} className="block transition-colors hover:bg-gray-50">
                        <MatchRow
                          match={match}
                          highlight={needle}
                          context={`${match.competitionName}${match.group ? ` · Gruppe ${match.group}` : match.label ? ` · ${match.label}` : ''}${match.status === 'live' ? ' · läuft' : ''}`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      )}
    </section>
  )
}
