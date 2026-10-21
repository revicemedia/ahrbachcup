import { timeRange, type Day, type Tournament } from '@/lib/tournaments'

// Spaltenzahl je nach Gruppenanzahl, damit zwei Gruppen nicht verloren in vier Spalten stehen
const groupColumns: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export default function DaySection({ day, tinted }: { day: Day; tinted: boolean }) {
  return (
    <section id={day.slug} aria-labelledby={`${day.slug}-title`} className={`scroll-mt-20 py-16 sm:py-20 ${tinted ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-red">{day.date}</p>
            <h3 id={`${day.slug}-title`} className="mt-1 text-4xl font-extrabold tracking-tight text-navy uppercase sm:text-5xl">
              {day.weekday}
            </h3>
          </div>
          <p className="text-base font-medium text-gray-600">{day.headline}</p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {day.tournaments.map((tournament) => (
            <TournamentCard key={tournament.slug} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <article className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5">
      <header className="flex flex-col gap-4 bg-navy px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center bg-gold text-lg font-black text-navy">
            {tournament.badge}
          </span>
          <div>
            <h4 className="text-xl font-bold">{tournament.name}</h4>
            <p className="text-sm text-white/70">{tournament.format}</p>
          </div>
        </div>
        <dl className="flex flex-wrap gap-2 text-sm">
          <div className="bg-white/10 px-3 py-1">
            <dt className="sr-only">Uhrzeit</dt>
            <dd className="font-semibold">{timeRange(tournament)}</dd>
          </div>
          <div className="bg-white/10 px-3 py-1">
            <dt className="sr-only">Startgeld</dt>
            <dd>Startgeld {tournament.fee}</dd>
          </div>
          {tournament.note && (
            <div className="bg-red px-3 py-1">
              <dt className="sr-only">Hinweis</dt>
              <dd className="font-semibold">{tournament.note}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className={`grid grid-cols-1 gap-4 p-6 ${groupColumns[tournament.groups.length] ?? groupColumns[4]}`}>
        {tournament.groups.map((group) => (
          <div key={group.name} className="border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
              <h5 className="text-sm font-bold text-navy uppercase">{group.name}</h5>
              <span className="text-xs text-gray-500">{group.teams.length} Teams</span>
            </div>
            <ol className="divide-y divide-gray-100">
              {group.teams.map((team, index) => (
                <li key={team} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700">
                  <span className="w-4 text-right text-xs font-semibold text-gray-400 tabular-nums">{index + 1}</span>
                  {team}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </article>
  )
}
