import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle, Clock } from 'lucide-react'
import { getServiceById } from '../data/servicesData'
import barberImg from '../assets/barber.png'

function ServiceDetail() {
  const { category = 'hair', serviceId } = useParams()
  const service = getServiceById(category, serviceId)

  if (!service) {
    return <Navigate to="/services/hair" replace />
  }

  return (
    <section className="border-t border-neutral-200 px-5 py-14 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src={service.image}
            alt={`${service.title} service`}
            className="h-[300px] w-full rounded-lg object-cover object-center lg:h-[360px]"
          />

          <div>
            <span className="w-fit rounded-full border border-black px-5 py-2 text-xs font-medium uppercase text-black">
              {service.categoryLabel}
            </span>
            <h1 className="font-display mt-6 text-5xl font-black leading-none sm:text-6xl">{service.title}</h1>
            <div className="mt-7 text-lg font-medium leading-tight text-black">
              <p>{service.intro}</p>
              <p>{service.subtitle}</p>
            </div>

            <div className="mt-7 flex items-center gap-3 text-base font-medium">
              <Clock className="h-5 w-5" />
              <span>{service.duration}</span>
            </div>

            <Link
              to={`/book-appointment?category=${category}&service=${service.id}`}
              className="mt-8 inline-flex w-full max-w-sm items-center justify-between rounded bg-black px-7 py-4 text-sm font-black uppercase text-white"
            >
              <span className="inline-flex items-center gap-4">
                <CalendarDays className="h-6 w-6" />
                Book an Appointment
              </span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-black uppercase">About This Service</p>
              <p className="mt-5 max-w-lg text-base font-medium leading-tight text-black">
                {service.about}
              </p>
              <div className="mt-8 space-y-4">
                {service.points.map((point) => (
                  <div key={point} className="flex items-center gap-4 text-sm font-medium text-black">
                    <CheckCircle className="h-5 w-5 shrink-0 stroke-[2.5]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-center gap-8 border-neutral-200 lg:grid-cols-[180px_1fr] lg:border-l lg:pl-12">
              <img
                src={barberImg}
                alt="Jean Claude"
                className="h-40 w-40 rounded-full object-cover object-left"
              />
              <div>
                <p className="text-xs font-medium uppercase">Your Barber</p>
                <h2 className="font-display mt-3 text-3xl font-black">Jean Claude</h2>
                <p className="mt-2 text-base font-medium">Senior Barber</p>
                <p className="mt-6 max-w-md text-sm font-medium leading-tight text-black">
                  6+ years of experience in classic and modern haircuts. Passionate about precision
                  and helping every client look and feel their best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetail
