import { winnerSide } from '@/lib/schedule/score'
import { halls, type MatchStatus, type ResolvedMatch } from '@/lib/schedule/types'

export const time = (dateTime: string) => dateTime.slice(11, 16)
export const hallShort = (id: string) => halls.find((hall) => hall.id === id)?.short ?? id

export function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red px-2 py-0.5 text-xs font-bold tracking-wider text-white uppercase">
        <span className="size-1.5 animate-pulse bg-white" />
        Live
      </span>
    )
  }
  return (
    <span
      className={`inline-flex px-2 py-0.5 text-xs font-bold tracking-wider uppercase ${
        status === 'finished' ? 'bg-gray-100 text-gray-500' : 'bg-gold text-navy'
      }`}
    >
      {status === 'finished' ? 'Beendet' : 'Anstehend'}
    </span>
  )
}

// Eine Begegnung im Spielplan: Uhrzeit und Halle links, rechts Heim und Gast untereinander mit ihren Toren.
// showHall = false, wenn die Halle schon in der Überschrift darüber steht.
// highlight: Suchbegriff (klein geschrieben); passende Teams werden rot hervorgehoben.
export default function MatchRow({
  match,
  context,
  showHall = true,
  highlight,
}: {
  match: ResolvedMatch
  context?: string
  showHall?: boolean
  highlight?: string
}) {
  const winner = match.status === 'finished' && match.score ? winnerSide(match.score) : undefined
  const teamColor = (name: string, known: boolean, side: 'home' | 'away') => {
    const highlighted = known && highlight && name.toLocaleLowerCase('de').includes(highlight)
    const color = !known ? 'text-gray-400 italic' : highlighted ? 'text-red' : winner === side ? 'text-navy' : 'text-gray-700'
    const weight = known && (winner === side || highlighted) ? 'font-bold' : 'font-medium'
    return `${color} ${weight}`
  }
  const sides = [
    { side: 'home' as const, name: match.homeName, known: match.homeKnown, goals: match.score?.home, penalties: match.score?.penalties?.home },
    { side: 'away' as const, name: match.awayName, known: match.awayKnown, goals: match.score?.away, penalties: match.score?.penalties?.away },
  ]
  const started = match.status !== 'upcoming' && match.score

  // Kontext (Konkurrenz, Gruppe, Spielnummer) über die ganze Breite, darunter Uhrzeit und Begegnung auf einer Höhe
  return (
    <div className={`px-4 py-3 ${match.status === 'live' ? 'bg-red/5' : ''}`}>
      {context && <p className="mb-1.5 text-xs font-semibold tracking-wider text-gray-500 uppercase">{context}</p>}
      <div className="grid grid-cols-[3.25rem_1fr] items-center gap-3">
        <div className="flex flex-col text-xs leading-4">
          <span className="text-sm/5 font-bold text-navy tabular-nums">{time(match.start)}</span>
          {showHall && <span className="text-sm/5 text-gray-500">{hallShort(match.hall)}</span>}
        </div>

        {/* Teams untereinander, Tore rechts daneben: lange Namen brechen nicht um, Zeilen fluchten mit Uhrzeit und Halle */}
        <div className="flex min-w-0 flex-col">
          {sides.map(({ side, name, known, goals, penalties }) => (
            <div key={side} className="flex items-baseline justify-between gap-3">
              {/* pr-1: kursive Platzhalter ("1. Gruppe 5") ragen leicht über ihre Breite hinaus und würden sonst abgeschnitten */}
              <span className={`min-w-0 truncate pr-1 text-sm/5 ${teamColor(name, known, side)}`}>{name}</span>
              {/* Tore so dick wie der Teamname daneben: Sieger fett, Verlierer normal */}
              <span
                className={`shrink-0 text-sm/5 tabular-nums ${
                  !started ? 'font-medium text-gray-300' : match.status === 'live' ? 'font-bold text-red' : winner === side ? 'font-bold text-navy' : 'font-medium text-gray-700'
                }`}
              >
                {started ? goals : '–'}
                {started && penalties !== undefined && <span className="ml-1 text-xs font-semibold text-gray-500">({penalties})</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
