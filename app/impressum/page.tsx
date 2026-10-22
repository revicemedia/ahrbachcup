import type { Metadata } from "next";
import BackBar from "@/components/BackBar/BackBar";
import Icon from "@/components/Icon/Icon";

export const metadata: Metadata = {
  title: "Impressum · 40. Ahrbach Cup",
  description: "Impressum des Ahrbach Cups, ausgerichtet vom TuS Ahrbach.",
};

// Angaben übernommen von https://tus-ahrbach.de/impressum/, Rechtsgrundlagen auf DDG und MStV aktualisiert
const provider = {
  name: "TuS Ahrbach",
  street: "Bergstraße 11a",
  city: "56412 Ruppach-Goldhausen",
  representative: "Raimund Schäfer",
  phone: "+49 2602 8602",
  email: "rschaef4@rz-online.de",
};

const serviceProvider = {
  name: "Revice Media",
  role: "Konzeption, Webdesign und technische Umsetzung",
  url: "https://www.revice-media.com",
  label: "www.revice-media.com",
};

export default function ImprintPage() {
  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Rechtliches</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">Impressum</h1>
        </div>
      </section>
      <BackBar current="Impressum" />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
          <Block title="Angaben gemäß § 5 DDG">
            <address className="not-italic">
              <strong className="font-semibold text-navy">{provider.name}</strong>
              <br />
              {provider.street}
              <br />
              {provider.city}
            </address>
            <p className="mt-4">
              Vertreten durch:
              <br />
              {provider.representative}
            </p>
          </Block>

          <Block title="Kontakt">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt>Telefon</dt>
              <dd>
                <a href={`tel:${provider.phone.replace(/\s/g, "")}`} className="font-semibold text-red hover:underline">
                  {provider.phone}
                </a>
              </dd>
              <dt>E-Mail</dt>
              <dd>
                <a href={`mailto:${provider.email}`} className="font-semibold break-words text-red hover:underline">
                  {provider.email}
                </a>
              </dd>
            </dl>
          </Block>

          <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>
              {provider.representative}
              <br />
              {provider.street}, {provider.city}
            </p>
          </Block>

          {/* Stand: keine Cookies, kein Browser-Speicher. Reichweitenmessung mit Vercel Web Analytics (ohne Cookies) ist vorgesehen. */}
          <Block title="Cookies & Reichweitenmessung">
            <p>
              Diese Website setzt keine Cookies. Um zu sehen, welche Seiten wie oft aufgerufen werden, nutzen wir Vercel Web
              Analytics. Auch dabei werden keine Cookies gesetzt; die Aufrufe werden anonymisiert und nur zusammengefasst
              ausgewertet, ohne dass einzelne Besucher wiedererkannt oder Profile gebildet werden.
            </p>
            <p className="mt-4">
              Schriften werden von unserem eigenen Server geladen. Links zu Instagram oder Google Maps öffnen sich erst auf
              Klick in einem neuen Tab; dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </Block>

          <Block title="Streitbeilegung">
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </Block>
        </div>

        {/* Dienstleister als Leiste unter den Angaben */}
        <aside className="flex flex-col gap-6 border-t-4 border-red bg-gray-50 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-red uppercase">Dienstleister</p>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-navy uppercase">{serviceProvider.name}</h2>
            <p className="mt-2 text-base/7 text-gray-600">{serviceProvider.role}</p>
          </div>
          <a
            href={serviceProvider.url}
            target="_blank"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red lg:self-auto"
          >
            {serviceProvider.label}
            <Icon name="open_in_new" className="size-4" />
          </a>
        </aside>
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-gray-200 pb-3 text-lg font-extrabold tracking-tight text-navy uppercase">{title}</h2>
      <div className="mt-4 text-base/7 text-gray-600">{children}</div>
    </section>
  );
}
