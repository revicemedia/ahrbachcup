import { event } from '@/lib/tournaments'
import Icon from '@/components/Icon/Icon'
import Contact from './Contact/Contact'
import Directions from './Directions/Directions'

const infos = [
  {
    title: 'Spielort',
    text: `${event.halls}, ${event.address.street} in ${event.address.city}. In der „alten“ Kreissporthalle wird mit Rundum-Bande gespielt.`,
    tile: 'bg-navy text-white',
    icon: 'location_on' as const,
  },
  {
    title: 'Startgeld',
    text: 'Junioren 30 Euro, Damen und Senioren 40 Euro je Mannschaft.',
    tile: 'bg-gold text-navy',
    icon: 'payments' as const,
  },
  {
    title: 'Preise',
    text: 'Geld- oder Sachpreise für die vier Erstplatzierten jeder Konkurrenz, die Sieger erhalten die Wanderpokale.',
    tile: 'bg-red text-white',
    icon: 'trophy' as const,
  },
]

export default function InfoSection() {
  return (
    <section id="infos" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy uppercase sm:text-4xl">Infos & Anfahrt</h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Seit 40 Jahren bringt der {event.host} im Januar Mannschaften aus der Region in {event.city} zusammen. Alles
            Wichtige auf einen Blick:
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {infos.map((info) => (
            <div key={info.title} className="flex flex-col">
              <dt className="text-base/7 font-semibold text-gray-900">
                <div className={`mb-6 flex size-10 items-center justify-center ${info.tile}`}>
                  <Icon name={info.icon} />
                </div>
                {info.title}
              </dt>
              <dd className="mt-1 text-base/7 text-gray-600">{info.text}</dd>
            </div>
          ))}
        </dl>

        <Directions />

        <Contact />
      </div>
    </section>
  )
}
