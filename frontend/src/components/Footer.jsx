import { ArrowRight, Mail, Phone, Scissors } from 'lucide-react'
import { FaLocationDot } from 'react-icons/fa6'
import beadsWhite from '../assets/beads-white.png'
import { navItems, socials } from '../data/siteData'

function Footer() {
  return (
    <footer className="bg-black px-5 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_0.8fr_1fr_1.2fr]">
        <div>
          <img src={beadsWhite} alt="Beads" className="h-20 w-auto object-contain" />
          <p className="mt-4 max-w-xs text-sm font-semibold leading-tight text-white/75">
            Hair, nail and skin care designed around you. Look good Feel confident. Be your best
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <h4 className="text-sm font-black">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              {navItems.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black">Contact Us</h4>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <p className="flex gap-3"><Phone className="h-4 w-4" /> +250 788 869 973<br />+250 792 987 661</p>
              <p className="flex gap-3"><Mail className="h-4 w-4" /> info@beads.com</p>
              <p className="flex gap-3"><FaLocationDot className="h-4 w-4" /> beads-ltd.com</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black">News later</h4>
          <div className="mt-4 flex gap-2">
            <input className="min-w-0 flex-1 rounded border border-white/60 bg-black px-3 py-2 text-sm text-white placeholder:text-white/45" placeholder="Type your email here" />
            <button className="grid h-10 w-10 place-items-center rounded bg-white text-black"><ArrowRight className="h-5 w-5" /></button>
          </div>
          <p className="mt-5 text-sm font-black">Follow us:</p>
          <div className="mt-3 flex gap-4">
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="grid h-6 w-6 place-items-center rounded-full bg-white text-black transition hover:bg-neutral-200"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-center gap-6 border-t border-white/40 pt-6 text-xs font-semibold text-white/75">
        <Scissors className="h-5 w-5" />
        <span>© 2026 Beads. All rights reserved.</span>
        <Scissors className="h-5 w-5" />
      </div>
    </footer>
  )
}

export default Footer
