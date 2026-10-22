import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BackBar from "@/components/BackBar/BackBar";
import Icon from "@/components/Icon/Icon";
import KnockoutTables from "@/components/Schedule/KnockoutTables";
import GroupCard from "@/components/Schedule/GroupCard";
import { StatusBadge } from "@/components/Schedule/MatchRow";
import TestDataNotice from "@/components/Schedule/TestDataNotice";
import { competitionStatus, describeCompetition, getCompetition, getCompetitions, getMatches, getStandings, halls, placements } from "@/lib/schedule";
import { event } from "@/lib/tournaments";

export async function generateStaticParams() {
  return (await getCompetitions()).map((competition) => ({ slug: competition.slug }));
}

export async function generateMetadata({ params }: PageProps<"/spielplan/[slug]">): Promise<Metadata> {
  const competition = await getCompetition((await params).slug);
  if (!competition) return {};
  return {
    title: `${competition.name} · Spielplan · ${event.edition}. ${event.name}`,
    description: `Gruppen, Tabellen und K.-o.-Runde der ${competition.name} am ${competition.day.weekday}, ${competition.day.date}.`,
  };
}

const medals = ["bg-gold text-navy", "bg-gray-300 text-navy", "bg-[#c7834a] text-white"];

// Die Seite liest params erst innerhalb von Suspense: So bleibt die gemeinsame Hülle für alle
// Konkurrenzen gleich und kann beim Navigieren sofort angezeigt werden.
export default function CompetitionPage({ params }: PageProps<"/spielplan/[slug]">) {
  return (
    <Suspense fallback={<CompetitionSkeleton />}>
      <CompetitionDetails params={params} />
    </Suspense>
  );
}

function CompetitionSkeleton() {
  return (
    <div aria-busy="true" aria-label="Spielplan wird geladen">
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl animate-pulse px-6 py-14 sm:py-16 lg:px-8">
          <div className="h-3 w-48 bg-white/20" />
          <div className="mt-5 flex items-center gap-4">
            <div className="size-14 bg-gold/60" />
            <div className="h-10 w-72 max-w-full bg-white/20" />
          </div>
          <div className="mt-6 h-6 w-96 max-w-full bg-white/10" />
        </div>
      </section>
      <BackBar parent={{ label: "Spielplan", href: "/spielplan" }} current="…" />
      <div className="mx-auto grid max-w-7xl animate-pulse gap-6 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:px-8">
        {[0, 1].map((index) => (
          <div key={index} className="h-96 bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

async function CompetitionDetails({ params }: Pick<PageProps<"/spielplan/[slug]">, "params">) {
  const { slug } = await params;
  const competition = await getCompetition(slug);
  if (!competition) notFound();

  const [matches, standings, competitions] = await Promise.all([getMatches(slug), getStandings(slug), getCompetitions()]);
  const status = competitionStatus(matches);
  // oben nur das Treppchen, Platz 4 steht im Turnierbaum
  const podium = placements(matches)?.slice(0, 3);
  const knockout = matches.filter((match) => match.stage !== "group");
  const facts = describeCompetition(competition, matches);
  const groupNote = `Markierte Plätze erreichen die K.-o.-Runde${
    facts.bestOfRanks.length ? `, dazu die besten ${facts.bestOfRanks.map((rank) => ["", "Gruppenersten", "Gruppenzweiten", "Gruppendritten", "Gruppenvierten"][rank]).join(" und ")}` : ""
  }`;

  const sections = [
    podium && { id: "platzierungen", label: "Platzierungen" },
    { id: "gruppen", label: "Gruppen" },
    { id: "ko-runde", label: "K.-o.-Runde" },
  ].filter((section) => !!section);

  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {competition.day.weekday}, {competition.day.date}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span className="flex size-14 items-center justify-center bg-gold text-xl font-black text-navy">{competition.badge}</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">{competition.name}</h1>
            <StatusBadge status={status} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              facts.timeRange,
              halls.map((hall) => hall.short).join(" & "),
              facts.format,
              competition.ceremony && `Siegerehrung ${competition.ceremony} Uhr`,
              `Startgeld ${competition.fee}`,
              competition.note,
            ]
              .filter(Boolean)
              .map((fact) => (
                <li key={fact as string} className="border border-white/25 px-3 py-1 text-xs font-medium text-white/90">
                  {fact}
                </li>
              ))}
          </ul>
          <TestDataNotice className="mt-6" />
        </div>
      </section>
      <BackBar parent={{ label: "Spielplan", href: "/spielplan" }} current={competition.name} />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12 sm:py-16 lg:px-8">
        <nav aria-label="Abschnitte" className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="border border-gray-200 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-red hover:text-red"
            >
              {section.label}
            </a>
          ))}
        </nav>

        {podium && (
          <section id="platzierungen" aria-labelledby="platzierungen-title" className="scroll-mt-32">
            <SectionTitle id="platzierungen-title">Platzierungen</SectionTitle>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {podium.map((team, index) => (
                <li key={team} className="flex items-center gap-4 bg-white p-5 ring-1 ring-gray-200">
                  <span className={`flex size-12 shrink-0 items-center justify-center text-xl font-black ${medals[index]}`}>{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-wider text-gray-500 uppercase">{index === 0 ? "Turniersieger" : `Platz ${index + 1}`}</span>
                    <span className="block truncate text-lg font-bold text-navy">{team}</span>
                  </span>
                  {index === 0 && <Icon name="trophy" className="ml-auto size-7 shrink-0 text-gold" />}
                </li>
              ))}
            </ol>
          </section>
        )}

        <section id="gruppen" aria-labelledby="gruppen-title" className="scroll-mt-32">
          <SectionTitle id="gruppen-title" note={groupNote}>
            Gruppen
          </SectionTitle>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {[...standings].map(([group, table]) => (
              <GroupCard
                key={group}
                name={group}
                table={table}
                qualifiedRanks={[...(facts.qualifiedRanks.get(group) ?? [])]}
                matches={matches.filter((match) => match.stage === "group" && match.group === group)}
              />
            ))}
          </div>
        </section>

        <section id="ko-runde" aria-labelledby="ko-runde-title" className="scroll-mt-32">
          <SectionTitle id="ko-runde-title" note="Bei Gleichstand nach regulärer Spielzeit entscheidet das Neunmeterschießen">
            K.-o.-Runde
          </SectionTitle>
          <div className="mt-6">
            <KnockoutTables matches={knockout} />
          </div>
        </section>

        <section aria-labelledby="weitere-title" className="border-t border-gray-200 pt-10">
          <h2 id="weitere-title" className="text-sm font-bold tracking-wider text-gray-500 uppercase">
            Weitere Konkurrenzen
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {competitions
              .filter((other) => other.slug !== slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/spielplan/${other.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-200 px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-red hover:text-red"
                  >
                    {other.name}
                    <span className="text-xs font-medium text-gray-500">{other.day.weekday.slice(0, 2)}.</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function SectionTitle({ id, note, children }: { id: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 id={id} className="text-3xl font-extrabold tracking-tight text-navy uppercase sm:text-4xl">
        {children}
      </h2>
      {note && <p className="text-sm text-gray-500">{note}</p>}
    </div>
  );
}
