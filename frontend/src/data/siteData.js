import { FaFacebookF, FaInstagram, FaThreads, FaWhatsapp } from 'react-icons/fa6'
import { PiHairDryerFill, PiPaintBrushBroadFill } from 'react-icons/pi'
import { GiFingernail } from 'react-icons/gi'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

export const socials = [
  { name: 'Facebook', href: '#', icon: FaFacebookF },
  { name: 'Instagram', href: '#', icon: FaInstagram },
  { name: 'WhatsApp', href: '#', icon: FaWhatsapp },
  { name: 'Threads', href: '#', icon: FaThreads },
]

export const serviceCategories = [
  { label: 'Hair Services', href: '/services/hair', icon: PiHairDryerFill },
  { label: 'Nail Services', href: '/services/nails', icon: GiFingernail },
  { label: 'Skin Care', href: '/services/skin-care', icon: PiPaintBrushBroadFill },
]
