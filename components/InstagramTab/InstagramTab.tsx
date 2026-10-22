import InstagramIcon from '@/components/Icon/InstagramIcon'
import { event } from '@/lib/tournaments'

// Instagram-Farbverlauf, damit der Link sofort als Instagram erkannt wird
const gradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'

const handle = `@${new URL(event.instagram).pathname.replaceAll('/', '')}`

// Am Desktop ein senkrechter Reiter am rechten Rand, auf dem Handy ein Button unten rechts
export default function InstagramTab() {
  return (
    <a
      href={event.instagram}
      target="_blank"
      aria-label={`${event.name} auf Instagram: ${handle}`}
      style={{ backgroundImage: gradient }}
      className="group fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center text-white shadow-lg transition-transform hover:-translate-y-0.5 lg:top-1/2 lg:right-0 lg:bottom-auto lg:size-auto lg:-translate-y-1/2 lg:translate-x-1 lg:flex-col lg:gap-3 lg:px-3 lg:py-5 lg:hover:translate-x-0 lg:hover:-translate-y-1/2"
    >
      <InstagramIcon className="size-6 lg:size-5" />
      <span className="hidden text-sm font-semibold tracking-wide [writing-mode:vertical-rl] lg:block">{handle}</span>
    </a>
  )
}
