'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import InstagramIcon from '@/components/Icon/InstagramIcon'
import { event } from '@/lib/tournaments'
import Icon from '@/components/Icon/Icon'

// section: Abschnitt auf der Startseite, der beim Scrollen hervorgehoben wird
// page: Unterseite, auf der (inklusive aller Seiten darunter) der Punkt aktiv ist
const navigation: { name: string; href: string; section?: string; page?: string }[] = [
  { name: 'START', href: '/#start', section: 'start' },
  { name: 'SPIELPLAN', href: '/spielplan', section: 'spielplan', page: '/spielplan' },
  { name: 'FOTOS', href: '/#fotos', section: 'fotos' },
  { name: 'INFOS', href: '/#infos', section: 'infos' },
  { name: 'SPONSOREN', href: '/sponsoren', page: '/sponsoren' },
]

const sectionIds = navigation.flatMap((item) => (item.section ? [item.section] : []))

// Aktiv ist die letzte Sektion, deren Anfang die Linie bei 35 % der Fensterhöhe erreicht hat.
// So bleibt ein Punkt markiert, bis der nächste erreicht ist, auch über Abschnitte ohne eigenen
// Menüpunkt wie die Anmeldung. Am Seitenende immer der letzte Punkt.
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

// Sperrt das Scrollen der Seite, solange das Menü offen ist, und schließt es mit Escape
function useMenuLayer(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (keyEvent: KeyboardEvent) => keyEvent.key === 'Escape' && close()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const pathname = usePathname()
  const current = (item: (typeof navigation)[number]) =>
    item.page && pathname.startsWith(item.page) ? 'page' : item.section && item.section === activeSection ? 'location' : undefined
  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])
  useMenuLayer(mobileMenuOpen, closeMenu)

  return (
    <>
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
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
            >
              <span className="sr-only">Menü öffnen</span>
              <Icon name="menu" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={current(item)}
                className="relative py-1 text-sm/6 font-semibold text-gray-900 transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-red after:transition-transform hover:text-red aria-[current]:text-red aria-[current]:after:scale-x-100"
              >
                {item.name}
              </Link>
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
      </header>

      {/* Vollbild-Ebene außerhalb des Headers: dessen backdrop-blur würde fixed auf die Headerhöhe begrenzen */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 shadow-xs">
            <Link href="/" onClick={closeMenu} className="-m-1.5 p-1.5">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              autoFocus
              className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700"
            >
              <span className="sr-only">Menü schließen</span>
              <Icon name="close" />
            </button>
          </div>

          <nav aria-label="Mobil" className="flex flex-1 flex-col px-6 py-8">
            <ul className="divide-y divide-gray-100 border-y border-gray-100">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={current(item)}
                    className="flex items-center justify-between py-4 text-2xl font-extrabold tracking-tight text-navy uppercase transition-colors hover:text-red aria-[current]:text-red"
                  >
                    {item.name}
                    <Icon name="chevron_right" className="size-6 text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Link
                href="/#anmeldung"
                onClick={closeMenu}
                className="block bg-red px-4 py-3.5 text-center text-base font-semibold text-white"
              >
                Team anmelden
              </Link>
              <a
                href={event.instagram}
                target="_blank"
                className="flex items-center justify-center gap-x-2 border border-gray-200 px-4 py-3.5 text-base font-semibold text-navy"
              >
                <InstagramIcon className="size-5" />
                Instagram
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
