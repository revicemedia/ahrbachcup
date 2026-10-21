// Sponsoren nach Stufe. Mit url wird der Sponsor verlinkt, logo ist ein Pfad aus /public
// (z. B. '/sponsoren/firma.svg'); ohne logo zeigt die Seite ein Platzhalter-Logo.

export type SponsorTier = 'haupt' | 'premium' | 'partner' | 'foerderer'

export type Sponsor = {
  name: string
  tier: SponsorTier
  url?: string
  logo?: string
  // Hintergrund der Kachel, z. B. für weiße Logos
  background?: string
  // zusätzlich im Footer nennen
  footer?: boolean
}

export const tiers: { id: SponsorTier; title: string; description: string }[] = [
  { id: 'haupt', title: 'Hauptsponsor', description: 'Macht den Ahrbach Cup seit Jahren möglich.' },
  { id: 'premium', title: 'Premium-Partner', description: 'Starke Partner an unserer Seite.' },
  { id: 'partner', title: 'Partner', description: 'Unterstützen Turnier, Verpflegung und Preise.' },
  { id: 'foerderer', title: 'Förderer', description: 'Jeder Beitrag zählt, danke!' },
]

export const sponsors: Sponsor[] = [
  { name: 'Sparkasse Westerwald-Sieg', tier: 'haupt', url: 'https://www.sk-westerwald-sieg.de/de/home.html', logo: '/logo_sparkasse.svg', background: '#e00', footer: true },
  { name: 'Revice Media', tier: 'premium', url: 'https://www.revice-media.com', logo: '/revice-logo.svg', footer: true },

  // TODO: Beispiel-Sponsoren für das Mockup, durch echte ersetzen
  { name: 'Autohaus Westerhöhe', tier: 'premium' },
  { name: 'Elektro Brandt & Söhne', tier: 'premium' },
  { name: 'Bäckerei Kornfeld', tier: 'partner' },
  { name: 'Getränke Quelle', tier: 'partner' },
  { name: 'Malerbetrieb Farbwerk', tier: 'partner' },
  { name: 'Physio am Markt', tier: 'partner' },
  { name: 'Holzbau Eichner', tier: 'partner' },
  { name: 'Steuerbüro Klarsicht', tier: 'partner' },
  { name: 'Gasthaus Zur Linde', tier: 'partner' },
  { name: 'Sanitär Wasserlauf', tier: 'partner' },
  { name: 'Blumen Vogt', tier: 'foerderer' },
  { name: 'Optik Weitblick', tier: 'foerderer' },
  { name: 'Fahrschule Startklar', tier: 'foerderer' },
  { name: 'Metzgerei Hofmann', tier: 'foerderer' },
  { name: 'Druckerei Papierflug', tier: 'foerderer' },
  { name: 'Apotheke am Bach', tier: 'foerderer' },
  { name: 'Reisebüro Fernweh', tier: 'foerderer' },
  { name: 'Café Anstoß', tier: 'foerderer' },
  { name: 'Dachdecker Höhenwerk', tier: 'foerderer' },
  { name: 'Friseur Schnittpunkt', tier: 'foerderer' },
  { name: 'Gartenbau Grünzeit', tier: 'foerderer' },
  { name: 'IT-Service Bitwerk', tier: 'foerderer' },
]

export const sponsorsByTier = (tier: SponsorTier) => sponsors.filter((sponsor) => sponsor.tier === tier)
