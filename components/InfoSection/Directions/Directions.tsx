import Icon, { type IconName } from '@/components/Icon/Icon'
import { event } from '@/lib/tournaments'

const destination = encodeURIComponent(`${event.address.street}, ${event.address.zip} ${event.address.city}`)

const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`

const icons: Record<string, IconName> = {
  Auto: 'directions_car',
  Bahn: 'train',
  Parken: 'local_parking',
}

export default function Directions() {
  return (
    <div id="anfahrt" className="mt-16 grid scroll-mt-24 ring-1 ring-gray-200 lg:grid-cols-5">
      <div className="flex flex-col justify-between gap-10 bg-navy p-8 sm:p-10 lg:col-span-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Anfahrt</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white uppercase">{event.venue}</h3>
          <p className="mt-2 text-sm font-semibold text-gold">Gespielt wird in {event.halls}</p>
          <address className="mt-4 text-base/7 text-white/80 not-italic">
            {event.address.street}
            <br />
            {event.address.zip} {event.address.city}
          </address>
        </div>
        <a
          href={routeUrl}
          target="_blank"
          className="flex items-center justify-between gap-2 bg-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
        >
          Route planen
          <Icon name="open_in_new" className="size-4" />
        </a>
      </div>

      <dl className="divide-y divide-gray-200 bg-white lg:col-span-3">
        {event.directions.map((direction) => (
          <div key={direction.mode} className="flex gap-5 p-8 sm:px-10">
            <div className="flex size-12 shrink-0 items-center justify-center bg-gold text-navy">
              <Icon name={icons[direction.mode]} />
            </div>
            <div>
              <dt className="text-base/6 font-bold text-navy">{direction.mode}</dt>
              <dd className="text-base/6 text-gray-600">{direction.text}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
