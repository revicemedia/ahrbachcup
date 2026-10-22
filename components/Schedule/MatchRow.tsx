import { winnerSide } from '@/lib/schedule/score'
import { halls, type MatchStatus, type ResolvedMatch } from '@/lib/schedule/types'

export const time = (dateTime: string) => dateTime.slice(11, 16)
export const hallShort = (id: string) => halls.find((hall) => hall.id === id)?.short ?? id

export function ScoreBox({ match, size = 'md' }: { match: ResolvedMatch; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'min-w-14 px-2 py-1 text-sm' : 'min-w-16 px-2.5 py-1.5 text-base'
  if (match.status === 'upcoming' || !match.score) {
    return <span className={`inline-flex justify-center border border-gray-200 font-semibold text-gray-400 tabular-nums ${box}`}>– : –</span>
  }
  return (
    <span className="inline-flex flex-col items-center">
      <span className={`inline-flex justify-center font-bold text-white tabular-nums ${match.status === 'live' ? 'bg-red' : 'bg-navy'} ${box}`}>
        {match.score.home} : {match.score.away}
      </span>
      {match.score.penalties && (
        <span className="mt-0.5 text-[0.65rem] font-semibold whitespace-nowrap text-gray-500">
          {match.score.penalties.home}:{match.score.penalties.away} n. 9m
        </span>
      )}
    </span>
  )
}

export function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-white uppercase">
        <span className="size-1.5 animate-pulse bg-white" />
        Live
      </span>
    )
  }
  return (
    <span
      className={`inline-flex px-2 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase ${
        status === 'finished' ? 'bg-gray-100 text-gray-500' : 'bg-gold text-navy'
      }`}
    >
      {status === 'finished' ? 'Beendet' : 'Anstehend'}
    </span>
  )
}

// Eine Zeile im Spielplan: Uhrzeit und Halle links, Heim – Ergebnis – Gast rechts.
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
  const team = (name: string, known: boolean, side: 'home' | 'away') => {
    const highlighted = known && highlight && name.toLocaleLowerCase('de').includes(highlight)
    const color = !known ? 'text-gray-400 italic' : highlighted ? 'text-red' : winner === side ? 'text-navy' : 'text-gray-700'
    const weight = known && (winner === side || highlighted) ? 'font-bold' : 'font-medium'
    return `min-w-0 text-sm/5 ${side === 'home' ? 'text-right' : 'text-left'} ${color} ${weight}`
  }

  // Kontext (Konkurrenz, Gruppe, Spielnummer) über die ganze Breite, darunter Uhrzeit und Begegnung auf einer Höhe
  return (
    <div className={`px-4 py-3 ${match.status === 'live' ? 'bg-red/5' : ''}`}>
      {context && <p className="mb-1.5 text-[0.65rem] font-semibold tracking-wider text-gray-500 uppercase">{context}</p>}
      <div className="grid grid-cols-[3.25rem_1fr] items-center gap-3">
        <div className="flex flex-col text-xs leading-4">
          <span className="text-sm/5 font-bold text-navy tabular-nums">{time(match.start)}</span>
          {showHall && <span className="text-gray-500">{hallShort(match.hall)}</span>}
        </div>
        <div className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <span className={team(match.homeName, match.homeKnown, 'home')}>{match.homeName}</span>
          <ScoreBox match={match} size="sm" />
          <span className={team(match.awayName, match.awayKnown, 'away')}>{match.awayName}</span>
        </div>
      </div>
    </div>
  )
}
