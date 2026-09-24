import { Link } from 'react-router-dom'
import { ArrowRight, Award, Clock, Scissors, Star } from 'lucide-react'
import { FaAward, FaChair, FaHeart } from 'react-icons/fa6'
import { PiHairDryerFill, PiPaintBrushBroadFill, PiSprayBottleFill } from 'react-icons/pi'
import { GiFingernail } from 'react-icons/gi'
import CTA from '../components/CTA'
import SectionTitle from '../components/SectionTitle'
import heroImg from '../assets/hello-img.png'
import salonImg from '../assets/why-beads-img.png'
import hairServiceImg from '../assets/services/hair-service.png'
import nailServiceImg from '../assets/services/nail-service.png'
import skinCareImg from '../assets/services/skin-care.png'

const galleryImages = Object.entries(
  import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, image]) => image)

function Home() {
  const services = [
    { title: 'Hair Services', href: '/services/hair', icon: PiHairDryerFill, image: hairServiceImg },
    { title: 'Nail Services', href: '/services/nails', icon: GiFingernail, image: nailServiceImg },
    { title: 'Skin Care', href: '/services/skin-care', icon: PiPaintBrushBroadFill, image: skinCareImg },
  ]
  const standards = [
    {
      title: 'Professional Expertise',
      text: 'Our team is trained to deliver perfection in every service.',
      icon: FaAward,
    },
    {
      title: 'Clean & Hygienic Environment',
      text: 'Your safety and comfort are our top priority.',
      icon: PiSprayBottleFill,
    },
    {
      title: 'Modern Equipment',
      text: 'We use the best tools and technology for premium results.',
      icon: FaChair,
    },
    {
      title: 'Customer Satisfaction',
      text: 'We listen, we care, and we deliver excellence.',
      icon: FaHeart,
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <img src={heroImg} alt="Woman receiving salon hair styling" className="h-[580px] w-full object-cover object-center md:h-[680px]" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-5">
            <div className="max-w-xl text-white">
              <h1 className="font-display text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl">
                More than a haircut,
              </h1>
              <p className="font-script mt-3 text-5xl leading-none sm:text-6xl md:text-7xl">it&apos;s your moment.</p>
              <div className="my-8 flex items-center gap-2 text-white/80">
                <span className="h-px w-32 bg-white/70" />
                <Scissors className="h-5 w-5" />
                <span className="h-px w-32 bg-white/70" />
              </div>
              <p className="max-w-md text-base font-semibold leading-tight text-white/85">
                Hair, nail and skin care designed around you. Look good Feel confident. Be your best
              </p>
              <div className="mt-7 flex flex-wrap gap-8">
                <Link to="/book-appointment" className="inline-flex items-center gap-3 rounded-md bg-white px-4 py-3 text-xs font-bold text-black">
                  Book appointment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/services/hair" className="inline-flex items-center gap-3 rounded-md border border-white bg-black/20 px-4 py-3 text-xs font-bold text-white">
                  Explore services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <SectionTitle eyebrow="WHAT WE DO BEST" title="Our Services Categories" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-3">
          {services.map(({ title, href, icon: Icon, image }) => (
            <Link
              key={title}
              to={href}
              className="group overflow-hidden rounded-lg border border-neutral-200 bg-white text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
            >
              <img src={image} alt="" className="h-40 w-full object-cover grayscale" />
              <div className="relative px-8 pb-8 pt-16">
                <div className="absolute left-1/2 top-0 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-black text-white">
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="font-display text-3xl font-black">{title}</h3>
                <p className="mx-auto mt-5 max-w-xs text-sm font-semibold leading-tight text-neutral-700">
                  From classic cuts to modern styles, we craft the perfect look for you.
                </p>
                <span className="mx-auto mt-8 inline-flex items-center gap-3 text-xs font-black uppercase">
                  Explore services <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-black px-5 py-12 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1fr]">
          <img src={salonImg} alt="Beads salon interior" className="hidden h-full max-h-[310px] w-full rounded object-cover lg:block" />
          <div>
            <p className="text-sm font-black uppercase text-white/75">Why Beads</p>
            <h2 className="font-display mt-2 text-4xl font-black sm:text-5xl">A moment that&apos;s yours</h2>
            <p className="mt-5 max-w-xl text-lg leading-snug text-white/80">
              Come as you are. From hair and nails to skin care, we listen first and tailor each service to you.
              Relax in a welcoming space and leave feeling your best.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ['Personal Care', 'Made for you', Award],
                ['All in One Place', 'Hair, nails & skin', Star],
                ['Time to Unwind', 'Feel at ease', Clock],
              ].map(([title, text, Icon]) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black">{title}</p>
                    <p className="text-xs text-white/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 inline-flex items-center gap-3 rounded border border-white px-6 py-3 text-xs font-black uppercase">
              Read more <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <SectionTitle eyebrow="OUR PROMISE" title="The Beads Standard" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map(({ title, text, icon: Icon }) => (
            <div key={title} className="flex gap-6">
              <Icon className="h-16 w-16 shrink-0 text-black" />
              <div>
                <h3 className="text-xl font-black leading-tight">{title}</h3>
                <p className="mt-6 text-base font-medium leading-snug text-neutral-800">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <CTA />
        </div>
      </section>

      <section className="px-5 pb-24">
        <SectionTitle eyebrow="OUR GALLERY" title="Experience at Beads" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_1fr]">
          <img
            src={galleryImages[0]}
            alt="Beads salon experience"
            className="h-[340px] w-full object-cover sm:h-[520px]"
          />
          <div className="grid grid-cols-2 gap-6">
            {galleryImages.slice(1, 5).map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Beads gallery view ${index + 2}`}
                className="h-[150px] w-full object-cover sm:h-[247px]"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
