import classicHaircutImg from '../assets/Classic_hari_cut.png'

const hairServiceImages = import.meta.glob('../assets/hair services/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const nailServiceImages = import.meta.glob('../assets/nails services/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const skinServiceImages = import.meta.glob('../assets/skin service/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const hairServiceDetails = {
  'Classic Haircut': {
    short: 'Clean, classic cut tailored to your style',
    intro: 'A clean, classic cut tailored to your style.',
    subtitle: 'Perfect for a sharp, confident look that never goes out of style.',
    duration: '30 - 45 Min',
    about: 'Our Classic Haircut is designed to give you a clean, polished look that suits your personality and lifestyle.',
    points: [
      'Consultation to understand your preferred style',
      'Precision haircut using professional techniques',
      'Neat edges and finishing',
      'Styled to perfection',
    ],
  },
  'Fade Haircut': {
    short: 'Sharp fade work with a clean blended finish',
    intro: 'A sharp fade blended cleanly for a modern finish.',
    subtitle: 'Perfect for clients who want structure, contrast, and a polished everyday look.',
    duration: '35 - 50 Min',
    about: 'Our Fade Haircut is crafted with careful clipper work and smooth blending to create a fresh, balanced style.',
    points: ['Style consultation', 'Smooth fade blending', 'Clean neckline and edges', 'Finished with styling product'],
  },
  'Skin Fade': {
    short: 'Close fade crafted for a crisp modern look',
    intro: 'A close skin fade with a crisp, detailed finish.',
    subtitle: 'Ideal for a bold, fresh look with clean contrast.',
    duration: '40 - 55 Min',
    about: 'Our Skin Fade takes the sides very close while keeping the top shaped to your preferred style.',
    points: ['Detailed fade consultation', 'Close clipper work', 'Sharp line-up', 'Balanced top styling'],
  },
  'Buzz Cut': {
    short: 'Simple, neat, and easy-to-maintain grooming',
    intro: 'A neat buzz cut for simple, confident grooming.',
    subtitle: 'Perfect for a clean look that is easy to maintain.',
    duration: '20 - 30 Min',
    about: 'Our Buzz Cut keeps your look sharp, even, and practical with careful clipper work.',
    points: ['Length selection', 'Even clipper cut', 'Neckline clean-up', 'Final detail check'],
  },
  'Kids Haircut': {
    short: 'Gentle haircut service made for children',
    intro: 'A patient, gentle haircut experience for kids.',
    subtitle: 'Designed to keep children comfortable while giving them a fresh look.',
    duration: '25 - 40 Min',
    about: 'Our Kids Haircut is handled with care, patience, and attention to comfort from start to finish.',
    points: ['Child-friendly consultation', 'Gentle cutting process', 'Comfort-focused service', 'Clean finishing touches'],
  },
  'Line-Up / Shape-Up': {
    short: 'Clean edges and detailed hairline shaping',
    intro: 'A precise line-up for clean edges and definition.',
    subtitle: 'Perfect for refreshing your look between full haircuts.',
    duration: '15 - 25 Min',
    about: 'Our Line-Up / Shape-Up focuses on crisp hairline detail, clean edges, and a neat finish.',
    points: ['Hairline assessment', 'Precise edge shaping', 'Neckline clean-up', 'Detailed final finish'],
  },
  'Afro Cut & Shape': {
    short: 'Defined afro shaping with balanced volume',
    intro: 'A shaped afro cut that keeps volume balanced.',
    subtitle: 'Ideal for maintaining natural texture with clean structure.',
    duration: '35 - 50 Min',
    about: 'Our Afro Cut & Shape defines your natural hair while keeping proportion, shape, and personality intact.',
    points: ['Shape consultation', 'Balanced trimming', 'Texture-aware cutting', 'Defined final silhouette'],
  },
  'Hair Trim': {
    short: 'Fresh trim to maintain healthy shape and length',
    intro: 'A fresh trim to maintain healthy shape and length.',
    subtitle: 'Perfect for keeping your hair neat without changing your style.',
    duration: '20 - 35 Min',
    about: 'Our Hair Trim removes uneven ends and refreshes your current look while preserving your preferred length.',
    points: ['Length check', 'Even trimming', 'Shape refinement', 'Light finishing'],
  },
  Cornrows: {
    short: 'Protective cornrow styling with neat parting',
    intro: 'Protective cornrow styling with clean parting.',
    subtitle: 'Great for a neat, long-lasting style with personality.',
    duration: '60 - 120 Min',
    about: 'Our Cornrows are braided with neat sections and careful tension for comfort and durability.',
    points: ['Style planning', 'Clean sectioning', 'Comfortable braiding', 'Polished finishing'],
  },
  Twists: {
    short: 'Defined twists styled with care and precision',
    intro: 'Defined twists styled with care and precision.',
    subtitle: 'A versatile protective style with texture and movement.',
    duration: '60 - 120 Min',
    about: 'Our Twists service creates neat, defined sections while protecting your hair and maintaining comfort.',
    points: ['Hair preparation', 'Clean sectioning', 'Defined twisting', 'Moisturized finish'],
  },
  'Box / Knotless Braids': {
    short: 'Beautiful braids with a lightweight finish',
    intro: 'Beautiful box or knotless braids with a lightweight finish.',
    subtitle: 'Perfect for a protective style that looks elegant and lasts.',
    duration: '120 - 240 Min',
    about: 'Our Box / Knotless Braids are crafted for neatness, comfort, and a polished long-lasting result.',
    points: ['Style and length consultation', 'Clean parting', 'Comfortable braiding', 'Finished and sealed ends'],
  },
  'Crochet Braids': {
    short: 'Protective crochet styling with natural volume',
    intro: 'Protective crochet braids with natural volume.',
    subtitle: 'A flexible style for fullness, texture, and easy maintenance.',
    duration: '90 - 180 Min',
    about: 'Our Crochet Braids offer a protective foundation with beautiful texture and quick styling versatility.',
    points: ['Base braid preparation', 'Crochet installation', 'Volume shaping', 'Final style refinement'],
  },
  'Hair Wash & Conditioning': {
    short: 'Refreshing cleanse and nourishing care',
    intro: 'A refreshing wash and nourishing conditioning treatment.',
    subtitle: 'Perfect before styling or whenever your hair needs a reset.',
    duration: '25 - 45 Min',
    about: 'Our Hair Wash & Conditioning service cleanses the scalp and softens the hair for a fresh, healthy feel.',
    points: ['Gentle cleanse', 'Scalp-focused care', 'Conditioning treatment', 'Soft towel finish'],
  },
  'Blow Dry & Styling': {
    short: 'Smooth blow dry and polished finishing',
    intro: 'A smooth blow dry finished with polished styling.',
    subtitle: 'Ideal for a clean, refined look for your day or event.',
    duration: '35 - 60 Min',
    about: 'Our Blow Dry & Styling service smooths, shapes, and finishes your hair for a polished result.',
    points: ['Hair preparation', 'Controlled blow dry', 'Shape and volume work', 'Final polish'],
  },
  'Hair Curling': {
    short: 'Soft curls shaped for movement and shine',
    intro: 'Soft curls shaped for movement and shine.',
    subtitle: 'Perfect for adding bounce, texture, and a finished look.',
    duration: '35 - 60 Min',
    about: 'Our Hair Curling service creates defined curls or waves based on your desired finish.',
    points: ['Curl style consultation', 'Heat preparation', 'Curl shaping', 'Long-lasting finish'],
  },
  'Hair Straightening': {
    short: 'Sleek straightening for a smooth finish',
    intro: 'Sleek straightening for a smooth, polished finish.',
    subtitle: 'Ideal for a refined look with shine and control.',
    duration: '45 - 75 Min',
    about: 'Our Hair Straightening service smooths the hair while keeping the final look soft and controlled.',
    points: ['Hair preparation', 'Section-by-section straightening', 'Frizz control', 'Sleek final finish'],
  },
}

const hairServiceOrder = [
  'Classic Haircut',
  'Fade Haircut',
  'Skin Fade',
  'Buzz Cut',
  'Kids Haircut',
  'Line-Up / Shape-Up',
  'Afro Cut & Shape',
  'Hair Trim',
  'Cornrows',
  'Twists',
  'Box / Knotless Braids',
  'Crochet Braids',
  'Hair Wash & Conditioning',
  'Blow Dry & Styling',
  'Hair Curling',
  'Hair Straightening',
]

const nailServiceDetails = {
  'Classic Manicure': {
    short: 'Clean nail shaping, cuticle care, and polish',
    intro: 'A clean classic manicure for neat, polished hands.',
    subtitle: 'Perfect for everyday grooming with a fresh natural finish.',
    duration: '30 - 45 Min',
    about: 'Our Classic Manicure refreshes your hands with nail shaping, cuticle care, and a clean polish finish.',
    points: ['Nail shaping', 'Cuticle care', 'Hand care', 'Polish application'],
  },
  'Spa Manicure': {
    short: 'Relaxing hand care with a softer spa finish',
    intro: 'A relaxing spa manicure with extra hand care.',
    subtitle: 'Ideal when your hands need softness, polish, and a little pause.',
    duration: '45 - 60 Min',
    about: 'Our Spa Manicure adds a soothing care experience to classic nail grooming for softer, refreshed hands.',
    points: ['Nail shaping', 'Cuticle treatment', 'Moisturizing hand care', 'Polished finish'],
  },
  'Gel Manicure': {
    short: 'Glossy gel color with a longer-lasting finish',
    intro: 'A glossy gel manicure designed to last.',
    subtitle: 'Perfect for durable color, shine, and a polished look.',
    duration: '45 - 60 Min',
    about: 'Our Gel Manicure gives your nails a smooth, high-shine finish with longer wear than regular polish.',
    points: ['Nail preparation', 'Gel polish application', 'Curing process', 'Glossy final finish'],
  },
  'Classic Pedicure': {
    short: 'Essential foot care with clean nail finishing',
    intro: 'An essential pedicure for clean, refreshed feet.',
    subtitle: 'Perfect for regular foot grooming and neat polish.',
    duration: '40 - 55 Min',
    about: 'Our Classic Pedicure focuses on foot comfort, nail shaping, and a clean polished result.',
    points: ['Foot soak', 'Nail shaping', 'Cuticle care', 'Polish application'],
  },
  'Spa Pedicure': {
    short: 'Relaxing foot care with a pampered spa feel',
    intro: 'A relaxing spa pedicure for refreshed feet.',
    subtitle: 'Ideal for comfort, softness, and a polished finish.',
    duration: '55 - 75 Min',
    about: 'Our Spa Pedicure adds extra care and relaxation to essential foot grooming.',
    points: ['Warm foot soak', 'Exfoliation', 'Moisturizing care', 'Polished finish'],
  },
  'Gel Pedicure': {
    short: 'Durable gel polish for a glossy pedicure',
    intro: 'A glossy gel pedicure with durable color.',
    subtitle: 'Perfect for long-lasting shine and neat toes.',
    duration: '50 - 70 Min',
    about: 'Our Gel Pedicure combines foot grooming with a long-lasting gel polish finish.',
    points: ['Foot preparation', 'Nail shaping', 'Gel polish application', 'Cured glossy finish'],
  },
  'Acrylic Full Set': {
    short: 'Full acrylic nail extensions shaped to your style',
    intro: 'A full acrylic set shaped to your preferred style.',
    subtitle: 'Perfect for added length, structure, and a bold polished look.',
    duration: '90 - 120 Min',
    about: 'Our Acrylic Full Set creates durable extensions with custom shape and a clean finish.',
    points: ['Shape consultation', 'Acrylic application', 'Filing and refinement', 'Final polish or finish'],
  },
  'Acrylic Refill': {
    short: 'Refresh acrylic growth and restore the finish',
    intro: 'An acrylic refill to refresh your existing set.',
    subtitle: 'Ideal for maintaining length, shape, and a neat finish.',
    duration: '60 - 90 Min',
    about: 'Our Acrylic Refill fills new growth and restores your acrylic set so it looks fresh again.',
    points: ['Growth area preparation', 'Acrylic refill', 'Shape refinement', 'Polish or final finish'],
  },
}

const nailServiceOrder = [
  'Classic Manicure',
  'Spa Manicure',
  'Gel Manicure',
  'Classic Pedicure',
  'Spa Pedicure',
  'Gel Pedicure',
  'Acrylic Full Set',
  'Acrylic Refill',
]

const skinServiceDetails = {
  'Basic Facial': {
    short: 'Gentle facial care for clean, refreshed skin',
    intro: 'A gentle facial designed to cleanse and refresh your skin.',
    subtitle: 'Perfect for regular skin maintenance and a healthy glow.',
    duration: '40 - 55 Min',
    about: 'Our Basic Facial refreshes the skin with cleansing, light care, and a soothing finish tailored to your skin needs.',
    points: ['Skin consultation', 'Gentle cleansing', 'Light treatment care', 'Hydrated finish'],
  },
  'Deep Cleansing Facial': {
    short: 'Thorough cleansing for clearer, fresher skin',
    intro: 'A deeper cleanse for skin that needs extra attention.',
    subtitle: 'Ideal for clearing buildup and leaving the skin feeling renewed.',
    duration: '55 - 75 Min',
    about: 'Our Deep Cleansing Facial targets congestion, buildup, and dullness with a more thorough skin-cleansing process.',
    points: ['Skin assessment', 'Deep cleansing', 'Pore-focused care', 'Calming finish'],
  },
  'Hydrating Facial': {
    short: 'Moisture-rich care for soft, fresh skin',
    intro: 'A moisture-focused facial for soft, hydrated skin.',
    subtitle: 'Perfect for dry or tired skin that needs comfort and glow.',
    duration: '50 - 70 Min',
    about: 'Our Hydrating Facial restores comfort and moisture while leaving the skin soft, fresh, and healthy-looking.',
    points: ['Hydration consultation', 'Gentle cleanse', 'Moisture treatment', 'Soft glowing finish'],
  },
  'Brightening Facial': {
    short: 'Glow-focused facial for a brighter complexion',
    intro: 'A brightening facial created to revive dull skin.',
    subtitle: 'Ideal for a fresher, more radiant-looking complexion.',
    duration: '50 - 70 Min',
    about: 'Our Brightening Facial helps refresh tired-looking skin and supports a clearer, more luminous appearance.',
    points: ['Complexion assessment', 'Brightening cleanse', 'Glow-focused treatment', 'Radiant finish'],
  },
  'Anti-Aging Facial': {
    short: 'Targeted facial care for mature or tired skin',
    intro: 'A targeted facial for smoother, refreshed-looking skin.',
    subtitle: 'Perfect for clients who want firming care and a revived glow.',
    duration: '60 - 80 Min',
    about: 'Our Anti-Aging Facial focuses on nourishment, comfort, and visible freshness for mature or tired skin.',
    points: ['Skin needs consultation', 'Nourishing cleanse', 'Firming-focused care', 'Refreshed finish'],
  },
  'Facial Scrub & Exfoliation': {
    short: 'Exfoliating care for smoother skin texture',
    intro: 'A scrub and exfoliation service for smoother skin.',
    subtitle: 'Perfect for removing dullness and revealing a fresher surface.',
    duration: '30 - 45 Min',
    about: 'Our Facial Scrub & Exfoliation gently buffs away buildup to help skin feel smoother and look refreshed.',
    points: ['Skin check', 'Gentle exfoliation', 'Texture smoothing', 'Hydrated finish'],
  },
}

const skinServiceOrder = [
  'Basic Facial',
  'Deep Cleansing Facial',
  'Hydrating Facial',
  'Brightening Facial',
  'Anti-Aging Facial',
  'Facial Scrub & Exfoliation',
]

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function getTitleFromPath(path) {
  const title = path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/\.+$/, '')
    .replace(/\s*:\s*/g, ' / ')
    .trim()

  return title === 'Line-Up Shape-Up' ? 'Line-Up / Shape-Up' : title
}

export const hairServices = Object.entries(hairServiceImages)
  .filter(([path]) => !path.includes('Line-Up : Shape-Up'))
  .map(([path, image]) => {
    const title = getTitleFromPath(path)
    const details = hairServiceDetails[title] || {}

    return {
      id: slugify(title),
      category: 'hair',
      categoryLabel: 'Hair Services',
      title,
      text: details.short || 'Professional hair service tailored to your style',
      intro: details.intro || details.short || 'Professional service tailored to your style.',
      subtitle: details.subtitle || 'Designed to help you look polished and feel confident.',
      duration: details.duration || '30 - 45 Min',
      about: details.about || 'This service is designed to give you a polished look that suits your lifestyle.',
      points: details.points || ['Consultation', 'Professional service', 'Clean finishing', 'Styled with care'],
      image,
    }
  })
  .sort((a, b) => hairServiceOrder.indexOf(a.title) - hairServiceOrder.indexOf(b.title))

export const nailServices = Object.entries(nailServiceImages)
  .map(([path, image]) => {
    const title = getTitleFromPath(path)
    const details = nailServiceDetails[title] || {}

    return {
      id: slugify(title),
      category: 'nails',
      categoryLabel: 'Nail Services',
      title,
      text: details.short || 'Professional nail service tailored to your style',
      intro: details.intro || details.short || 'Professional nail care tailored to your style.',
      subtitle: details.subtitle || 'Designed to leave you polished, refreshed, and confident.',
      duration: details.duration || '45 - 60 Min',
      about: details.about || 'This nail service is designed with careful attention to detail and comfort.',
      points: details.points || ['Consultation', 'Nail preparation', 'Professional care', 'Polished finish'],
      image,
    }
  })
  .sort((a, b) => nailServiceOrder.indexOf(a.title) - nailServiceOrder.indexOf(b.title))

export const skinServices = Object.entries(skinServiceImages)
  .map(([path, image]) => {
    const title = getTitleFromPath(path)
    const details = skinServiceDetails[title] || {}

    return {
      id: slugify(title),
      category: 'skin-care',
      categoryLabel: 'Skin Care',
      title,
      text: details.short || 'Professional skin care tailored to your needs',
      intro: details.intro || details.short || 'Professional skin care tailored to your needs.',
      subtitle: details.subtitle || 'Designed to leave your skin refreshed, balanced, and healthy-looking.',
      duration: details.duration || '45 - 60 Min',
      about: details.about || 'This skin service is designed with careful attention to comfort and visible freshness.',
      points: details.points || ['Skin consultation', 'Gentle preparation', 'Professional treatment', 'Refreshed finish'],
      image,
    }
  })
  .sort((a, b) => skinServiceOrder.indexOf(a.title) - skinServiceOrder.indexOf(b.title))

export function getServicesByCategory(category) {
  if (category === 'hair') {
    return hairServices
  }

  if (category === 'nails') {
    return nailServices
  }

  if (category === 'skin-care') {
    return skinServices
  }

  return Array.from({ length: 8 }, (_, index) => ({
    id: `${category}-${index + 1}`,
    category,
    categoryLabel: category === 'nails' ? 'Nail Services' : 'Skin Care',
    title: category === 'nails' ? 'Nail Care' : 'Skin Care',
    text: 'Professional care tailored to your needs',
    intro: 'Professional care tailored to your needs.',
    subtitle: 'Designed to help you feel polished, refreshed, and confident.',
    duration: '30 - 45 Min',
    about: 'This service is tailored around your needs with careful attention to detail.',
    points: ['Personal consultation', 'Professional care', 'Clean finishing', 'Comfort-focused service'],
    image: classicHaircutImg,
  }))
}

export function getServiceById(category, serviceId) {
  return getServicesByCategory(category).find((service) => service.id === serviceId)
}
