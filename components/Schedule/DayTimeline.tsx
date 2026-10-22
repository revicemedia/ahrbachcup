import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import { halls, type HallId, type MatchStatus } from '@/lib/schedule'
import { StatusBadge, time } from './MatchRow'

export type TimelineCompetition = {
  slug: string
  name: string
  badge: string
  status: MatchStatus
  timeRange: string
  champion?: string
  groupCount: number
  matchCount: number
  // erstes bis letztes Spiel je Halle, Ortszeit wie '2027-01-09T12:00'
  bars: { hall: HallId; start: string; end: string }[]
}

// eine Farbe je Konkurrenz des Tages
const colors = ['bg-navy text-white', 'bg-red text-white', 'bg-gold text-navy', 'bg-slate-blue text-white']

const minutes = (dateTime: string) => Number(dateTime.slice(11, 13)) * 60 + Number(dateTime.slice(14, 16))

// Balken einer Halle auf Spuren verteilen, damit sich wechselnde Konkurrenzen nicht überdecken
function lanes<T extends { start: string; end: string }>(bars: T[]) {
  const ends: string[] = []
  return [...bars]
    .sort((a, b) => a.start.localeCompare(b.start))
    .map((bar) => {
      let lane = ends.findIndex((end) => end <= bar.start)
      if (lane === -1) lane = ends.push(bar.end) - 1
      else ends[lane] = bar.end
      return { ...bar, lane }
    })
}

// Zeitachse eines Turniertags mit Halle I und II, darunter die Konkurrenzen als Liste
export default function DayTimeline({ competitions, now, isoDate }: { competitions: TimelineCompetition[]; now: string; isoDate: string }) {
  const allBars = competitions.flatMap((competition, index) => competition.bars.map((bar) => ({ ...bar, competition, color: colors[index % colors.length] })))
  const firstHour = Math.floor(Math.min(...allBars.map((bar) => minutes(bar.start))) / 60)
  const lastHour = Math.ceil(Math.max(...allBars.map((bar) => minutes(bar.end))) / 60)
  const span = (lastHour - firstHour) * 60
  const position = (dateTime: string) => ((minutes(dateTime) - firstHour * 60) / span) * 100
  const hours = Array.from({ length: lastHour - firstHour + 1 }, (_, index) => firstHour + index)
  const showNow = now.slice(0, 10) === isoDate && position(now) >= 0 && position(now) <= 100

  return (
    <div className="flex flex-col gap-4">
      {/* Zeitleiste ab md; auf dem Handy reicht die Liste darunter */}
      <div className="hidden bg-white p-6 ring-1 ring-gray-200 md:block">
        <div className="grid grid-cols-[5.5rem_1fr] gap-x-4">
          <div />
          <div className="relative h-6 text-xs font-semibold text-gray-500 tabular-nums">
            {hours.map((hour) => (
              <span key={hour} className="absolute -translate-x-1/2" style={{ left: `${((hour - firstHour) / (lastHour - firstHour)) * 100}%` }}>
                {String(hour).padStart(2, '0')}:00
              </span>
            ))}
          </div>

          {halls.map((hall) => {
            const hallBars = lanes(allBars.filter((bar) => bar.hall === hall.id))
            const laneCount = Math.max(1, ...hallBars.map((bar) => bar.lane + 1))
            return (
              <div key={hall.id} className="contents">
                <div className="flex items-center border-t border-gray-100 py-3 text-sm font-bold text-navy">{hall.short}</div>
                <div className="relative border-t border-gray-100 py-3" style={{ height: `${laneCount * 2.75 + 1.5}rem` }}>
                  {hours.map((hour) => (
                    <span
                      key={hour}
                      aria-hidden="true"
                      className="absolute inset-y-0 w-px bg-gray-100"
                      style={{ left: `${((hour - firstHour) / (lastHour - firstHour)) * 100}%` }}
                    />
                  ))}
                  {hallBars.map((bar) => (
                    <Link
                      key={`${bar.competition.slug}-${bar.hall}`}
                      href={`/spielplan/${bar.competition.slug}`}
                      title={`${bar.competition.name}: ${time(bar.start)} – ${time(bar.end)} Uhr in ${hall.name}`}
                      className={`absolute flex h-10 items-center gap-2 overflow-hidden px-2 text-sm font-semibold transition hover:brightness-110 ${bar.color} ${
                        bar.competition.status === 'finished' ? 'opacity-45 hover:opacity-80' : ''
                      }`}
                      style={{ left: `${position(bar.start)}%`, width: `${position(bar.end) - position(bar.start)}%`, top: `${0.75 + bar.lane * 2.75}rem` }}
                    >
                      {bar.competition.status === 'live' && <span className="size-1.5 shrink-0 animate-pulse bg-current" />}
                      <span className="shrink-0 font-black">{bar.competition.badge}</span>
                      <span className="truncate">{bar.competition.name}</span>
                    </Link>
                  ))}
                  {showNow && (
                    <span aria-hidden="true" className="absolute inset-y-0 z-10 w-0.5 bg-red" style={{ left: `${position(now)}%` }} />
                  )}
                </div>
              </div>
            )
          })}

          {showNow && (
            <>
              <div />
              <div className="relative h-6">
                <span className="absolute -translate-x-1/2 bg-red px-1.5 py-0.5 text-[0.65rem] font-bold text-white" style={{ left: `${position(now)}%` }}>
                  Jetzt {time(now)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="divide-y divide-gray-100 bg-white ring-1 ring-gray-200">
        {competitions.map((competition, index) => (
          <li key={competition.slug}>
            <Link
              href={`/spielplan/${competition.slug}`}
              className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 sm:grid-cols-[2.75rem_1fr_auto_auto]"
            >
              <span className={`flex size-11 items-center justify-center text-sm font-black ${colors[index % colors.length]}`}>{competition.badge}</span>
              <span className="min-w-0">
                <span className="block font-bold text-navy">{competition.name}</span>
                <span className="block text-sm text-gray-500">
                  {competition.timeRange} · {competition.groupCount} Gruppen · {competition.matchCount} Spiele
                </span>
                {competition.champion ? (
                  <span className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-navy sm:hidden">
                    <Icon name="trophy" className="size-4 text-gold" />
                    {competition.champion}
                  </span>
                ) : (
                  <span className="mt-1 block sm:hidden">
                    <StatusBadge status={competition.status} />
                  </span>
                )}
              </span>
              <span className="hidden items-center gap-1.5 text-sm font-semibold text-navy sm:flex">
                {competition.champion ? (
                  <>
                    <Icon name="trophy" className="size-5 text-gold" />
                    {competition.champion}
                  </>
                ) : (
                  <StatusBadge status={competition.status} />
                )}
              </span>
              <Icon name="chevron_right" className="size-5 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-red" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
