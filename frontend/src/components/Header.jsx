import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { FaLocationDot } from 'react-icons/fa6'
import beadsLogo from '../assets/beads-logo.png'
import { navItems, serviceCategories, socials } from '../data/siteData'

function Header() {
  const location = useLocation()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true)

  return (
    <header>
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-3 text-[11px] font-semibold sm:justify-between sm:px-5 sm:text-sm">
          <div className="flex min-w-0 items-center gap-2">
            <FaLocationDot className="h-4 w-4 shrink-0" />
            <span className="truncate">11, KG 7 Avenue, KG543 Street, Kigali, Rwanda.</span>
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
          <NavLink to="/" aria-label="Beads home">
            <img src={beadsLogo} alt="Beads" className="h-11 w-auto object-contain sm:h-12" />
          </NavLink>
          <div className="hidden items-center gap-12 text-sm font-medium md:flex">
            {navItems.map(({ label, href }) => {
              if (label === 'Services') {
                const isServicesActive = location.pathname.startsWith('/services')

                return (
                  <div
                    key={label}
                    className="group relative py-2"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className="relative cursor-pointer font-medium"
                      onFocus={() => setIsServicesOpen(true)}
                      onClick={() => setIsServicesOpen((open) => !open)}
                    >
                      <span>{label}</span>
                      <span
                        className={`absolute inset-x-0 -bottom-2 h-0.5 origin-center bg-black transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                          isServicesActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 pt-4 transition duration-200 ${
                        isServicesOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                      }`}
                    >
                      <div className="rounded-md border border-neutral-200 bg-white p-2 shadow-lg">
                        {serviceCategories.map(({ label: categoryLabel, href: categoryHref, icon: Icon }) => (
                          <NavLink
                            key={categoryLabel}
                            to={categoryHref}
                            onClick={() => setIsServicesOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 rounded px-4 py-3 text-sm font-semibold transition ${
                              isActive ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {categoryLabel}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
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
              )
            })}
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => {
              setIsMobileOpen((open) => !open)
              setIsMobileServicesOpen(true)
            }}
            className="grid h-10 w-10 place-items-center rounded border border-neutral-200 text-black md:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div
          className={`border-t border-neutral-100 bg-white transition md:hidden ${
            isMobileOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="space-y-1 px-4 pb-4">
            {navItems.map(({ label, href }) => {
              if (label === 'Services') {
                return (
                  <div key={label} className="pt-2">
                    <button
                      type="button"
                      aria-expanded={isMobileServicesOpen}
                      onClick={() => setIsMobileServicesOpen((open) => !open)}
                      className={`flex w-full items-center justify-between rounded px-3 py-3 text-left text-sm font-medium ${
                        location.pathname.startsWith('/services') ? 'bg-black text-white' : 'text-black'
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isMobileServicesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div className={`grid gap-1 overflow-hidden pl-3 transition-all duration-200 ${
                      isMobileServicesOpen ? 'mt-1 max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {serviceCategories.map(({ label: categoryLabel, href: categoryHref, icon: Icon }) => (
                        <NavLink
                          key={categoryLabel}
                          to={categoryHref}
                          onClick={() => {
                            setIsMobileOpen(false)
                            setIsMobileServicesOpen(true)
                          }}
                          className={({ isActive }) => `flex items-center gap-3 rounded px-3 py-3 text-sm font-medium ${
                            isActive ? 'bg-black text-white' : 'text-black'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {categoryLabel}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <NavLink
                  key={label}
                  to={href}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => `block rounded px-3 py-3 text-sm font-medium ${
                    isActive ? 'bg-black text-white' : 'text-black'
                  }`}
                >
                  {label}
                </NavLink>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
