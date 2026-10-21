import type { Metadata } from "next";
import BackBar from "@/components/BackBar/BackBar";
import Icon from "@/components/Icon/Icon";
import SponsorLogo from "@/components/Sponsors/SponsorLogo";
import { sponsorsByTier, tiers, type Sponsor, type SponsorTier } from "@/lib/sponsors";
import { event } from "@/lib/tournaments";

export const metadata: Metadata = {
  title: "Sponsoren · 40. Ahrbach Cup",
  description: "Diese Partner unterstützen den 40. Ahrbach Cup des TuS Ahrbach.",
};

// Spalten und Logo-Größe je Stufe: je wichtiger der Sponsor, desto größer die Kachel
const layout: Record<SponsorTier, { grid: string; size: "sm" | "md" | "lg"; tile: string }> = {
  haupt: { grid: "grid-cols-1", size: "lg", tile: "aspect-[5/2] sm:aspect-[5/1]" },
  premium: { grid: "grid-cols-1 sm:grid-cols-3", size: "md", tile: "aspect-[3/1] sm:aspect-[2/1]" },
  partner: { grid: "grid-cols-2 lg:grid-cols-4", size: "sm", tile: "aspect-[3/2]" },
  foerderer: { grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6", size: "sm", tile: "aspect-[3/2]" },
};

export default function SponsorsPage() {
  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">Danke!</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">Unsere Sponsoren</h1>
          <p className="mt-6 max-w-2xl text-lg/8 text-white/70">
            Ohne die Unterstützung unserer Partner gäbe es keinen {event.edition}. {event.name}. Sie machen Preise,
            Verpflegung und ein Turnier für alle Altersklassen möglich.
          </p>
        </div>
      </section>
      <BackBar current="Sponsoren" />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 sm:py-20 lg:px-8">
        {tiers.map((tier) => {
          const list = sponsorsByTier(tier.id);
          if (list.length === 0) return null;
          return (
            <section key={tier.id} aria-labelledby={`stufe-${tier.id}`}>
              <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 id={`stufe-${tier.id}`} className="text-2xl font-extrabold tracking-tight text-navy uppercase">
                  {tier.title}
                </h2>
                <p className="text-sm text-gray-500">{tier.description}</p>
              </div>
              <ul className={`mt-6 grid gap-4 ${layout[tier.id].grid}`}>
                {list.map((sponsor) => (
                  <li key={sponsor.name}>
                    <SponsorTile sponsor={sponsor} tier={tier.id} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="flex flex-col gap-6 border-t-4 border-red bg-gray-50 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy uppercase">Sponsor werden</h2>
            <p className="mt-3 text-base/7 text-gray-600">
              Ihr möchtet den Ahrbach Cup unterstützen und vor vollen Rängen präsent sein? Wir freuen uns auf eure Nachricht.
            </p>
          </div>
          <a
            href={`mailto:${event.email}?subject=${encodeURIComponent(`Sponsoring ${event.edition}. ${event.name}`)}`}
            className="flex shrink-0 items-center justify-center gap-2 bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            <Icon name="mail" className="size-5" />
            Kontakt aufnehmen
          </a>
        </section>
      </div>
    </>
  );
}

function SponsorTile({ sponsor, tier }: { sponsor: Sponsor; tier: SponsorTier }) {
  const className = `relative flex items-center justify-center bg-white ring-1 ring-gray-200 ${layout[tier].tile}`;
  const style = sponsor.background ? { backgroundColor: sponsor.background } : undefined;
  const content = (
    <>
      <SponsorLogo sponsor={sponsor} size={layout[tier].size} />
      <span className="sr-only">{sponsor.name}</span>
    </>
  );

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" style={style} className={`${className} transition hover:ring-2 hover:ring-red`}>
      {content}
    </a>
  ) : (
    <div style={style} className={className}>
      {content}
    </div>
  );
}
