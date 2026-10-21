import Image from 'next/image'

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image alt="TuS Ahrbach 1921" src="/logo100.png" width={88} height={100} preload className="h-11 w-auto" />
      <span className={`text-lg/5 font-extrabold tracking-tight uppercase ${inverted ? 'text-white' : 'text-navy'}`}>
        Ahrbach Cup
        <span className="block text-[0.65rem]/4 font-semibold tracking-[0.2em] text-red">40. Jubiläumsturnier</span>
      </span>
    </span>
  )
}
