'use client'

import { useState } from 'react'
import Image from 'next/image'
import { event } from '@/lib/tournaments'
import Icon from '@/components/Icon/Icon'

type Link = { label: string; href: string; external?: boolean }

type Slide = {
  key: string
  label: string
  title: string
  teaser: string
  facts: string[]
  // erster Link als roter Button, alle weiteren als Umriss-Buttons
  links: [Link, ...Link[]]
  // Foto aus /public; am Desktop füllt es die rechte Hälfte. Ohne Foto zeigt der Slide die Jubiläums-40.
  image?: string
  glow: string
}

const slides: Slide[] = [
  {
    key: 'cup',
    label: 'Herzliche Einladung · Das Jubiläumsturnier',
    title: `${event.edition}. ${event.name}`,
    teaser: `Drei Tage Fußballfest unterm Hallendach: Der ${event.host} lädt in die ${event.venue} ein.`,
    facts: [
      event.dateRange,
      event.venue,
      `Meldeschluss ${event.registrationDeadline}`,
      'Startgeld Junioren 30 € · Damen & Senioren 40 €',
    ],
    links: [
      { label: 'Team anmelden', href: '#anmeldung' },
      { label: 'Unsere Sponsoren', href: '/sponsoren' },
    ],
    glow: 'from-slate-blue',
  },
  {
    key: 'fotos',
    label: 'Fotoportal',
    title: 'Die Highlights in Bildern',
    teaser: 'Torjubel, Paraden und Siegerehrungen: Im Fotoportal findet ihr die Bilder der letzten Ahrbach Cups und ab Januar auch die vom Jubiläumsturnier.',
    facts: ['Alle Turniertage', 'Siegerehrungen', 'Mannschaftsfotos'],
    links: [{ label: 'Zum Fotoportal', href: event.photoPortal, external: true }],
    image: '/Foto_2.jpg',
    glow: 'from-gold/40',
  },
  {
    key: 'verein',
    label: `Seit 1921 · Gastgeber zum ${event.edition}. Mal`,
    title: event.host,
    teaser: `Der TuS Ahrbach richtet den Cup seit 40 Jahren aus. Hinter dem Turnier stehen viele Ehrenamtliche, die jeden Januar die ${event.venue} in ein Fußballfest verwandeln.`,
    facts: ['Jugend bis Alte Herren', 'Ehrenamt', 'Ahrbach im Westerwald'],
    links: [{ label: 'Zur Vereinsseite', href: event.website, external: true }],
    image: '/Foto_4.jpg',
    glow: 'from-red/60',
  },
]

const INTERVAL = 6000

export default function HeroSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = (index: number) => setActive((index + slides.length) % slides.length)

  return (
    <section
      id="start"
      aria-roledescription="carousel"
      aria-label={`${event.edition}. ${event.name}`}
      onFocus={(focusEvent) => setPaused(focusEvent.target.matches(':focus-visible'))}
      onBlur={() => setPaused(false)}
      className="relative scroll-mt-20 overflow-hidden bg-navy"
    >
      {/* Pausiert nur über dem Slide selbst, nicht über Pfeilen und Punkten */}
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid">
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} von ${slides.length}: ${slide.title}`}
            inert={index !== active}
            className={`relative isolate col-start-1 row-start-1 transition-opacity duration-700 motion-reduce:transition-none ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image ? (
              <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 w-full overflow-hidden lg:w-1/2">
                <Image
                  alt=""
                  src={slide.image}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="animate-[hero-zoom_1.4s_ease-out_both] object-cover object-[center_35%] motion-reduce:animate-none"
                />
                {/* weicher Übergang vom Foto in die blaue Fläche links */}
                <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-linear-to-r from-navy to-transparent lg:block" />
              </div>
            ) : (
              <JubileeBackdrop glow={slide.glow} />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/70 to-navy/10 lg:bg-linear-to-r lg:via-navy/50 lg:to-transparent"
            />

            <div className="mx-auto flex min-h-144 max-w-7xl items-center px-6 pt-20 pb-32 lg:min-h-[min(34vw,calc(100svh-10rem))] lg:pt-16 lg:pb-28 lg:px-8">
              <div className="max-w-2xl">
                <p className="w-fit animate-[hero-rise_0.7s_ease-out_both] text-xs font-semibold tracking-[0.25em] text-gold uppercase [animation-delay:200ms] motion-reduce:animate-none">
                  {slide.label}
                </p>
                <h2 className="mt-5 animate-[hero-rise_0.7s_ease-out_both] text-4xl font-extrabold tracking-tight text-pretty text-white uppercase [animation-delay:350ms] motion-reduce:animate-none sm:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-6 max-w-xl animate-[hero-rise_0.7s_ease-out_both] text-base/7 text-gray-300 [animation-delay:500ms] motion-reduce:animate-none sm:text-lg/8">
                  {slide.teaser}
                </p>
                <ul className="mt-6 flex animate-[hero-rise_0.7s_ease-out_both] flex-wrap gap-2 [animation-delay:575ms] motion-reduce:animate-none">
                  {slide.facts.map((fact) => (
                    <li key={fact} className="border border-white/25 px-3 py-1 text-xs font-medium text-white/90">
                      {fact}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex animate-[hero-rise_0.7s_ease-out_both] flex-col gap-4 [animation-delay:650ms] motion-reduce:animate-none sm:flex-row">
                  {slide.links.map((link, linkIndex) => (
                    <a
                      key={link.href + link.label}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      className={`flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                        linkIndex === 0
                          ? 'bg-red text-white hover:bg-white hover:text-navy'
                          : 'border border-white text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      {link.external && <Icon name="open_in_new" className="size-4" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-8 animate-[hero-rise_0.7s_ease-out_both] [animation-delay:800ms] motion-reduce:animate-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === active}
                className="group py-2"
              >
                <span className="sr-only">{slide.title} anzeigen</span>
                <span
                  className={`block h-1 overflow-hidden bg-white/40 transition-all duration-300 ${
                    index === active ? 'w-10' : 'w-5 group-hover:bg-white/70'
                  }`}
                >
                  {index === active && (
                    <span
                      onAnimationEnd={() => goTo(active + 1)}
                      style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                      className="block h-full origin-left animate-[slide-progress_linear_forwards] bg-gold motion-reduce:animate-none"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="prev" onClick={() => goTo(active - 1)} />
            <ArrowButton direction="next" onClick={() => goTo(active + 1)} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-white/40 p-2 text-white transition-all hover:border-white hover:bg-white/10"
    >
      <span className="sr-only">{direction === 'prev' ? 'Vorheriger Slide' : 'Nächster Slide'}</span>
      <Icon name={direction === 'prev' ? 'chevron_left' : 'chevron_right'} className="size-5" />
    </button>
  )
}

// Große goldene 40 wie auf dem Plakat, als Ersatz für ein Foto
function JubileeBackdrop({ glow }: { glow: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 animate-[hero-zoom_1.4s_ease-out_both] motion-reduce:animate-none">
      <div className={`absolute inset-0 bg-radial-[at_70%_45%] ${glow} via-navy/60 to-navy`} />
      <span className="absolute top-1/2 right-[-4%] -translate-y-1/2 text-[22rem] leading-none font-black tracking-tighter text-gold/25 select-none sm:text-[32rem] lg:right-[2%] lg:text-[30rem] lg:text-gold/80">
        40
      </span>
    </div>
  )
}
