import { NavLink } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import beadsLogo from '../assets/beads-logo.png'
import { navItems, socials } from '../data/siteData'

function Header() {
  return (
    <header>
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 text-[11px] font-semibold sm:text-sm">
          <div className="flex items-center gap-2">
            <FaLocationDot className="h-4 w-4" />
            <span>11, KG 7 Avenue, KG543 Street, Kigali, Rwanda.</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-white/70">Follow Us:</span>
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="grid h-5 w-5 place-items-center rounded-full bg-white text-black transition hover:bg-neutral-200"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <nav className="bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <NavLink to="/" aria-label="Beads home">
            <img src={beadsLogo} alt="Beads" className="h-12 w-auto object-contain" />
          </NavLink>
          <div className="hidden items-center gap-12 text-sm font-bold md:flex">
            {navItems.map(({ label, href }) => (
              <NavLink
                key={label}
                to={href}
                className="group relative py-2"
              >
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-center bg-black transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
