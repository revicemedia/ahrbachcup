import type { Score } from './types'

// Sieger nach Toren, bei Gleichstand nach Neunmeterschießen; undefined bei Unentschieden.
// Eigene Datei ohne Testdaten-Import, damit Client-Komponenten sie nutzen können.
export function winnerSide(score: Score) {
  const { home, away } = score.home === score.away && score.penalties ? score.penalties : score
  return home > away ? 'home' : home < away ? 'away' : undefined
}
