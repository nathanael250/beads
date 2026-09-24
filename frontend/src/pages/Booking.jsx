import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Scissors } from 'lucide-react'
import { hairServices, nailServices, skinServices } from '../data/servicesData'

const serviceOptions = [
  hairServices.find((service) => service.title === 'Classic Haircut'),
  hairServices.find((service) => service.title === 'Fade Haircut'),
  hairServices.find((service) => service.title === 'Hair Trim'),
  hairServices.find((service) => service.title === 'Twists'),
  nailServices.find((service) => service.title === 'Classic Manicure'),
  skinServices.find((service) => service.title === 'Basic Facial'),
].filter(Boolean)

const serviceLabels = {
  'Classic Haircut': 'Haircut',
  'Fade Haircut': 'Beard Trim',
  'Hair Trim': 'Haircut + Beard',
  Twists: 'Twists',
  'Classic Manicure': 'Manicure',
  'Basic Facial': 'Facial',
}

const barbers = [
  { id: 'jean-claude', name: 'Jean Claude', role: 'Senior Barber' },
  { id: 'diane-uwase', name: 'Diane Uwase', role: 'Nail Specialist' },
  { id: 'aline-kayitesi', name: 'Aline Kayitesi', role: 'Skin Care Specialist' },
  { id: 'any-professional', name: 'Any Available Professional', role: 'Beads Team' },
]

const fieldClassName = 'h-14 w-full rounded border border-neutral-300 bg-white px-5 text-sm outline-none transition placeholder:text-neutral-500 focus:border-black'

function Booking() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')
  const defaultServices = preselectedService ? [preselectedService] : [serviceOptions[0]?.id].filter(Boolean)
  const [selectedServices, setSelectedServices] = useState(defaultServices)
  const [selectedBarber, setSelectedBarber] = useState('jean-claude')
  const [submitted, setSubmitted] = useState(false)

  function getServiceLabel(service) {
    return serviceLabels[service.title] || service.title
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (selectedServices.length === 0) {
      return
    }

    setSubmitted(true)
  }

  return (
    <section className="border-t border-neutral-200 px-5 py-16 lg:py-20">
      <div className="mx-auto flex w-full justify-center">
        <form onSubmit={handleSubmit} className="w-full space-y-8" style={{ maxWidth: '720px' }}>
          <div className="pb-5">
            <h1 className="font-display text-4xl font-black leading-none">Book Your Appointment</h1>
            <div className="mt-5 flex items-center gap-4">
              <span className="h-px w-24 bg-black" />
              <Scissors className="h-5 w-5" />
              <span className="h-px w-24 bg-black" />
            </div>
            <p className="mt-5 max-w-xl text-base font-medium leading-snug">
              Choose your service, preferred professional, and the time that works best for your visit.
            </p>
          </div>

          <div>
            <label className="mb-4 block text-sm font-black" htmlFor="booking-services">
              Services
            </label>
            <select
              id="booking-services"
              required
              name="service"
              value={selectedServices[0] || ''}
              onChange={(event) => {
                setSelectedServices(event.target.value ? [event.target.value] : [])
                setSubmitted(false)
              }}
              className={fieldClassName}
            >
              <option value="" disabled>
                Services
              </option>
              {serviceOptions.map((service) => (
                <option key={service.id} value={service.id}>
                  {getServiceLabel(service)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-4 block text-sm font-black" htmlFor="booking-barber">
              Barber / Professional
            </label>
            <select
              id="booking-barber"
              required
              name="barber"
              value={selectedBarber}
              onChange={(event) => {
                setSelectedBarber(event.target.value)
                setSubmitted(false)
              }}
              className={fieldClassName}
            >
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name} - {barber.role}
                </option>
              ))}
            </select>
          </div>

          <Field label="Full name" htmlFor="booking-name">
            <input id="booking-name" required name="name" type="text" placeholder="John Doe" className={fieldClassName} />
          </Field>

          <Field label="Phone number" htmlFor="booking-phone">
            <input id="booking-phone" required name="phone" type="tel" placeholder="+250 788 869 973" className={fieldClassName} />
          </Field>

          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Preferred date" htmlFor="booking-date">
              <input id="booking-date" required name="date" type="date" className={fieldClassName} />
            </Field>

            <Field label="Preferred time" htmlFor="booking-time">
              <input id="booking-time" required name="time" type="time" className={fieldClassName} />
            </Field>
          </div>

          {selectedServices.length === 0 && (
            <p className="text-sm font-semibold text-neutral-700">Please select at least one service before booking.</p>
          )}

          {submitted && (
            <p className="rounded-md border border-black bg-neutral-50 px-4 py-3 text-sm font-bold">
              Appointment request prepared. We will contact the client to confirm the booking.
            </p>
          )}

          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-between rounded bg-black px-7 py-4 text-sm font-black uppercase text-white"
          >
            Book appointment <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label className="mb-4 block text-sm font-black" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default Booking
