import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown, Search, Scissors, X } from 'lucide-react'
import { createAppointment, fetchEmployees, fetchServices } from '../services/api'
import beadsLogo from '../assets/beads_logo.png'

const serviceGroupShells = [
  { key: 'hair', label: 'Hair Services' },
  { key: 'nails', label: 'Nail Services' },
  { key: 'skin-care', label: 'Skin Care' },
]

const anyProfessional = { id: 'any-professional', name: 'Any Available Professional', role: 'Beads Team', image: beadsLogo }

const fieldClassName = 'h-14 w-full rounded border border-neutral-300 bg-white px-5 text-sm outline-none transition placeholder:text-neutral-500 focus:border-black'

function Booking() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')
  const defaultServices = preselectedService ? [preselectedService] : []
  const [serviceGroups, setServiceGroups] = useState([])
  const [barbers, setBarbers] = useState([anyProfessional])
  const [selectedServices, setSelectedServices] = useState(defaultServices)
  const [selectedBarber, setSelectedBarber] = useState('any-professional')
  const [isServicePickerOpen, setIsServicePickerOpen] = useState(false)
  const [isBarberPickerOpen, setIsBarberPickerOpen] = useState(false)
  const [serviceSearch, setServiceSearch] = useState('')
  const [activeServiceCategory, setActiveServiceCategory] = useState('all')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loadError, setLoadError] = useState('')

  const allServices = useMemo(() => serviceGroups.flatMap((group) => group.services), [serviceGroups])
  const selectedService = allServices.find((service) => service.id === selectedServices[0])
  const availableBarbers = useMemo(() => {
    if (!selectedService) {
      return barbers
    }

    return barbers.filter((barber) => {
      if (barber.id === 'any-professional' || !Array.isArray(barber.services) || barber.services.length === 0) {
        return true
      }

      return barber.services.some((service) => String(service.id) === String(selectedService.backendId))
    })
  }, [barbers, selectedService])
  const selectedBarberDetails = availableBarbers.find((barber) => barber.id === selectedBarber) || availableBarbers[0]

  useEffect(() => {
    let isMounted = true

    Promise.all([
      fetchServices(),
      fetchEmployees().catch(() => []),
    ])
      .then(([apiServices, apiEmployees]) => {
        if (!isMounted) {
          return
        }

        if (apiServices.length === 0) {
          setLoadError('No backend services were found.')
          return
        }

        const nextGroups = serviceGroupShells.map((group) => ({
          ...group,
          services: apiServices.filter((service) => service.category === group.key),
        })).filter((group) => group.services.length > 0)

        const nextBarbers = apiEmployees.length > 0
          ? [...apiEmployees, anyProfessional]
          : [anyProfessional]

        setServiceGroups(nextGroups)
        setBarbers(nextBarbers)
        setSelectedBarber((current) => nextBarbers.some((barber) => barber.id === current) ? current : nextBarbers[0]?.id || 'any-professional')
        setSelectedServices((current) => {
          if (current[0] && apiServices.some((service) => service.id === current[0])) {
            return current
          }

          return [apiServices[0]?.id].filter(Boolean)
        })
      })
      .catch(() => setLoadError('Backend services could not be loaded. Please check API auth and CORS.'))

    return () => {
      isMounted = false
    }
  }, [])

  const filteredServiceGroups = useMemo(() => {
    const query = serviceSearch.trim().toLowerCase()

    return serviceGroups
      .filter((group) => activeServiceCategory === 'all' || group.key === activeServiceCategory)
      .map((group) => ({
        ...group,
        services: group.services.filter((service) => {
          if (!query) {
            return true
          }

          return `${service.title} ${service.text || ''} ${service.categoryLabel || ''}`.toLowerCase().includes(query)
        }),
      }))
      .filter((group) => group.services.length > 0)
  }, [activeServiceCategory, serviceGroups, serviceSearch])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!selectedService) {
      return
    }

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const date = String(formData.get('date') || '')
    const time = String(formData.get('time') || '')

    setIsSubmitting(true)
    setSubmitted(false)
    setFeedback('')

    try {
      const appointment = await createAppointment({
        name,
        phone,
        serviceId: selectedService.backendId || selectedService.id,
        professionalId: selectedBarberDetails?.id || 'any-professional',
        date,
        time,
      })

      setSubmitted(true)
      setFeedback(`Appointment request sent successfully${appointment.appointment_number ? ` (${appointment.appointment_number})` : ''}. We will contact the client to confirm the booking.`)
    } catch (error) {
      setFeedback(error.message || 'We could not send the appointment request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            {loadError && <p className="mt-4 text-sm font-semibold text-neutral-600">{loadError}</p>}
          </div>

          <div>
            <label className="mb-4 block text-sm font-black" id="booking-services-label">
              Services
            </label>
            <input type="hidden" name="service" value={selectedServices[0] || ''} />
            <div className="relative">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isServicePickerOpen}
                aria-labelledby="booking-services-label"
                onClick={() => {
                  setIsServicePickerOpen((open) => !open)
                  setIsBarberPickerOpen(false)
                }}
                className={`${fieldClassName} flex items-center justify-between text-left`}
              >
                <span className={selectedService ? 'text-black' : 'text-neutral-500'}>
                  {selectedService ? selectedService.title : 'Select service'}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${isServicePickerOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicePickerOpen && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded border border-neutral-300 bg-white shadow-lg">
                  <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
                    <Search className="h-5 w-5 shrink-0 text-neutral-500" />
                    <input
                      autoFocus
                      type="search"
                      value={serviceSearch}
                      onChange={(event) => setServiceSearch(event.target.value)}
                      placeholder="Search services"
                      className="min-w-0 flex-1 text-sm outline-none placeholder:text-neutral-500"
                    />
                    <button
                      type="button"
                      aria-label="Close service picker"
                      onClick={() => setIsServicePickerOpen(false)}
                      className="grid h-8 w-8 place-items-center rounded text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 border-b border-neutral-200 px-4 py-3">
                    {[
                      { key: 'all', label: 'All' },
                      ...serviceGroups.map((group) => ({ key: group.key, label: group.label.replace(' Services', '') })),
                    ].map((category) => (
                      <button
                        key={category.key}
                        type="button"
                        onClick={() => setActiveServiceCategory(category.key)}
                        className={`rounded border px-3 py-2 text-xs font-black uppercase transition ${
                          activeServiceCategory === category.key
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-300 text-black hover:border-black'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>

                  <div className="max-h-80 overflow-y-auto py-2">
                    {filteredServiceGroups.length > 0 ? (
                      filteredServiceGroups.map((group) => (
                        <div key={group.label} className="py-2">
                          <p className="px-4 text-xs font-black uppercase tracking-wide text-neutral-500">{group.label}</p>
                          <div className="mt-2">
                            {group.services.map((service) => {
                              const isSelected = service.id === selectedServices[0]

                              return (
                                <button
                                  key={`${service.category}-${service.id}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedServices([service.id])
                                    setSelectedBarber('any-professional')
                                    setSubmitted(false)
                                    setServiceSearch('')
                                    setIsServicePickerOpen(false)
                                  }}
                                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition ${
                                    isSelected ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                                  }`}
                                >
                                  <span>{service.title}</span>
                                  <span className={isSelected ? 'text-white/70' : 'text-neutral-500'}>{service.duration}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-6 text-sm font-medium text-neutral-600">No services found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-4 block text-sm font-black" id="booking-barber-label">
              Barber / Professional
            </label>
            <input type="hidden" name="barber" value={selectedBarber} />
            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isBarberPickerOpen}
                aria-labelledby="booking-barber-label"
                onClick={() => {
                  setIsBarberPickerOpen((open) => !open)
                  setIsServicePickerOpen(false)
                }}
                className={`${fieldClassName} flex items-center justify-between text-left`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  {selectedBarberDetails && <ProfessionalAvatar professional={selectedBarberDetails} className="h-9 w-9" />}
                  <span className="min-w-0 truncate">
                    {selectedBarberDetails
                      ? `${selectedBarberDetails.name} - ${selectedBarberDetails.role}`
                      : 'Select professional'}
                  </span>
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${isBarberPickerOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBarberPickerOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded border border-neutral-300 bg-white shadow-lg">
                  {availableBarbers.map((barber) => {
                    const isSelected = barber.id === selectedBarber

                    return (
                      <button
                        key={barber.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedBarber(barber.id)
                          setSubmitted(false)
                          setIsBarberPickerOpen(false)
                        }}
                        className={`flex w-full items-center gap-4 px-4 py-3 text-left transition ${
                          isSelected ? 'bg-black text-white' : 'text-black hover:bg-neutral-100'
                        }`}
                      >
                        <ProfessionalAvatar professional={barber} className="h-11 w-11" />
                        <span>
                          <span className="block text-sm font-black">{barber.name}</span>
                          <span className={`mt-1 block text-xs ${isSelected ? 'text-white/70' : 'text-neutral-500'}`}>
                            {barber.role}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
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
              {feedback}
            </p>
          )}

          {!submitted && feedback && (
            <p className="rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-bold">
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !selectedService}
            className="mt-4 inline-flex w-full items-center justify-between rounded bg-black px-7 py-4 text-sm font-black uppercase text-white disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            {isSubmitting ? 'Sending appointment...' : 'Book appointment'} <ArrowRight className="h-5 w-5" />
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

function ProfessionalAvatar({ professional, className }) {
  if (professional.image) {
    return <img src={professional.image} alt="" className={`${className} shrink-0 rounded-full object-cover`} />
  }

  const initials = professional.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-full bg-black text-xs font-black text-white`}>
      {initials || 'B'}
    </span>
  )
}

export default Booking
