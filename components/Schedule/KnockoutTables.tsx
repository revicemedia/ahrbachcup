import { stageNames, type ResolvedMatch, type Stage } from '@/lib/schedule'
import MatchRow from './MatchRow'

// in Spielreihenfolge; Platzierungsspiele zum Schluss
const order: Stage[] = ['roundOf16', 'quarterfinal', 'semifinal', 'third', 'final', 'placement']

// Spielnummer wie in den Platzhaltern der nächsten Runde ("Sieger AF1")
const matchNumber = (match: ResolvedMatch) => (match.stage === 'placement' ? `Spiel um Platz ${match.placement}` : match.label)

// K.-o.-Runde als eine Tabelle je Runde; ab lg zweispaltig wie die Gruppen
export default function KnockoutTables({ matches }: { matches: ResolvedMatch[] }) {
  const rounds = order
    .map((stage) => ({
      stage,
      title: stage === 'placement' ? 'Platzierungsspiele' : stageNames[stage],
      matches: matches
        .filter((match) => match.stage === stage)
        .sort((a, b) => (stage === 'placement' ? (a.placement ?? 0) - (b.placement ?? 0) : a.start.localeCompare(b.start))),
    }))
    .filter((round) => round.matches.length)

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {rounds.map((round) => (
        <article key={round.stage} className="min-w-0 bg-white ring-1 ring-gray-200">
          <h3 className="flex items-center justify-between bg-navy px-4 py-3 text-sm font-bold tracking-wide text-white uppercase">
            {round.title}
            <span className="text-xs font-semibold tracking-wider text-white/60 normal-case">
              {round.matches.length} {round.matches.length === 1 ? 'Spiel' : 'Spiele'}
            </span>
          </h3>
          <div className="divide-y divide-gray-100">
            {round.matches.map((match) => (
              <MatchRow key={match.id} match={match} context={round.stage === 'final' || round.stage === 'third' ? undefined : matchNumber(match)} />
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
