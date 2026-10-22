import InstagramIcon from '@/components/Icon/InstagramIcon'
import { event } from '@/lib/tournaments'

// Instagram-Farbverlauf, damit der Link sofort als Instagram erkannt wird
const gradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'

const handle = `@${new URL(event.instagram).pathname.replaceAll('/', '')}`

// Auf breiten Bildschirmen ein senkrechter Reiter am rechten Rand, auf dem Handy ein Button unten rechts
export default function InstagramTab() {
  return (
    <a
      href={event.instagram}
      target="_blank"
      aria-label={`${event.name} auf Instagram: ${handle}`}
      style={{ backgroundImage: gradient }}
      className="group fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center text-white shadow-lg transition-transform hover:-translate-y-0.5 xl:top-1/2 xl:right-0 xl:bottom-auto xl:size-auto xl:-translate-y-1/2 xl:translate-x-1 xl:flex-col xl:gap-3 xl:px-3 xl:py-5 xl:hover:translate-x-0 xl:hover:-translate-y-1/2"
    >
      <InstagramIcon className="size-6 xl:size-5" />
      <span className="hidden text-sm font-semibold tracking-wide [writing-mode:vertical-rl] xl:block">{handle}</span>
    </a>
  )
}
