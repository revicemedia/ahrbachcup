import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import InstagramIcon from '@/components/Icon/InstagramIcon'
import Logo from '@/components/Logo/Logo'
import { sponsors } from '@/lib/sponsors'
import { event } from '@/lib/tournaments'

// Im Footer nur ausgewählte Sponsoren, alle weiteren auf /sponsoren
const footerSponsors = sponsors.filter((sponsor) => sponsor.footer)

const navigation = [
  { name: 'Spielplan', href: '/#spielplan' },
  { name: 'Anmeldung', href: '/#anmeldung' },
  { name: 'Fotos', href: '/#fotos' },
  { name: 'Sponsoren', href: '/sponsoren' },
  { name: 'Infos & Anfahrt', href: '/#infos' },
  { name: 'TuS Ahrbach', href: event.website },
  { name: 'Impressum', href: '/impressum' },
]

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-6 text-sm/6 text-white/60">
            {event.dateRange} · {event.venue}. Zeitplan vorbehaltlich Änderungen nach Eingang der Meldungen.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm/6">
            {navigation.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-white/70 transition-colors hover:text-gold">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-10 text-sm">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">Sponsoren</p>
            <ul className="mt-4 space-y-3">
              {footerSponsors.map((sponsor) => (
                <li key={sponsor.name}>
                  {sponsor.url ? (
                    <a href={sponsor.url} target="_blank" className="font-semibold text-white transition-colors hover:text-gold">
                      {sponsor.name}
                    </a>
                  ) : (
                    <span className="font-semibold text-white">{sponsor.name}</span>
                  )}
                  {sponsor.tier === 'haupt' && <span className="mt-0.5 block text-xs text-gold">Hauptsponsor</span>}
                </li>
              ))}
            </ul>
            <Link href="/sponsoren" className="mt-4 inline-flex items-center gap-1 font-semibold text-gold transition-colors hover:text-white">
              Alle Sponsoren
              <Icon name="chevron_right" className="size-4" />
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">Social Media</p>
            <a
              href={event.instagram}
              target="_blank"
              className="mt-4 flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-gold"
            >
              <InstagramIcon className="size-5" />
              @ahrbachcup
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-sm/6 text-white/50 lg:px-8">&copy; {event.year} {event.host}</p>
      </div>
    </footer>
  )
}
