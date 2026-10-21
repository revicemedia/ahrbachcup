import Icon, { type IconName } from '@/components/Icon/Icon'
import { event } from '@/lib/tournaments'

type Channel = { icon: IconName; label: string; name: string; value: string; href: string }

const channels: Channel[] = [
  ...event.contacts.map((contact) => ({
    icon: 'call' as const,
    label: 'Anrufen',
    name: contact.name,
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, '')}`,
  })),
  { icon: 'mail', label: 'E-Mail', name: 'Turnierleitung', value: event.email, href: `mailto:${event.email}` },
]

export default function Contact() {
  return (
    <div id="kontakt" className="mt-16 grid scroll-mt-24 gap-10 border-t-4 border-red bg-gray-50 p-8 sm:p-12 lg:grid-cols-[1fr_2fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-red uppercase">Kontakt</p>
        <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-navy uppercase">Fragen?</h3>
        <p className="mt-4 text-base/7 text-gray-600">
          Zur Anmeldung, zum Zeitplan oder zum Turnier: Ruft uns an oder schreibt uns, wir helfen gern weiter.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          // E-Mail über die volle Breite, damit die Adresse nicht umbricht
          <li key={channel.href} className={channel.icon === 'mail' ? 'sm:col-span-2' : undefined}>
            <a
              href={channel.href}
              className="group flex h-full flex-col bg-white p-6 ring-1 ring-gray-200 transition hover:ring-2 hover:ring-red"
            >
              <span className="flex size-11 items-center justify-center bg-navy text-white transition-colors group-hover:bg-red">
                <Icon name={channel.icon} className="size-5" />
              </span>
              <span className="mt-5 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">{channel.label}</span>
              <span className="mt-1 text-base font-bold text-navy">{channel.name}</span>
              <span className="mt-auto pt-3 text-sm font-semibold break-words text-red">{channel.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
