import { ArrowRight, Ear, Scissors, UsersRound } from 'lucide-react'
import { PiHandHeartFill } from 'react-icons/pi'
import CTA from '../components/CTA'
import SectionTitle from '../components/SectionTitle'
import salonImg from '../assets/why-beads-img.png'

function About() {
  const approaches = [
    {
      title: 'LISTEN',
      text: 'We take time to understand what you want and what suits you best',
      icon: Ear,
    },
    {
      title: 'CREATE',
      text: 'Our skilled professionals use their expertise to bring your desired look to life',
      icon: Scissors,
    },
    {
      title: 'CARE',
      text: 'We pay attention to the details that make the difference.',
      icon: PiHandHeartFill,
    },
    {
      title: 'CONNECT',
      text: 'We build real relationships to make every visit personal and memorable.',
      icon: UsersRound,
    },
  ]

  return (
    <>
      <section className="bg-black px-5 py-20 text-white">
        <SectionTitle
          title="About Us"
          inverted
          text="Whether you seek personalized styling, executive grooming, or a private spa retreat in Kigali, our concierge team is ready to create your tailored experience."
        />
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase">Our Story</p>
            <h1 className="font-display mt-2 text-4xl font-black leading-none">The Story Behind Beads</h1>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-px w-16 bg-black" />
              <Scissors className="h-5 w-5" />
              <span className="h-px w-16 bg-black" />
            </div>
            <div className="mt-7 space-y-6 text-sm font-medium leading-tight text-black">
              <p>
                Beads was created with a simple idea to bring professional grooming, beauty,
                and self-care together in one exceptional experience.
              </p>
              <p>
                What started as a passion for great service has grown into a modern grooming and beauty
                destination where every client is treated with care, respect, and attention to detail.
              </p>
              <p>
                Today, we are proud to be a trusted name in hair, nails, and skin care and this is just the beginning.
              </p>
            </div>
            <button className="mt-8 inline-flex items-center gap-4 rounded bg-black px-5 py-3 text-xs font-black uppercase text-white">
              Our Journey <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <img src={salonImg} alt="Beads salon interior" className="h-[360px] w-full rounded-lg object-cover lg:h-[410px]" />
        </div>
      </section>

      <section className="px-5 pb-24">
        <SectionTitle eyebrow="OUR APPROACH" title="What We Dot It" />
        <div className="mx-auto mt-20 grid max-w-6xl gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {approaches.map(({ title, text, icon: Icon }) => (
            <article key={title} className="mx-auto max-w-52">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-black text-black">
                <Icon className="h-9 w-9" />
              </div>
              <h3 className="mt-4 text-base font-black">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-tight text-black">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24">
        <CTA />
      </section>
    </>
  )
}

export default About
