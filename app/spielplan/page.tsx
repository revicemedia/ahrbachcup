import type { Metadata } from "next";
import { Suspense } from "react";
import BackBar from "@/components/BackBar/BackBar";
import TestDataNotice from "@/components/Schedule/TestDataNotice";
import DayTimeline from "@/components/Schedule/DayTimeline";
import TeamFilter from "@/components/Schedule/TeamFilter";
import { competitionStatus, describeCompetition, getAllResolvedMatches, getCompetitions, getMatches, getNow, halls, placements } from "@/lib/schedule";
import { days, event } from "@/lib/tournaments";

export const metadata: Metadata = {
  title: "Spielplan · 40. Ahrbach Cup",
  description: "Gruppen, Tabellen und K.-o.-Runden aller Konkurrenzen des 40. Ahrbach Cups.",
};

export default async function SchedulePage() {
  const competitions = await Promise.all(
    (await getCompetitions()).map(async (competition) => {
      const matches = await getMatches(competition.slug);
      // je Halle vom ersten bis zum letzten Spiel, für die Zeitleiste
      const bars = halls.flatMap((hall) => {
        const inHall = matches.filter((match) => match.hall === hall.id);
        return inHall.length ? [{ hall: hall.id, start: inHall[0].start, end: inHall.reduce((end, match) => (match.end > end ? match.end : end), "") }] : [];
      });
      return { ...competition, ...describeCompetition(competition, matches), status: competitionStatus(matches), champion: placements(matches)?.[0], bars };
    }),
  );
  const [now, allMatches] = await Promise.all([getNow(), getAllResolvedMatches()]);

  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">{event.dateRange}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">Spielplan</h1>
          <p className="mt-6 max-w-2xl text-lg/8 text-white/70">
            Gespielt wird parallel in {halls.map((hall) => hall.name).join(" und ")}: erst in Gruppen mit vier bis fünf
            Mannschaften, danach im K.-o.-System bis zum Finale.
          </p>
          <TestDataNotice className="mt-6" />
        </div>
      </section>
      <BackBar current="Spielplan" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:py-16 lg:px-8">
        {/* liest ?team= aus der Adresse, deshalb in Suspense: der Rest der Seite bleibt statisch */}
        <Suspense fallback={<div className="ml-auto h-10 w-full bg-gray-50 sm:w-80" />}>
          <TeamFilter matches={allMatches} days={days.map(({ isoDate, weekday, date }) => ({ isoDate, weekday, date }))} />
        </Suspense>

        <div className="flex flex-col gap-16">
        {days.map((day) => (
          <section key={day.slug} id={day.slug} aria-labelledby={`${day.slug}-title`} className="scroll-mt-32">
            <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-red">{day.date}</p>
                <h2 id={`${day.slug}-title`} className="mt-1 text-3xl font-extrabold tracking-tight text-navy uppercase sm:text-4xl">
                  {day.weekday}
                </h2>
              </div>
              <p className="text-base font-medium text-gray-600">{day.headline}</p>
            </div>

            <div className="mt-8">
              <DayTimeline
                isoDate={day.isoDate}
                now={now}
                competitions={competitions.filter((competition) => competition.day.slug === day.slug)}
              />
            </div>
          </section>
        ))}
        </div>
      </div>
    </>
  );
}
