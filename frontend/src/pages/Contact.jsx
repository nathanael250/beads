import { ArrowRight, Clock, Mail, MapPin, Phone, Scissors } from 'lucide-react'

function Contact() {
  const contactItems = [
    {
      title: 'Our Location',
      text: ['11, KG 7 Avenue, KG543 Street,', 'Kigali, Rwanda.'],
      icon: MapPin,
    },
    {
      title: 'Call Us',
      text: ['+250 788 869 973', '+250 792 987 561'],
      icon: Phone,
    },
    {
      title: 'Email Us',
      text: ['info@beads.com'],
      icon: Mail,
    },
    {
      title: 'Opening Hours',
      text: ['Mon - Sat: 8:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      icon: Clock,
    },
  ]

  return (
    <section className="border-t border-neutral-200 px-5 py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:border-r lg:border-neutral-300 lg:pr-20">
          <p className="text-sm font-black uppercase tracking-wide">Contact Us</p>
          <h1 className="font-display mt-3 text-5xl font-black leading-none sm:text-6xl">Let&apos;s Connect.</h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-32 bg-black" />
            <Scissors className="h-5 w-5" />
            <span className="h-px w-32 bg-black" />
          </div>
          <p className="mt-7 max-w-md text-base font-medium leading-snug">
            Have a question, want to book an appointment, or just want to say hello?
            We&apos;d love to hear from you. Reach out to us anytime.
          </p>

          <div className="mt-9 space-y-8">
            {contactItems.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-sm font-black">{title}</h2>
                  <div className="mt-1 text-sm font-medium leading-snug">
                    {text.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-black leading-none">Send Us a Message</h2>
          <div className="mt-5 flex items-center gap-4">
            <span className="h-px w-24 bg-black" />
            <Scissors className="h-5 w-5" />
            <span className="h-px w-24 bg-black" />
          </div>

          <form className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <input className="h-14 rounded border border-neutral-300 px-5 text-sm outline-none transition focus:border-black" placeholder="Full Name" />
              <input className="h-14 rounded border border-neutral-300 px-5 text-sm outline-none transition focus:border-black" placeholder="Phone Number" />
            </div>
            <input className="h-14 w-full rounded border border-neutral-300 px-5 text-sm outline-none transition focus:border-black" placeholder="Email Address" />
            <input className="h-14 w-full rounded border border-neutral-300 px-5 text-sm outline-none transition focus:border-black" placeholder="Subject" />
            <textarea className="min-h-36 w-full resize-y rounded border border-neutral-300 px-5 py-4 text-sm outline-none transition focus:border-black" placeholder="Your Message" />
            <button className="inline-flex items-center gap-12 rounded bg-black px-7 py-4 text-sm font-black uppercase text-white">
              Send Message <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
