// Zeiten laut Plakat. Die Mannschaften sind Platzhalter: Die Gruppen werden nach dem Meldeschluss ausgelost.

export type Group = {
  name: string
  teams: string[]
}

export type Tournament = {
  slug: string
  name: string
  // Kurzzeichen für die Kachel, z. B. "A" oder "AH"
  badge: string
  start: string
  end?: string
  fee: string
  format: string
  note?: string
  groups: Group[]
}

export type Day = {
  slug: string
  weekday: string
  date: string
  headline: string
  tournaments: Tournament[]
}

export const event = {
  name: 'Ahrbach Cup',
  edition: 40,
  year: 2027,
  dateRange: '8. – 10. Januar 2027',
  city: 'Montabaur',
  venue: 'Kreissporthallen Montabaur',
  halls: 'Kreissporthalle I & II',
  address: { street: 'Von-Bodelschwingh-Straße 29', zip: '56410', city: 'Montabaur' },
  directions: [
    { mode: 'Auto', text: 'Über die A3 (Köln – Frankfurt), Anschlussstelle Montabaur.' },
    { mode: 'Bahn', text: 'ICE-Bahnhof Montabaur an der Schnellfahrstrecke Köln – Frankfurt.' },
    { mode: 'Parken', text: 'Die Parkplätze befinden sich direkt vor den Hallen.' },
  ],
  host: 'TuS Ahrbach 1921',
  registrationDeadline: '13. November 2026',
  email: 'ahrbach-cup@tus-ahrbach.de',
  website: 'https://www.tus-ahrbach.de',
  instagram: 'https://www.instagram.com/ahrbachcup/',
  // TODO: echte Adresse des Fotoportals eintragen
  photoPortal: 'https://www.tus-ahrbach.de',
  contacts: [
    { name: 'Rudolf Bauch', phone: '0160 5502503' },
    { name: 'Raimund Schäfer', phone: '0173 7251086' },
  ],
}

const juniorFee = '30 €'
const seniorFee = '40 €'

export const days: Day[] = [
  {
    slug: 'freitag',
    weekday: 'Freitag',
    date: '8. Januar 2027',
    headline: 'Auftakt mit Junioren & Alten Herren',
    tournaments: [
      {
        slug: 'd-junioren',
        name: 'D-Junioren',
        badge: 'D',
        start: '14:00',
        end: '18:00',
        fee: juniorFee,
        format: 'Gruppenphase, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['Mannschaft 1', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8', 'Mannschaft 9'] },
        ],
      },
      {
        slug: 'alte-herren',
        name: 'Alte Herren',
        badge: 'AH',
        start: '18:00',
        end: '21:30',
        fee: seniorFee,
        format: 'Gruppenphase, Finale',
        note: 'Auf Einladung',
        groups: [
          { name: 'Gruppe A', teams: ['Mannschaft 1', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8'] },
        ],
      },
    ],
  },
  {
    slug: 'samstag',
    weekday: 'Samstag',
    date: '9. Januar 2027',
    headline: 'Junioren-Tag',
    // Auf dem Plakat steht nur "9–18 Uhr C-, B- und A-Junioren"; die Aufteilung ist ein Vorschlag
    tournaments: [
      {
        slug: 'c-junioren',
        name: 'C-Junioren',
        badge: 'C',
        start: '09:00',
        end: '12:00',
        fee: juniorFee,
        format: 'Gruppenphase, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['Mannschaft 1', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8'] },
          { name: 'Gruppe C', teams: ['Mannschaft 9', 'Mannschaft 10', 'Mannschaft 11', 'Mannschaft 12', 'Mannschaft 13'] },
        ],
      },
      {
        slug: 'b-junioren',
        name: 'B-Junioren',
        badge: 'B',
        start: '12:00',
        end: '15:00',
        fee: juniorFee,
        format: 'Gruppenphase, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['Mannschaft 1', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8', 'Mannschaft 9'] },
        ],
      },
      {
        slug: 'a-junioren',
        name: 'A-Junioren',
        badge: 'A',
        start: '15:00',
        end: '18:00',
        fee: juniorFee,
        format: 'Gruppenphase, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['JSG Wäller United I', 'JSG Wäller United II', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8'] },
        ],
      },
    ],
  },
  {
    slug: 'sonntag',
    weekday: 'Sonntag',
    date: '10. Januar 2027',
    headline: 'Damen & Herren',
    tournaments: [
      {
        slug: 'damen',
        name: 'Damen',
        badge: 'DA',
        start: '09:00',
        fee: seniorFee,
        format: 'Gruppenphase, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['FSG Ahrbach / Höhr-Grenzhausen', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8'] },
        ],
      },
      {
        slug: 'herren',
        name: 'Herren',
        badge: 'H',
        start: '12:00',
        fee: seniorFee,
        format: 'Gruppenphase, Viertelfinale, Halbfinale, Finale',
        groups: [
          { name: 'Gruppe A', teams: ['SG Ahrbach', 'Mannschaft 2', 'Mannschaft 3', 'Mannschaft 4'] },
          { name: 'Gruppe B', teams: ['Mannschaft 5', 'Mannschaft 6', 'Mannschaft 7', 'Mannschaft 8'] },
          { name: 'Gruppe C', teams: ['Mannschaft 9', 'Mannschaft 10', 'Mannschaft 11', 'Mannschaft 12', 'Mannschaft 13'] },
          { name: 'Gruppe D', teams: ['Mannschaft 14', 'Mannschaft 15', 'Mannschaft 16', 'Mannschaft 17'] },
        ],
      },
    ],
  },
]

export const timeRange = (tournament: Tournament) =>
  tournament.end ? `${tournament.start} – ${tournament.end} Uhr` : `ab ${tournament.start} Uhr`
