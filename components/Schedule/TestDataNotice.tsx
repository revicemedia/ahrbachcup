import { IS_TEST_DATA } from '@/lib/schedule'

// Hinweis, solange der Spielplan noch mit Testdaten läuft; verschwindet mit IS_TEST_DATA = false
export default function TestDataNotice({ className = '' }: { className?: string }) {
  if (!IS_TEST_DATA) return null
  return (
    <p className={`inline-flex items-start gap-2 bg-gold px-3 py-2 text-sm font-semibold text-navy ${className}`}>
      <span className="shrink-0 font-black uppercase">Testdaten:</span>
      <span className="font-medium">Paarungen und Zeiten aus dem Spielplan 2026, alle Ergebnisse sind ausgedacht.</span>
    </p>
  )
}
