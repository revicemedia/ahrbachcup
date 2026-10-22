// Konkurrenzen und Zeiten laut Plakat. Gruppen, Paarungen und Modus kommen aus dem Spielplan (lib/schedule).

export type Tournament = {
  slug: string
  name: string
  // Kurzzeichen für die Kachel, z. B. "A" oder "AH"
  badge: string
  // kurzer Name, wo der volle zu lang ist, z. B. in der Teamsuche: "A-Jun", "Herren"
  short: string
  start: string
  end?: string
  fee: string
  note?: string
}

export type Day = {
  slug: string
  weekday: string
  date: string
  // für Anstoßzeiten im Spielplan, z. B. '2027-01-08'
  isoDate: string
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
    isoDate: '2027-01-08',
    headline: 'Auftakt mit Junioren & Alten Herren',
    tournaments: [
      {
        slug: 'd-junioren',
        name: 'D-Junioren',
        short: 'D-Jun',
        badge: 'D',
        start: '14:00',
        end: '18:00',
        fee: juniorFee,
      },
      {
        slug: 'alte-herren',
        name: 'Alte Herren',
        short: 'AH',
        badge: 'AH',
        start: '18:00',
        end: '21:30',
        fee: seniorFee,
        note: 'Auf Einladung',
      },
    ],
  },
  {
    slug: 'samstag',
    weekday: 'Samstag',
    date: '9. Januar 2027',
    isoDate: '2027-01-09',
    headline: 'Junioren-Tag',
    // Auf dem Plakat steht nur "9–18 Uhr C-, B- und A-Junioren"; die Aufteilung ist ein Vorschlag
    tournaments: [
      {
        slug: 'c-junioren',
        name: 'C-Junioren',
        short: 'C-Jun',
        badge: 'C',
        start: '09:00',
        end: '12:00',
        fee: juniorFee,
      },
      {
        slug: 'b-junioren',
        name: 'B-Junioren',
        short: 'B-Jun',
        badge: 'B',
        start: '12:00',
        end: '15:00',
        fee: juniorFee,
      },
      {
        slug: 'a-junioren',
        name: 'A-Junioren',
        short: 'A-Jun',
        badge: 'A',
        start: '15:00',
        end: '18:00',
        fee: juniorFee,
      },
    ],
  },
  {
    slug: 'sonntag',
    weekday: 'Sonntag',
    date: '10. Januar 2027',
    isoDate: '2027-01-10',
    headline: 'Damen & Herren',
    tournaments: [
      {
        slug: 'damen',
        name: 'Damen',
        short: 'Damen',
        badge: 'DA',
        start: '09:00',
        fee: seniorFee,
      },
      {
        slug: 'herren',
        name: 'Herren',
        short: 'Herren',
        badge: 'H',
        start: '12:00',
        fee: seniorFee,
      },
    ],
  },
]
