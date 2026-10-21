import Image from 'next/image'
import Icon from '@/components/Icon/Icon'
import { event } from '@/lib/tournaments'

// Hochformat-Fotos aus /public; weitere einfach anhängen
const photos = [
  { src: '/Foto_1.jpg', alt: 'Spieler im roten Trikot dribbelt an der Bande entlang' },
  { src: '/Foto_2.jpg', alt: 'Zweikampf um den Ball in der Halle' },
  { src: '/Foto_3.jpg', alt: 'Mannschaftsfoto eines Teams in hellblauen Trikots' },
  { src: '/Foto_4.jpg', alt: 'Spieler in Hellblau nimmt den Ball an' },
]

export default function PhotoSection() {
  return (
    <section id="fotos" aria-labelledby="fotos-title" className="scroll-mt-20 bg-navy py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Fotoportal</p>
            <h2 id="fotos-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
              Die Highlights in Bildern
            </h2>
            <p className="mt-6 text-lg/8 text-white/70">
              Torjubel, Paraden und Siegerehrungen: Im Fotoportal findet ihr die Bilder der letzten Ahrbach Cups und ab
              Januar auch die vom Jubiläumsturnier.
            </p>
          </div>
          <a
            href={event.photoPortal}
            target="_blank"
            className="flex shrink-0 items-center justify-center gap-2 bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
          >
            Zum Fotoportal
            <Icon name="open_in_new" className="size-4" />
          </a>
        </div>

        <a
          href={event.photoPortal}
          target="_blank"
          aria-label="Fotoportal öffnen"
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {photos.map((photo) => (
            <div key={photo.src} className="group relative aspect-4/5 overflow-hidden bg-slate-blue/40">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </a>
      </div>
    </section>
  )
}
