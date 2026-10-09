import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail, Send, ChevronUp } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import whatsappImg from '../assets/WhatsApp.svg.webp'

const LOGO = '/images/img-css-23.png'

const NAV_LINKS = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Products', href: '/#products', isRoute: false },
  { label: 'Safety Tips', href: '/safety', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
]

export default function Footer() {
  const { siteSettings } = useShop()

  return (
    <>
      <footer id="contact" className="bg-[#1a1a1a] text-gray-400 pt-12 pb-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="xl:col-span-2">
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
              <ul className="space-y-2 text-[13px] list-none p-0">
                <li className="flex gap-2">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#e87316]" />
                  <span>83000 57711, 83000 57722<br />80000 57733, 80000 57744</span>
                </li>
                <li className="flex gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#e87316]" />
                  <span>NH-07, Vachakkarapatti RR Nagar, Virudhungar District Tamil Nadu</span>
                </li>
                <li className="flex gap-2">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#e87316]" />
                  <span>veerafireworks2020@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 pb-2 border-b-2 border-[#e87316] inline-block">Quick Link</h3>
              <ul className="space-y-2 text-[13px] list-none p-0">
                {NAV_LINKS.map(({ label, href, isRoute }) => (
                  <li key={label}>
                    {isRoute
                      ? <Link to={href} className="text-gray-400 hover:text-[#e87316] transition-colors no-underline">{label}</Link>
                      : <a href={href} className="text-gray-400 hover:text-[#e87316] transition-colors no-underline">{label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Help */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 pb-2 border-b-2 border-[#e87316] inline-block">Get Help</h3>
              <ul className="space-y-2 text-[13px] list-none p-0">
                <li><Link to="/safety" className="text-gray-400 hover:text-[#e87316] transition-colors no-underline">Safety Tips</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-[#e87316] transition-colors no-underline">Shopping FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#e87316] transition-colors no-underline">Track Orders</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-base font-bold text-white mb-3">Let&apos;s stay in touch</h3>
              <div className="newsletter-input mb-3">
                <input type="email" placeholder="Your Email Address" />
                <button type="button"><Send size={14} /></button>
              </div>
              <p className="text-[12px] text-gray-500">Keep up to date with our latest news and special offers.</p>
            </div>

          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="max-w-[1400px] mx-auto px-4">
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '14px 20px' }}>
              <p className="text-[12px] leading-relaxed text-center" style={{ color: '#e2e8f0', margin: 0 }}>

                As per 2018 Supreme Court order, online sale of firecrackers are not permitted! We value our customers and at the same time, respect jurisdiction. We request you to add your products to the cart and submit the required crackers through the enquiry button. We will contact you within 24 hrs and confirm the order through WhatsApp or phone call. Please add and submit your enquiries and enjoy your Diwali with Sri Veera Fireworks. Our License No. ——. Sri Veera Fireworks as a company following 100% legal &amp; statutory compliances and all our shops, go-downs are maintained as per the explosive acts. We send the parcels through registered and legal transport service providers as like every other major companies in Sivakasi is doing so.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-5 pt-5">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-gray-500">© 2026, Sri Veera Fireworks. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Phone Float */}
      <a
        href="tel:+918300057711"
        title="Call Us"
        style={{ position: 'fixed', bottom: 84, left: 25, width: 44, height: 44, textDecoration: 'none', zIndex: 999, transition: 'transform 0.2s', display: 'block' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 52 52" style={{ display: 'block' }}>
          <circle cx="26" cy="26" r="26" fill="#00b900"/>
          <path fill="#fff" d="M36.5 32.1c-.7-.7-4.4-2.9-5.2-2.9-.4 0-.8.2-1.1.5l-1.5 1.5c-.2.2-.5.3-.7.2-1-.4-3.2-2.2-4.6-3.6-1.4-1.4-3.2-3.6-3.6-4.6-.1-.3 0-.5.2-.7l1.5-1.5c.3-.3.5-.7.5-1.1 0-.8-2.2-4.5-2.9-5.2-.3-.3-.7-.5-1.1-.5-1.5 0-4.5 2-4.5 4 0 5.5 6.5 12.5 10.5 15.5 2 1.5 5.5 3.5 8 3.5 2 0 4-3 4-4.5 0-.4-.2-.8-.5-1.1z"/>
        </svg>
      </a>

      {/* WhatsApp Float */}
      <a
        href={`https://api.whatsapp.com/send?phone=${siteSettings?.whatsapp || '918300057711'}&text=Hello,%20Sri%20Veera%20Fireworks`}
        target="_blank" rel="noreferrer" title="Chat on WhatsApp"
        style={{ position: 'fixed', bottom: 16, left: 20, width: 56, height: 56, textDecoration: 'none', zIndex: 999, transition: 'transform 0.2s', display: 'block', borderRadius: '50%', overflow: 'hidden' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img src={whatsappImg} alt="WhatsApp" style={{ width: 56, height: 56, display: 'block' }} />
      </a>

      {/* Back to top */}
      <div className="tap-to-top"><a href="#" title="Back to top"><ChevronUp size={18} /></a></div>
    </>
  )
}
