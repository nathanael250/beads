import SectionTitle from '../components/SectionTitle'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const images = Object.entries(import.meta.glob('../assets/gallery/gallery_page/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})).sort(([a], [b]) => a.localeCompare(b))

function Gallery() {
  const [active, setActive] = useState(null)
  const move = (step) => setActive((index) => (index + step + images.length) % images.length)
  return (
    <section className="border-t border-neutral-200 px-5 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="OUR GALLERY" title="Experience at Beads" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(([path, image], index) => (
            <button type="button" key={path} onClick={(event) => { setActive(index); event.currentTarget.closest('section').querySelector('dialog').showModal() }} aria-label={`Open Beads gallery photo ${index + 1}`} className="block overflow-hidden rounded focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4">
              <img src={image} alt={`Beads salon gallery photo ${index + 1}`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      <dialog aria-label="Gallery image viewer" onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      }} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }} className="fixed inset-0 m-auto h-[95dvh] max-h-none w-[96vw] max-w-none border-0 bg-black p-4 text-white backdrop:bg-black/90">
        <form method="dialog"><button aria-label="Close image viewer" title="Close" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded bg-black/80"><X /></button></form>
        {active !== null && <img src={images[active][1]} alt={`Beads gallery photo ${active + 1}`} className="h-full w-full object-contain" />}
        <button type="button" onClick={() => move(-1)} aria-label="Previous photo" title="Previous photo" className="absolute left-2 top-1/2 grid h-12 w-12 place-items-center rounded bg-black/80"><ChevronLeft /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next photo" title="Next photo" className="absolute right-2 top-1/2 grid h-12 w-12 place-items-center rounded bg-black/80"><ChevronRight /></button>
        <p aria-live="polite" className="absolute inset-x-0 bottom-2 text-center text-sm">{active === null ? '' : `${active + 1} / ${images.length}`}</p>
      </dialog>
    </section>
  )
}

export default Gallery
