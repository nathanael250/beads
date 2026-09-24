import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle, Clock, Phone, UserRound } from 'lucide-react'
import { hairServices, nailServices, skinServices } from '../data/servicesData'

const serviceGroups = [
  { label: 'Hair Services', services: hairServices },
  { label: 'Nail Services', services: nailServices },
  { label: 'Skin Care', services: skinServices },
]

const barbers = [
  {
    id: 'jean-claude',
    name: 'Jean Claude',
    role: 'Senior Barber',
    text: 'Best for precision cuts, fades, and classic grooming.',
  },
  {
    id: 'diane-uwase',
    name: 'Diane Uwase',
    role: 'Nail Specialist',
    text: 'Best for manicures, pedicures, gel, and acrylic care.',
  },
  {
    id: 'aline-kayitesi',
    name: 'Aline Kayitesi',
    role: 'Skin Care Specialist',
    text: 'Best for facials, exfoliation, and glow-focused care.',
  },
  {
    id: 'any-professional',
    name: 'Any Available Professional',
    role: 'Beads Team',
    text: 'Let us match you with the best available specialist.',
  },
]

function Booking() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')
  const [selectedServices, setSelectedServices] = useState(() => (preselectedService ? [preselectedService] : []))
  const [selectedBarber, setSelectedBarber] = useState('jean-claude')
  const [submitted, setSubmitted] = useState(false)

  const selectedServiceDetails = useMemo(
    () =>
      serviceGroups
        .flatMap((group) => group.services)
        .filter((service) => selectedServices.includes(service.id)),
    [selectedServices],
  )
  const selectedBarberDetails = barbers.find((barber) => barber.id === selectedBarber)

  function handleServicesChange(event) {
    setSubmitted(false)
    setSelectedServices(Array.from(event.target.selectedOptions, (option) => option.value))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (selectedServices.length === 0) {
      return
    }

    setSubmitted(true)
  }

  return (
    <section className="border-t border-neutral-200 px-5 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <p className="text-sm font-black uppercase">Book Appointment</p>
            <h1 className="font-display mt-3 text-5xl font-black leading-none sm:text-6xl">
              Plan your Beads visit.
            </h1>
            <p className="mt-6 max-w-md text-base font-medium leading-tight text-neutral-800">
              Choose one or more services, pick your preferred professional, then tell us when to expect you.
            </p>

            <div className="mt-8 rounded-lg border border-neutral-200 p-6">
              <p className="text-sm font-black uppercase">Selected Services</p>
              {selectedServiceDetails.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {selectedServiceDetails.map((service) => (
                    <div key={service.id} className="flex items-center justify-between gap-4 text-sm font-semibold">
                      <span>{service.title}</span>
                      <span className="shrink-0 text-neutral-500">{service.duration}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm font-medium text-neutral-600">No service selected yet.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h2 className="font-display text-3xl font-black">Appointment Details</h2>
              <div className="mt-6 grid gap-5">
                <label>
                  <span className="mb-2 block text-sm font-black uppercase">Services</span>
                  <select
                    required
                    multiple
                    name="services"
                    value={selectedServices}
                    onChange={handleServicesChange}
                    className="min-h-56 w-full rounded-md border border-neutral-300 px-4 py-3 text-sm font-medium outline-none transition focus:border-black"
                  >
                    {serviceGroups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.services.map((service) => (
                          <option key={`${service.category}-${service.id}`} value={service.id}>
                            {service.title} - {service.duration}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <span className="mt-2 block text-xs font-semibold text-neutral-500">
                    Hold Command on Mac or Ctrl on Windows to select more than one service.
                  </span>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black uppercase">Barber / Professional</span>
                  <select
                    required
                    name="barber"
                    value={selectedBarber}
                    onChange={(event) => {
                      setSelectedBarber(event.target.value)
                      setSubmitted(false)
                    }}
                    className="h-14 w-full rounded-md border border-neutral-300 px-4 text-sm font-medium outline-none transition focus:border-black"
                  >
                    {barbers.map((barber) => (
                      <option key={barber.id} value={barber.id}>
                        {barber.name} - {barber.role}
                      </option>
                    ))}
                  </select>
                  {selectedBarberDetails && (
                    <span className="mt-2 block text-xs font-semibold text-neutral-500">
                      {selectedBarberDetails.text}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-black">Your Details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="relative">
                  <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="h-14 w-full rounded-md border border-neutral-300 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-black"
                  />
                </label>
                <label className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="h-14 w-full rounded-md border border-neutral-300 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-black"
                  />
                </label>
                <label className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                  <input
                    required
                    name="date"
                    type="date"
                    className="h-14 w-full rounded-md border border-neutral-300 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-black"
                  />
                </label>
                <label className="relative">
                  <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                  <input
                    required
                    name="time"
                    type="time"
                    className="h-14 w-full rounded-md border border-neutral-300 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-black"
                  />
                </label>
              </div>
            </div>

            {selectedServices.length === 0 && (
              <p className="text-sm font-semibold text-neutral-700">Please select at least one service before booking.</p>
            )}

            {submitted && (
              <div className="flex items-center gap-3 rounded-md border border-black bg-neutral-50 p-4 text-sm font-bold">
                <CheckCircle className="h-5 w-5" />
                Appointment request prepared. We will contact the client to confirm the booking.
              </div>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-between rounded bg-black px-7 py-4 text-sm font-black uppercase text-white sm:max-w-md"
            >
              <span className="inline-flex items-center gap-4">
                <CalendarDays className="h-6 w-6" />
                Book Appointment
              </span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Booking
