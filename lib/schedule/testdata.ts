// Testdaten für den Spielplan, bis Admin-Dashboard und Datenbank angebunden sind.
// Paarungen, Uhrzeiten und Hallen aus dem Spielplan des Ahrbach Cups 2026, verschoben auf die Termine 2027.
// Die Ergebnisse sind ausgedacht.

import type { HallId, Match, Score, Slot, Stage } from './types'

// Fester Zeitpunkt für die Vorschau: Samstag mittags, damit fertige, laufende und kommende Spiele zu sehen sind
export const DEMO_NOW = '2027-01-09T13:10'

const competitions: Record<string, { slug: string; date: string; groupMinutes: number | ((group: string) => number); koMinutes: number }> = {
  D: { slug: 'd-junioren', date: '2027-01-08', groupMinutes: 10, koMinutes: 10 },
  AH: { slug: 'alte-herren', date: '2027-01-08', groupMinutes: 10, koMinutes: 10 },
  C: { slug: 'c-junioren', date: '2027-01-09', groupMinutes: 12, koMinutes: 9 },
  // Gruppe 1 spielt im 10-Minuten-Takt, die übrigen im 13-Minuten-Takt
  B: { slug: 'b-junioren', date: '2027-01-09', groupMinutes: (group) => (group === '1' ? 9 : 12), koMinutes: 9 },
  A: { slug: 'a-junioren', date: '2027-01-09', groupMinutes: 12, koMinutes: 9 },
  DA: { slug: 'damen', date: '2027-01-10', groupMinutes: 9, koMinutes: 9 },
  H: { slug: 'herren', date: '2027-01-10', groupMinutes: 12, koMinutes: 10 },
}

export const ceremonies: Record<string, string> = {
  'd-junioren': '17:30',
  'alte-herren': '21:20',
  'c-junioren': '12:15',
  'b-junioren': '17:30',
  'a-junioren': '20:15',
  damen: '12:06',
  // im Plan 2026 steht 17:31, das Finale beginnt aber erst 17:32
  herren: '17:45',
}

// Zeit Halle Konkurrenz Runde | Heim | Gast
// Runde: G1 = Gruppe 1, AF/VF/HF + Nummer, P3 = Spiel um Platz 3, F = Finale, P5/P7/P9 = Platzierungsspiele
// Platzhalter: @1.2 = Zweiter Gruppe 1, #3.1 = bester Gruppendritter, W VF1 = Sieger VF1, L HF1 = Verlierer HF1
const plan = `
14:30 1 D G1 | SF Eisbachtal | JSG Ahrbach I
14:30 2 D G1 | JSG Steinbach | JFV Oberwesterwald II
14:41 1 D G2 | VfL Hamm | JSG Ahrbach II
14:41 2 D G2 | VfL Bad Ems | JSG SF Westerwald
14:52 1 D G3 | JFV Oberwesterwald | JSG Hundsangen
14:52 2 D G3 | JSG Augst/Immendorf | JSG Weißenturm
15:03 1 D G1 | SF Eisbachtal | JSG Steinbach
15:03 2 D G1 | JSG Ahrbach I | JFV Oberwesterwald II
15:14 1 D G2 | VfL Hamm | VfL Bad Ems
15:14 2 D G2 | JSG Ahrbach II | JSG SF Westerwald
15:25 1 D G3 | JFV Oberwesterwald | JSG Augst/Immendorf
15:25 2 D G3 | JSG Hundsangen | JSG Weißenturm
15:36 1 D G1 | SF Eisbachtal | JFV Oberwesterwald II
15:36 2 D G1 | JSG Ahrbach I | JSG Steinbach
15:47 1 D G2 | VfL Hamm | JSG SF Westerwald
15:47 2 D G2 | JSG Ahrbach II | VfL Bad Ems
15:58 1 D G3 | JFV Oberwesterwald | JSG Weißenturm
15:58 2 D G3 | JSG Hundsangen | JSG Augst/Immendorf
16:20 1 D VF1 | @1.1 | #3.1
16:20 2 D VF2 | @2.1 | #3.2
16:31 1 D VF3 | @3.1 | @1.2
16:31 2 D VF4 | @2.2 | @3.2
16:42 1 D HF1 | W VF1 | W VF2
16:53 1 D HF2 | W VF3 | W VF4
17:04 1 D P3 | L HF1 | L HF2
17:15 1 D F | W HF1 | W HF2

18:00 1 AH G1 | AH Elz | AH Leuterod/Ötzingen
18:00 2 AH G2 | AH Horressen | AH Wirges
18:11 1 AH G1 | AH Ebernhahn | AH Eppenrod
18:11 2 AH G2 | AH Lahnstein | AH Dreikirchen
18:22 1 AH G1 | AH Elz | AH Feldkirchen
18:22 2 AH G2 | AH Horressen | AH Meudt
18:33 1 AH G1 | AH Leuterod/Ötzingen | AH Ebernhahn
18:33 2 AH G2 | AH Wirges | AH Lahnstein
18:44 1 AH G1 | AH Eppenrod | AH Feldkirchen
18:44 2 AH G2 | AH Dreikirchen | AH Meudt
18:55 1 AH G1 | AH Elz | AH Ebernhahn
18:55 2 AH G2 | AH Horressen | AH Lahnstein
19:06 1 AH G1 | AH Leuterod/Ötzingen | AH Eppenrod
19:06 2 AH G2 | AH Wirges | AH Dreikirchen
19:17 1 AH G1 | AH Ebernhahn | AH Feldkirchen
19:17 2 AH G2 | AH Lahnstein | AH Meudt
19:28 1 AH G1 | AH Elz | AH Eppenrod
19:28 2 AH G2 | AH Horressen | AH Dreikirchen
19:39 1 AH G1 | AH Leuterod/Ötzingen | AH Feldkirchen
19:39 2 AH G2 | AH Wirges | AH Meudt
20:00 1 AH P9 | @1.5 | @2.5
20:11 1 AH HF1 | @1.1 | @2.2
20:22 1 AH P7 | @1.4 | @2.4
20:33 1 AH HF2 | @1.2 | @2.1
20:44 1 AH P5 | @1.3 | @2.3
20:55 1 AH P3 | L HF1 | L HF2
21:06 1 AH F | W HF1 | W HF2

09:15 1 C G1 | SF Eisbachtal | JSG Kreuzberg/Marienh. I
09:15 2 C G1 | JFV Oberwesterwald II | JFV Schieferland II
09:28 1 C G2 | Germania Metternich | SG Betzdorf
09:28 2 C G2 | JFV Schieferland I | JFV Oberwesterwald I
09:41 1 C G3 | VfL Hamm | JSG Kreuzberg/Marienh. II
09:41 2 C G3 | JSG Siegtal/Heller | JSG WällerUnited
09:54 1 C G1 | SF Eisbachtal | JFV Oberwesterwald II
09:54 2 C G1 | JSG Kreuzberg/Marienh. I | JFV Schieferland II
10:07 1 C G2 | Germania Metternich | JFV Schieferland I
10:07 2 C G2 | SG Betzdorf | JFV Oberwesterwald I
10:20 1 C G3 | VfL Hamm | JSG Siegtal/Heller
10:20 2 C G3 | JSG Kreuzberg/Marienh. II | JSG WällerUnited
10:33 1 C G1 | SF Eisbachtal | JFV Schieferland II
10:33 2 C G1 | JSG Kreuzberg/Marienh. I | JFV Oberwesterwald II
10:46 1 C G2 | Germania Metternich | JFV Oberwesterwald I
10:46 2 C G2 | SG Betzdorf | JFV Schieferland I
10:59 1 C G3 | VfL Hamm | JSG WällerUnited
10:59 2 C G3 | JSG Kreuzberg/Marienh. II | JSG Siegtal/Heller
11:12 1 C VF1 | @1.1 | #3.1
11:12 2 C VF2 | @2.1 | #3.2
11:22 1 C VF3 | @3.1 | @1.2
11:22 2 C VF4 | @2.2 | @3.2
11:32 1 C HF1 | W VF1 | W VF2
11:42 1 C HF2 | W VF3 | W VF4
11:52 1 C P3 | L HF1 | L HF2
12:02 1 C F | W HF1 | W HF2

12:00 2 B G2 | JSG Altenkirchen | FV Biebrich
12:13 2 B G2 | FC Lions Ransbach II | JSG Neuwied
12:26 2 B G4 | EGC Wirges I | JSG Wällerland
12:30 1 B G1 | TuS Koblenz | SG Andernach
12:39 2 B G4 | SF Eisbachtal | SF Westerwald I
12:40 1 B G1 | FC Lions Ransbach I | JSG Mühlbachtal
12:50 1 B G1 | TuS Koblenz | JSG WällerUnited II
12:52 2 B G5 | JFV Schieferland | JSG WällerUnited I
13:00 1 B G3 | SG Mülheim-Kärlich | JFV Schieferland II
13:05 2 B G5 | VfL Hamm | SF Westerwald II
13:13 1 B G3 | SF Puderbach | EGC Wirges II
13:18 2 B G2 | JSG Altenkirchen | FC Lions Ransbach II
13:26 1 B G1 | SG Andernach | FC Lions Ransbach I
13:31 2 B G2 | FV Biebrich | JSG Neuwied
13:36 1 B G1 | JSG Mühlbachtal | JSG WällerUnited II
13:44 2 B G4 | EGC Wirges I | SF Eisbachtal
13:46 1 B G1 | TuS Koblenz | FC Lions Ransbach I
13:56 1 B G3 | SG Mülheim-Kärlich | SF Puderbach
13:57 2 B G4 | JSG Wällerland | SF Westerwald I
14:09 1 B G3 | JFV Schieferland II | EGC Wirges II
14:10 2 B G5 | JFV Schieferland | VfL Hamm
14:22 1 B G1 | SG Andernach | JSG Mühlbachtal
14:23 2 B G5 | JSG WällerUnited I | SF Westerwald II
14:32 1 B G1 | FC Lions Ransbach I | JSG WällerUnited II
14:36 2 B G2 | JSG Altenkirchen | JSG Neuwied
14:42 1 B G1 | TuS Koblenz | JSG Mühlbachtal
14:49 2 B G2 | FV Biebrich | FC Lions Ransbach II
14:52 1 B G1 | SG Andernach | JSG WällerUnited II
15:02 1 B G5 | JFV Schieferland | SF Westerwald II
15:02 2 B G4 | EGC Wirges I | SF Westerwald I
15:15 1 B G3 | SG Mülheim-Kärlich | EGC Wirges II
15:15 2 B G4 | JSG Wällerland | SF Eisbachtal
15:28 1 B G3 | JFV Schieferland II | SF Puderbach
15:28 2 B G5 | JSG WällerUnited I | VfL Hamm
15:45 1 B AF1 | @1.1 | @2.3
15:45 2 B AF2 | @4.1 | @5.3
15:55 1 B AF3 | @2.1 | @1.3
15:55 2 B AF4 | @5.1 | @4.3
16:05 1 B AF5 | @1.2 | @2.2
16:05 2 B AF6 | @3.2 | @4.2
16:15 1 B AF7 | @1.4 | @3.1
16:15 2 B AF8 | @5.2 | @3.3
16:25 1 B VF1 | W AF1 | W AF2
16:25 2 B VF2 | W AF3 | W AF4
16:35 1 B VF3 | W AF5 | W AF6
16:35 2 B VF4 | W AF7 | W AF8
16:45 1 B HF1 | W VF1 | W VF2
16:55 1 B HF2 | W VF3 | W VF4
17:05 1 B P3 | L HF1 | L HF2
17:15 1 B F | W HF1 | W HF2

16:50 2 A G1 | JSG Neitersen/Altenk. | JSG Weißenthurm
17:03 2 A G1 | JSG Wällerland | JSG WällerUnited I
17:16 2 A G2 | SF Eisbachtal | JSG WällerUnited II
17:29 2 A G2 | JFV Oberwesterwald | SF Westerwald
17:40 1 A G3 | JSF Moseltal | N. N.
17:42 2 A G3 | JFV Schieferland | JSG Birlenbach
17:53 1 A G1 | JSG Neitersen/Altenk. | JSG Wällerland
17:55 2 A G1 | JSG Weißenthurm | JSG WällerUnited I
18:06 1 A G2 | SF Eisbachtal | JFV Oberwesterwald
18:08 2 A G2 | JSG WällerUnited II | SF Westerwald
18:19 1 A G3 | JFV Schieferland | JSF Moseltal
18:21 2 A G3 | JSG Birlenbach | N. N.
18:32 1 A G1 | JSG Neitersen/Altenk. | JSG WällerUnited I
18:34 2 A G1 | JSG Weißenthurm | JSG Wällerland
18:45 1 A G2 | SF Eisbachtal | SF Westerwald
18:47 2 A G2 | JSG WällerUnited II | JFV Oberwesterwald
18:58 1 A G3 | JSG Birlenbach | JSF Moseltal
19:00 2 A G3 | JFV Schieferland | N. N.
19:13 1 A VF1 | @1.1 | #3.1
19:13 2 A VF2 | @2.1 | #3.2
19:23 1 A VF3 | @3.1 | @1.2
19:23 2 A VF4 | @2.2 | @3.2
19:33 1 A HF1 | W VF1 | W VF2
19:43 1 A HF2 | W VF3 | W VF4
19:53 1 A P3 | L HF1 | L HF2
20:03 1 A F | W HF1 | W HF2

09:30 1 DA G1 | SV Diez-Freiendiez I | SF Ahrbach-Höhr I
09:30 2 DA G2 | FC Urbar | SV Diez-Freiendiez II
09:40 1 DA G1 | FSG Freirachdorf | SC Westernohe
09:40 2 DA G2 | FSG Osterspai | SV Hundsangen
09:50 1 DA G1 | SV Diez-Freiendiez I | SJK SW Wiesbaden
09:50 2 DA G2 | FC Urbar | SF Ahrbach-Höhr II
10:00 1 DA G1 | FSG Freirachdorf | SF Ahrbach-Höhr I
10:00 2 DA G2 | SV Diez-Freiendiez II | FSG Osterspai
10:10 1 DA G1 | SJK SW Wiesbaden | SC Westernohe
10:10 2 DA G2 | SV Hundsangen | SF Ahrbach-Höhr II
10:20 1 DA G1 | SV Diez-Freiendiez I | FSG Freirachdorf
10:20 2 DA G2 | FC Urbar | FSG Osterspai
10:30 1 DA G1 | SF Ahrbach-Höhr I | SC Westernohe
10:30 2 DA G2 | SV Diez-Freiendiez II | SV Hundsangen
10:40 1 DA G1 | SJK SW Wiesbaden | FSG Freirachdorf
10:40 2 DA G2 | FSG Osterspai | SF Ahrbach-Höhr II
10:50 1 DA G1 | SV Diez-Freiendiez I | SC Westernohe
10:50 2 DA G2 | FC Urbar | SV Hundsangen
11:00 1 DA G1 | SJK SW Wiesbaden | SF Ahrbach-Höhr I
11:00 2 DA G2 | SV Diez-Freiendiez II | SF Ahrbach-Höhr II
11:23 1 DA HF1 | @1.1 | @2.2
11:23 2 DA HF2 | @2.1 | @1.2
11:46 1 DA P3 | L HF1 | L HF2
11:56 1 DA F | W HF1 | W HF2

11:10 1 H G1 | SG Ahrbach I | SG Puderbach
11:10 2 H G1 | TuS Niederneisen | Türkiyemspor RaBa I
11:33 1 H G4 | FC Kosova Montabaur I | DJK Andernach
11:33 2 H G4 | SG Siershahn-Selters | SG Altendiez-Gückingen
11:46 2 H G5 | SF Höhr-Grenzhausen | SG Unnertal
11:59 2 H G5 | SG Nauort-Ransbach II | SG Hemmerich
12:12 2 H G6 | TuS Montabaur | SV Reinhardt´s Elf
12:16 1 H G2 | SG Augst | SG Ahrbach III
12:25 2 H G6 | SG Ahrbach II | SG Nauort-Ransbach I
12:29 1 H G2 | FC Kosova Montabaur II | Türkiyemspor RaBa II
12:38 2 H G4 | FC Kosova Montabaur I | SG Siershahn-Selters
12:42 1 H G3 | SG Hundsangen-S.-W. | SF Bad Ems
12:51 2 H G4 | DJK Andernach | SG Altendiez-Gückingen
12:55 1 H G3 | SG Elbert-Horbach | FSV Ebernhahn
13:04 2 H G5 | SF Höhr-Grenzhausen | SG Nauort-Ransbach II
13:08 1 H G1 | SG Ahrbach I | TuS Niederneisen
13:17 2 H G5 | SG Unnertal | SG Hemmerich
13:21 1 H G1 | SG Puderbach | Türkiyemspor RaBa I
13:30 2 H G6 | TuS Montabaur | SG Ahrbach II
13:34 1 H G2 | SG Augst | FC Kosova Montabaur II
13:43 2 H G6 | SV Reinhardt´s Elf | SG Nauort-Ransbach I
13:47 1 H G2 | SG Ahrbach III | Türkiyemspor RaBa II
13:56 2 H G4 | FC Kosova Montabaur I | SG Altendiez-Gückingen
14:00 1 H G3 | SG Hundsangen-S.-W. | SG Elbert-Horbach
14:09 2 H G4 | DJK Andernach | SG Siershahn-Selters
14:13 1 H G3 | SF Bad Ems | FSV Ebernhahn
14:22 2 H G5 | SF Höhr-Grenzhausen | SG Hemmerich
14:26 1 H G1 | SG Ahrbach I | Türkiyemspor RaBa I
14:35 2 H G5 | SG Unnertal | SG Nauort-Ransbach II
14:39 1 H G1 | SG Puderbach | TuS Niederneisen
14:48 2 H G6 | TuS Montabaur | SG Nauort-Ransbach I
14:52 1 H G2 | SG Augst | Türkiyemspor RaBa II
15:01 2 H G6 | SV Reinhardt´s Elf | SG Ahrbach II
15:05 1 H G2 | SG Ahrbach III | FC Kosova Montabaur II
15:14 2 H G3 | SF Bad Ems | SG Elbert-Horbach
15:18 1 H G3 | SG Hundsangen-S.-W. | FSV Ebernhahn
15:27 2 H AF1 | @4.1 | #3.3
15:31 1 H AF2 | @1.1 | #3.1
15:38 2 H AF3 | @5.1 | #3.4
15:42 1 H AF4 | @2.1 | #3.2
15:49 2 H AF5 | @6.1 | @4.2
15:53 1 H AF6 | @3.1 | @1.2
16:00 2 H AF7 | @5.2 | @6.2
16:04 1 H AF8 | @2.2 | @3.2
16:15 1 H VF1 | W AF1 | W AF2
16:26 1 H VF2 | W AF3 | W AF4
16:37 1 H VF3 | W AF5 | W AF6
16:48 1 H VF4 | W AF7 | W AF8
16:59 1 H HF1 | W VF1 | W VF2
17:10 1 H HF2 | W VF3 | W VF4
17:21 1 H P3 | L HF1 | L HF2
17:32 1 H F | W HF1 | W HF2
`

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

function parseStage(token: string): { stage: Stage; group?: string; label?: string; placement?: number } {
  if (token.startsWith('G')) return { stage: 'group', group: token.slice(1) }
  if (token === 'F') return { stage: 'final', label: 'F' }
  if (token === 'P3') return { stage: 'third', label: 'P3' }
  if (/^P\d+$/.test(token)) return { stage: 'placement', label: token, placement: Number(token.slice(1)) }
  const stages: Record<string, Stage> = { AF: 'roundOf16', VF: 'quarterfinal', HF: 'semifinal' }
  return { stage: stages[token.slice(0, 2)], label: token }
}

function parseSlot(token: string, competition: string): Slot {
  const group = token.match(/^@(\d+)\.(\d+)$/)
  if (group) return { type: 'group', group: group[1], rank: Number(group[2]) }
  const best = token.match(/^#(\d+)\.(\d+)$/)
  if (best) return { type: 'bestOfRank', rank: Number(best[1]), position: Number(best[2]) }
  const result = token.match(/^([WL]) (\w+)$/)
  if (result) return { type: result[1] === 'W' ? 'winner' : 'loser', match: `${competition}-${result[2].toLowerCase()}` }
  return { type: 'team', team: token }
}

// Gleiche Eingabe, gleiches Ergebnis: Pseudozufall aus der Spiel-ID
function seeded(text: string) {
  let hash = 2166136261
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return () => {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507) >>> 0
    return hash / 2 ** 32
  }
}

function testScore(match: Match): Score | undefined {
  if (match.start > DEMO_NOW) return undefined
  const random = seeded(match.id)
  const goals = () => Math.floor(random() ** 1.6 * 5)
  // laufende Spiele haben erst einen Teil ihrer Tore
  const share = match.end > DEMO_NOW ? 0.5 : 1
  const score: Score = { home: Math.floor(goals() * share), away: Math.floor(goals() * share) }
  if (match.stage !== 'group' && share === 1 && score.home === score.away) {
    const home = 3 + Math.floor(random() * 3)
    score.penalties = random() < 0.5 ? { home, away: home - 1 } : { home: home - 1, away: home }
  }
  return score
}

const groupCounters = new Map<string, number>()

export const testMatches: Match[] = plan
  .trim()
  .split('\n')
  .filter((line) => line.trim())
  .map((line) => {
    const [head, home, away] = line.split('|').map((part) => part.trim())
    const [time, hall, code, stageToken] = head.split(' ')
    const competition = competitions[code]
    const { stage, group, label, placement } = parseStage(stageToken)
    const minutes = stage === 'group' ? (typeof competition.groupMinutes === 'function' ? competition.groupMinutes(group!) : competition.groupMinutes) : competition.koMinutes
    const key = `${competition.slug}-${group}`
    const number = (groupCounters.get(key) ?? 0) + 1
    if (group) groupCounters.set(key, number)

    const match: Match = {
      id: label ? `${competition.slug}-${label.toLowerCase()}` : `${competition.slug}-g${group}-${number}`,
      competition: competition.slug,
      stage,
      group,
      label,
      placement,
      start: `${competition.date}T${time}`,
      end: `${competition.date}T${toTime(toMinutes(time) + minutes)}`,
      hall: `halle-${hall}` as HallId,
      home: parseSlot(home, competition.slug),
      away: parseSlot(away, competition.slug),
    }
    return { ...match, score: testScore(match) }
  })
