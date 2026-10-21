import { event } from '@/lib/tournaments'

// Gelbes Band wie im unteren Teil des Plakats
export default function Registration() {
  return (
    <section id="anmeldung" className="scroll-mt-20 bg-gold">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-navy/80 uppercase">Feiert mit uns den 40. Cup!</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy uppercase sm:text-5xl">
            Meldet euer Team jetzt an!
          </h2>
          <p className="mt-6 max-w-2xl text-base/7 text-navy">
            Bis <strong>{event.registrationDeadline}</strong>. Die Plätze sind begrenzt, es zählt die Reihenfolge der
            Meldungen. Sagt uns, in welchen Konkurrenzen ihr startet.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={`mailto:${event.email}?subject=${encodeURIComponent(`Anmeldung ${event.edition}. ${event.name}`)}`}
            className="bg-navy px-6 py-4 text-center text-base font-bold tracking-wide text-white uppercase transition-colors hover:bg-red"
          >
            {event.email}
          </a>
          <p className="text-center text-sm text-navy/80">Meldeschluss {event.registrationDeadline}</p>
        </div>
      </div>
    </section>
  )
}
