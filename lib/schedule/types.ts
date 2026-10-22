// Datenmodell des Spielplans. Später liefert die Datenbank genau diese Strukturen.

export type HallId = 'halle-1' | 'halle-2'

export const halls: { id: HallId; name: string; short: string }[] = [
  { id: 'halle-1', name: 'Kreissporthalle I', short: 'Halle I' },
  { id: 'halle-2', name: 'Kreissporthalle II', short: 'Halle II' },
]

export type Stage = 'group' | 'roundOf16' | 'quarterfinal' | 'semifinal' | 'third' | 'final' | 'placement'

export const stageNames: Record<Stage, string> = {
  group: 'Gruppenphase',
  roundOf16: 'Achtelfinale',
  quarterfinal: 'Viertelfinale',
  semifinal: 'Halbfinale',
  third: 'Spiel um Platz 3',
  final: 'Finale',
  placement: 'Platzierungsspiel',
}

// Wer in einem K.-o.-Spiel antritt, steht erst nach der Gruppenphase bzw. dem vorherigen Spiel fest
export type Slot =
  | { type: 'team'; team: string }
  | { type: 'group'; group: string; rank: number }
  // z. B. rank 3, position 1 = bester Gruppendritter über alle Gruppen
  | { type: 'bestOfRank'; rank: number; position: number }
  | { type: 'winner'; match: string }
  | { type: 'loser'; match: string }

export type Score = { home: number; away: number; penalties?: { home: number; away: number } }

export type Match = {
  id: string
  competition: string
  stage: Stage
  group?: string
  // Kurzname im Turnierbaum, z. B. "HF1"
  label?: string
  // nur bei Platzierungsspielen: um welchen Platz gespielt wird, z. B. 5
  placement?: number
  // Ortszeit ohne Zeitzone, z. B. '2027-01-09T13:10'; als Text vergleichbar
  start: string
  end: string
  hall: HallId
  home: Slot
  away: Slot
  score?: Score
}

export type MatchStatus = 'upcoming' | 'live' | 'finished'

// Spiel mit aufgelösten Mannschaftsnamen, fertig für die Anzeige
export type ResolvedMatch = Match & {
  homeName: string
  awayName: string
  // false, solange nur ein Platzhalter wie "1. Gruppe A" feststeht
  homeKnown: boolean
  awayKnown: boolean
  status: MatchStatus
}

export type StandingRow = {
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}
