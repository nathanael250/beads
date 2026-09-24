import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ctaImg from '../assets/cta-img.png'

function CTA() {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-black text-white">
      <div className="relative min-h-56 sm:min-h-36">
        <img src={ctaImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex min-h-56 flex-col items-start justify-center gap-5 px-6 py-8 sm:min-h-36 sm:flex-row sm:items-center sm:justify-between md:px-24">
          <div>
            <h3 className="font-display text-3xl font-black">Ready for a fresh look?</h3>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-tight text-white/85">
              Book your appointment today and let us take care of the rest
            </p>
          </div>
          <Link to="/book-appointment" className="inline-flex shrink-0 items-center gap-3 rounded bg-white px-5 py-3 text-xs font-black uppercase text-black">
            Book your appointment now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CTA
