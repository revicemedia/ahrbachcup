import Link from 'next/link'
import Icon from '@/components/Icon/Icon'

// Bleibt beim Scrollen direkt unter der Navbar (4.75rem hoch) stehen
export default function BackBar({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return (
    <nav aria-label="Brotkrumen" className="sticky top-19 z-30 border-b border-gray-200 bg-gray-100">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm lg:px-8">
        <Link href="/" className="inline-flex items-center gap-1 font-semibold text-navy transition-colors hover:text-red">
          <Icon name="chevron_left" className="size-5" />
          Zurück zum Cup
        </Link>
        {parent && (
          <>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <Link href={parent.href} className="font-semibold text-navy transition-colors hover:text-red">
              {parent.label}
            </Link>
          </>
        )}
        <span aria-hidden="true" className="text-gray-400">/</span>
        <span aria-current="page" className="truncate text-gray-500">
          {current}
        </span>
      </div>
    </nav>
  )
}
