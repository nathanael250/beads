import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { fetchServices } from '../services/api'

function Services() {
  const { category = 'hair' } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const categoryTitles = {
    hair: 'hair services',
    nails: 'nail services',
    'skin-care': 'skin care services',
  }
  const categoryTitle = categoryTitles[category] || categoryTitles.hair
  const [services, setServices] = useState([])
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchServices()
      .then((apiServices) => {
        if (!isMounted) {
          return
        }

        const categoryServices = apiServices.filter((service) => service.category === category)
        setServices(categoryServices)
        setLoadError(categoryServices.length > 0 ? '' : 'No backend services were found for this category.')
      })
      .catch(() => {
        if (isMounted) {
          setServices([])
          setLoadError('Backend services could not be loaded. Please check API auth and CORS.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [category])

  return (
    <section className="border-t border-neutral-200 px-5 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-lg font-medium">Explore our range of professional {categoryTitle}</p>
        {loadError && <p className="mt-4 text-center text-sm font-semibold text-neutral-600">{loadError}</p>}

        {isLoading ? (
          <ServiceSkeletonGrid />
        ) : services.length === 0 ? (
          <div className="mt-14 rounded-lg border border-neutral-200 px-6 py-10 text-center text-sm font-semibold text-neutral-700">
            Services are not available right now.
          </div>
        ) : (
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ id, title, text, image }) => (
              <Link
                key={id}
                to={`/services/${category}/${id}`}
                className="group overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
              >
                <img src={image} alt={title} className="h-40 w-full object-cover object-center" />
                <div className="px-5 pb-5 pt-5">
                  <h2 className="font-display text-xl font-black leading-none">{title}</h2>
                  <div className="mt-4 flex min-h-10 items-end justify-between gap-4">
                    <p className="max-w-40 text-[13px] font-medium leading-tight">{text}</p>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-white">
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-lg border border-neutral-200 px-8 py-8">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-8">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-black text-white">
                <CalendarDays className="h-10 w-10" />
              </span>
              <div>
                <h2 className="font-display text-xl font-black">Not sure which service you need?</h2>
                <p className="mt-3 max-w-md text-sm font-medium leading-tight">
                  Our team is here to help you choose the perfect service for your needs.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-14 rounded border border-neutral-300 px-10 py-4 text-sm font-medium uppercase text-black transition hover:border-black md:w-auto"
            >
              Contact Us <ArrowRight className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceSkeletonGrid() {
  return (
    <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading services">
      {Array.from({ length: 8 }, (_, index) => (
        <article key={index} className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.14)]">
          <div className="h-40 animate-pulse bg-neutral-200" />
          <div className="px-5 pb-5 pt-5">
            <div className="h-6 w-36 animate-pulse rounded bg-neutral-200" />
            <div className="mt-4 flex min-h-10 items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="h-3 w-36 animate-pulse rounded bg-neutral-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
              </div>
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-neutral-200" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Services
