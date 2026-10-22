// Zugriff auf den Spielplan. Die Seiten nutzen nur diese Funktionen; beim Anbinden der Datenbank
// werden getAllMatches() und getNow() ausgetauscht, alles andere bleibt.

import { days, type Day, type Tournament } from '@/lib/tournaments'
import { ceremonies, DEMO_NOW, testMatches } from './testdata'
import { winnerSide } from './score'
import { halls, stageNames, type Match, type MatchStatus, type ResolvedMatch, type Slot, type Stage, type StandingRow } from './types'

export * from './types'
export { winnerSide } from './score'

// TODO: Hinweis entfernen, sobald echte Daten aus der Datenbank kommen
export const IS_TEST_DATA = true

// ceremony: Uhrzeit der Siegerehrung, z. B. '17:30'
export type Competition = Tournament & { day: Day; ceremony?: string }

// TODO: durch die aktuelle Uhrzeit ersetzen, sobald echte Ergebnisse eingetragen werden
export async function getNow() {
  return DEMO_NOW
}

// TODO: aus der Datenbank laden
async function getAllMatches(): Promise<Match[]> {
  return testMatches
}

export async function getCompetitions(): Promise<Competition[]> {
  return days.flatMap((day) => day.tournaments.map((tournament) => ({ ...tournament, day, ceremony: ceremonies[tournament.slug] })))
}

export async function getCompetition(slug: string) {
  return (await getCompetitions()).find((competition) => competition.slug === slug)
}

const statusAt = (match: Match, now: string): MatchStatus =>
  match.score && match.end <= now ? 'finished' : match.start <= now ? 'live' : 'upcoming'


export function computeStandings(matches: Match[], now: string) {
  const tables = new Map<string, Map<string, StandingRow>>()
  const row = (group: string, team: string) => {
    const table = tables.get(group) ?? tables.set(group, new Map()).get(group)!
    return table.get(team) ?? table.set(team, { team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }).get(team)!
  }

  for (const match of matches) {
    if (match.stage !== 'group' || !match.group || match.home.type !== 'team' || match.away.type !== 'team') continue
    const home = row(match.group, match.home.team)
    const away = row(match.group, match.away.team)
    // nur abgepfiffene Spiele zählen für die Tabelle
    if (!match.score || statusAt(match, now) !== 'finished') continue
    const { home: homeGoals, away: awayGoals } = match.score
    for (const [team, goalsFor, goalsAgainst] of [[home, homeGoals, awayGoals], [away, awayGoals, homeGoals]] as const) {
      team.played++
      team.goalsFor += goalsFor
      team.goalsAgainst += goalsAgainst
      if (goalsFor > goalsAgainst) {
        team.won++
        team.points += 3
      } else if (goalsFor === goalsAgainst) {
        team.drawn++
        team.points++
      } else {
        team.lost++
      }
    }
  }

  const sorted = new Map<string, StandingRow[]>()
  for (const [group, table] of [...tables].sort(([a], [b]) => a.localeCompare(b))) {
    sorted.set(group, [...table.values()].sort(compareRows))
  }
  return sorted
}

const compareRows = (a: StandingRow, b: StandingRow) =>
  b.points - a.points ||
  b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst) ||
  b.goalsFor - a.goalsFor ||
  a.team.localeCompare(b.team)

const rankWords: Record<number, string> = { 1: 'Gruppenerster', 2: 'Gruppenzweiter', 3: 'Gruppendritter', 4: 'Gruppenvierter' }
const bestOfRankLabel = (rank: number, position: number) =>
  `${position === 1 ? 'Bester' : `${position}. bester`} ${rankWords[rank] ?? `Gruppen-${rank}.`}`

// Ersetzt Platzhalter wie "1. Gruppe A" oder "Sieger HF1" durch Mannschaften, sobald sie feststehen
function resolveMatches(matches: Match[], now: string): ResolvedMatch[] {
  const standings = computeStandings(matches, now)
  const groupDone = (group: string) =>
    matches.filter((match) => match.stage === 'group' && match.group === group).every((match) => statusAt(match, now) === 'finished')
  const byId = new Map(matches.map((match) => [match.id, match]))
  const resolved = new Map<string, ResolvedMatch>()

  const slotName = (slot: Slot): { name: string; known: boolean } => {
    switch (slot.type) {
      case 'team':
        return { name: slot.team, known: true }
      case 'group': {
        const team = groupDone(slot.group) ? standings.get(slot.group)?.[slot.rank - 1]?.team : undefined
        return team ? { name: team, known: true } : { name: `${slot.rank}. Gruppe ${slot.group}`, known: false }
      }
      case 'bestOfRank': {
        const groups = [...standings.keys()]
        const ranked = groups.every(groupDone)
          ? groups.map((group) => standings.get(group)![slot.rank - 1]).filter(Boolean).sort(compareRows)
          : []
        const team = ranked[slot.position - 1]?.team
        return team ? { name: team, known: true } : { name: bestOfRankLabel(slot.rank, slot.position), known: false }
      }
      case 'winner':
      case 'loser': {
        const source = byId.get(slot.match)
        const match = source && resolve(source)
        const label = `${slot.type === 'winner' ? 'Sieger' : 'Verlierer'} ${source?.label ?? ''}`.trim()
        if (!match?.score || match.status !== 'finished' || !match.homeKnown || !match.awayKnown) return { name: label, known: false }
        const homeWon = winnerSide(match.score) === 'home'
        return { name: homeWon === (slot.type === 'winner') ? match.homeName : match.awayName, known: true }
      }
    }
  }

  const resolve = (match: Match): ResolvedMatch => {
    const cached = resolved.get(match.id)
    if (cached) return cached
    const home = slotName(match.home)
    const away = slotName(match.away)
    const result = { ...match, homeName: home.name, awayName: away.name, homeKnown: home.known, awayKnown: away.known, status: statusAt(match, now) }
    resolved.set(match.id, result)
    return result
  }

  return matches.map(resolve).sort((a, b) => a.start.localeCompare(b.start) || a.hall.localeCompare(b.hall))
}

export async function getMatches(slug: string) {
  const [all, now] = await Promise.all([getAllMatches(), getNow()])
  return resolveMatches(all.filter((match) => match.competition === slug), now)
}

export async function getStandings(slug: string) {
  const [all, now] = await Promise.all([getAllMatches(), getNow()])
  return computeStandings(all.filter((match) => match.competition === slug), now)
}

export function competitionStatus(matches: ResolvedMatch[]): MatchStatus {
  if (matches.length && matches.every((match) => match.status === 'finished')) return 'finished'
  return matches.some((match) => match.status !== 'upcoming') ? 'live' : 'upcoming'
}

// Plätze 1–4 aus Finale und Spiel um Platz 3, sobald beide gespielt sind
export function placements(matches: ResolvedMatch[]) {
  const final = matches.find((match) => match.stage === 'final')
  const third = matches.find((match) => match.stage === 'third')
  if (final?.status !== 'finished' || third?.status !== 'finished' || !final.score || !third.score) return undefined
  const order = (match: ResolvedMatch) => (winnerSide(match.score!) === 'home' ? [match.homeName, match.awayName] : [match.awayName, match.homeName])
  return [...order(final), ...order(third)]
}

// Alle Spiele aller Konkurrenzen mit aufgelösten Mannschaften, nach Anstoßzeit sortiert
export async function getAllResolvedMatches() {
  const [all, now, competitions] = await Promise.all([getAllMatches(), getNow(), getCompetitions()])
  const byCompetition = Object.groupBy(all, (match) => match.competition)
  const bySlug = new Map(competitions.map((competition) => [competition.slug, competition]))
  return Object.values(byCompetition)
    .flatMap((matches) => resolveMatches(matches ?? [], now))
    .map((match) => ({
      ...match,
      competitionName: bySlug.get(match.competition)?.name ?? match.competition,
      competitionShort: bySlug.get(match.competition)?.short ?? match.competition,
    }))
    .sort((a, b) => a.start.localeCompare(b.start) || a.hall.localeCompare(b.hall))
}

export type ScheduleMatch = Awaited<ReturnType<typeof getAllResolvedMatches>>[number]

// Laufende und nächste Spiele je Halle, über alle Konkurrenzen
export async function getNextMatchesByHall(limit = 3) {
  const resolved = await getAllResolvedMatches()
  return halls.map((hall) => ({
    hall,
    matches: resolved.filter((match) => match.hall === hall.id && match.status !== 'finished').slice(0, limit),
  }))
}

export type HallMatches = Awaited<ReturnType<typeof getNextMatchesByHall>>[number]

const koOrder: Stage[] = ['roundOf16', 'quarterfinal', 'semifinal', 'final']

// Eckdaten einer Konkurrenz, abgeleitet aus ihren Spielen
export function describeCompetition(competition: Competition, matches: ResolvedMatch[]) {
  const first = matches[0]
  const last = matches.at(-1)
  const end = competition.ceremony ?? last?.end.slice(11, 16)
  const stages = new Set(matches.map((match) => match.stage))
  const groupCount = new Set(matches.filter((match) => match.group).map((match) => match.group)).size
  const knockout = matches.filter((match) => match.stage !== 'group' && match.stage !== 'placement')

  // Plätze je Gruppe, die direkt in die K.-o.-Runde führen
  const qualifiedRanks = new Map<string, Set<number>>()
  for (const slot of knockout.flatMap((match) => [match.home, match.away])) {
    if (slot.type !== 'group') continue
    const ranks = qualifiedRanks.get(slot.group) ?? qualifiedRanks.set(slot.group, new Set()).get(slot.group)!
    ranks.add(slot.rank)
  }
  const bestOfRanks = [...new Set(knockout.flatMap((match) => [match.home, match.away]).flatMap((slot) => (slot.type === 'bestOfRank' ? [slot.rank] : [])))]

  return {
    timeRange: first ? `${first.start.slice(11, 16)} – ${end} Uhr` : '',
    format: ['group', ...koOrder].filter((stage) => stages.has(stage as Stage)).map((stage) => stageNames[stage as Stage]).join(', '),
    groupCount,
    matchCount: matches.length,
    qualifiedRanks,
    // z. B. [3]: zusätzlich kommen die besten Gruppendritten weiter
    bestOfRanks,
  }
}
