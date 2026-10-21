import Image from 'next/image'
import type { Sponsor } from '@/lib/sponsors'

// Farben und Formen für die Platzhalter-Logos, ausgewählt über den Namen, damit jedes Logo gleich bleibt
const colors = ['#1b2336', '#d8323a', '#0f766e', '#7c3aed', '#c2410c', '#0369a1', '#4d7c0f', '#be185d']
// alles eckig, passend zur restlichen Seite
const shapes = ['square', 'outline', 'diamond', 'bar'] as const

function hash(text: string) {
  return [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7)
}

export default function SponsorLogo({ sponsor, size = 'md' }: { sponsor: Sponsor; size?: 'sm' | 'md' | 'lg' }) {
  if (sponsor.logo) {
    const padding = { sm: 'p-5', md: 'px-12 py-10 sm:px-16 sm:py-14', lg: 'px-10 py-8 sm:px-32 sm:py-12' }[size]
    return (
      <Image
        src={sponsor.logo}
        // Name steht für Screenreader schon in der Kachel
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className={`object-contain ${padding}`}
      />
    )
  }

  const seed = hash(sponsor.name)
  const color = colors[seed % colors.length]
  const shape = shapes[(seed >> 3) % shapes.length]
  const words = sponsor.name.split(' ')
  const initials = words.slice(0, 2).map((word) => word[0]).join('')
  const textSize = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl sm:text-3xl' }[size]
  const markSize = { sm: 'size-7 text-[0.6rem]', md: 'size-9 text-xs', lg: 'size-14 text-lg' }[size]

  return (
    <span aria-hidden="true" className="flex items-center gap-3 px-4" style={{ color }}>
      <span
        className={`flex shrink-0 items-center justify-center font-black ${markSize} ${
          shape === 'outline' ? 'border-2' : 'text-white'
        } ${shape === 'diamond' ? 'rotate-45' : ''} ${shape === 'bar' ? 'w-2!' : ''}`}
        style={shape === 'outline' ? { borderColor: color } : { backgroundColor: color }}
      >
        {shape !== 'bar' && <span className={shape === 'diamond' ? '-rotate-45' : undefined}>{initials}</span>}
      </span>
      <span className={`leading-tight font-extrabold tracking-tight uppercase ${textSize}`}>
        {words[0]}
        {words.length > 1 && <span className="block text-[0.7em] font-semibold tracking-wide opacity-70">{words.slice(1).join(' ')}</span>}
      </span>
    </span>
  )
}
