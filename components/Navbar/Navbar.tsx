'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import InstagramIcon from '@/components/Icon/InstagramIcon'
import { event } from '@/lib/tournaments'
import Icon from '@/components/Icon/Icon'

const navigation = [
  { name: 'START', href: '/#start' },
  { name: 'FREITAG', href: '/#freitag' },
  { name: 'SAMSTAG', href: '/#samstag' },
  { name: 'SONNTAG', href: '/#sonntag' },
  { name: 'FOTOS', href: '/#fotos' },
  { name: 'INFOS', href: '/#infos' },
]

const sectionIds = navigation.map((item) => item.href.split('#')[1])

// Aktiv ist die letzte Sektion, deren Anfang die Linie bei 35 % der Fensterhöhe erreicht hat.
// So bleibt ein Punkt markiert, bis der nächste erreicht ist, auch über Abschnitte ohne eigenen
// Menüpunkt wie Spielplan-Einleitung oder Anmeldung. Am Seitenende immer der letzte Punkt.
function findActiveSection() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    return sectionIds.at(-1) ?? null
  }
  const line = window.innerHeight * 0.35
  return sectionIds.findLast((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line) ?? null
}

// Nur auf der Startseite: Unterseiten haben diese Sektionen nicht
function useActiveSection() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!isHome) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setActive(findActiveSection()))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome])

  return isHome ? active : null
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection()

  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-xs backdrop-blur">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
          >
            <span className="sr-only">{mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.href.endsWith(`#${activeSection}`) ? 'location' : undefined}
              className="relative py-1 text-sm/6 font-semibold text-gray-900 transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-red after:transition-transform hover:text-red aria-[current=location]:text-red aria-[current=location]:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/#anmeldung"
            className="bg-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Team anmelden
          </Link>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 px-6 pb-6 lg:hidden">
          <div className="space-y-1 pt-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={item.href.endsWith(`#${activeSection}`) ? 'location' : undefined}
                className="-mx-3 block border-l-2 border-transparent px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 aria-[current=location]:border-red aria-[current=location]:bg-gray-50 aria-[current=location]:text-red"
              >
                {item.name}
              </a>
            ))}
            <a
              href={event.instagram}
              target="_blank"
              className="-mx-3 flex items-center gap-x-3 px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              <InstagramIcon className="size-5" />
              Instagram
            </a>
            <Link
              href="/#anmeldung"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block bg-red px-3 py-2.5 text-center text-base/7 font-semibold text-white"
            >
              Team anmelden
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
