import { Scissors } from 'lucide-react'

function SectionTitle({ eyebrow, title, inverted = false, text }) {
  return (
    <div className={`text-center ${inverted ? 'text-white' : 'text-black'}`}>
      {eyebrow ? <p className="text-sm font-black uppercase">{eyebrow}</p> : null}
      <h2 className="font-display text-4xl font-black leading-none sm:text-5xl">{title}</h2>
      {text ? (
        <p className={`mx-auto mt-4 max-w-md text-sm leading-tight ${inverted ? 'text-white/85' : 'text-neutral-700'}`}>
          {text}
        </p>
      ) : null}
      <div className="mt-5 flex items-center justify-center gap-2">
        <span className={`h-px w-16 ${inverted ? 'bg-white' : 'bg-black'}`} />
        <Scissors className="h-5 w-5" />
        <span className={`h-px w-16 ${inverted ? 'bg-white' : 'bg-black'}`} />
      </div>
    </div>
  )
}

export default SectionTitle
