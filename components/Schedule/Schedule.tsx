import { days, event } from '@/lib/tournaments'
import Icon from '@/components/Icon/Icon'
import DaySection from './DaySection/DaySection'

export default function Schedule() {
  return (
    <div id="spielplan" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.25em] text-red uppercase">{event.dateRange}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy uppercase sm:text-4xl">Spielplan</h2>
        <p className="mt-4 max-w-2xl text-lg/8 text-gray-600">
          Gespielt wird in Gruppen mit vier bis fünf Mannschaften, danach geht es in die K.-o.-Runde. Die Gruppen werden
          nach dem Meldeschluss am {event.registrationDeadline} ausgelost.
        </p>

        {/* Schnellwahl der Tage */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {days.map((day) => (
            <a
              key={day.slug}
              href={`#${day.slug}`}
              className="group flex items-center justify-between border border-gray-200 p-5 transition-colors hover:border-navy"
            >
              <span>
                <span className="block text-sm font-semibold text-red">{day.date}</span>
                <span className="mt-1 block text-xl font-bold text-navy">{day.weekday}</span>
                <span className="mt-1 block text-sm text-gray-600">{day.tournaments.map((t) => t.name).join(' · ')}</span>
              </span>
              <Icon name="keyboard_arrow_down" className="size-5 text-gray-400 transition-transform group-hover:translate-y-0.5 group-hover:text-navy" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16">
        {days.map((day, index) => (
          <DaySection key={day.slug} day={day} tinted={index % 2 === 0} />
        ))}
      </div>
    </div>
  )
}
