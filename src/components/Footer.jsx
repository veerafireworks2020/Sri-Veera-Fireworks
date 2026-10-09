import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail, Send, ChevronUp } from 'lucide-react'
import { useShop } from '../context/ShopContext'

const LOGO = '/images/img-css-23.png'

const NAV_LINKS = [
  { label: 'Home',        href: '/',        isRoute: true },
  { label: 'About',       href: '/about',   isRoute: true },
  { label: 'Products',    href: '/#products', isRoute: false },
  { label: 'Safety Tips', href: '/safety',  isRoute: true },
  { label: 'Contact',     href: '/contact', isRoute: true },
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
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain mb-4 brightness-[10] invert" />
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

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-5">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>We accept:</span>
              {[4,5,6,7].map(n => <img key={n} src={`/images/img-${n}.jpg`} alt="payment" className="h-6 rounded" />)}
            </div>
            <p className="text-[12px] text-gray-500">© 2026, Sri Veera Fireworks. Powered By Airlet IT Solutions</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href={`https://api.whatsapp.com/send?phone=${siteSettings?.whatsapp || '918300057711'}&text=Hello,%20Sri%20Veera%20Fireworks`}
        className="float" target="_blank" rel="noreferrer" title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 256 256">
          <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72,24,24,0,0,1,19.29-23.54l11.48,22.95L101,118.1a8,8,0,0,0-.73,7.65a56.47,56.47,0,0,0,30,30,8,8,0,0,0,7.65-.73l14.69-9.8,22.95,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a88,88,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216l12.47-37.4a8,8,0,0,0-.67-6.54A88,88,0,1,1,128,216Z"/>
        </svg>
      </a>

      {/* Back to top */}
      <div className="tap-to-top"><a href="#" title="Back to top"><ChevronUp size={18} /></a></div>
    </>
  )
}
