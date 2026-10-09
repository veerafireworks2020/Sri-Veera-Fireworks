import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Phone, MapPin, Mail } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import aboutImg from '../assets/aboutus.png'
import '../App.css'

const LOGO = '/images/img-css-23.png'

export default function About() {
  const { cartCount, wishlistCount } = useShop()

  return (
    <div className="theme-color4 light ltr" style={{ minHeight: '100vh', background: '#f8f8f8' }}>

      <TopBar />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex-shrink-0">
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain" />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/"         className="nav-link">Home</Link>
              <Link to="/about"    className="nav-link" style={{ color: '#e87316', fontWeight: 700 }}>About</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/safety"   className="nav-link">Safety Tips</Link>
              <Link to="/contact"  className="nav-link">Contact</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/wishlist" className="relative flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors no-underline">
                <Heart size={18} />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="flex items-center gap-1.5 bg-[#e87316] text-white border-none rounded-md px-3 py-2 text-sm font-semibold hover:bg-[#cf6512] transition-colors no-underline">
                <ShoppingCart size={18} />
                Cart {cartCount > 0 && <span className="bg-white text-[#e87316] rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#e87316] no-underline text-gray-500">Home</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">About</span>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ width: '100%', lineHeight: 0 }}>
        <img
          src={aboutImg}
          alt="About Sri Veera Fireworks"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* About Content */}
      <section className="py-14 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="subtitle-two">Our Story</p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Fireworks Direct From Factory</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sri Veera Fireworks is a trusted factory outlet based in Sivakasi, Tamil Nadu — the fireworks capital of India.
                We manufacture and sell premium quality fireworks directly to customers at factory prices, cutting out middlemen so you always get the best value.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over 127 products across 21 categories — from sparklers and sound crackers to aerial sky shots and gift boxes —
                we have everything you need for Diwali, New Year, weddings, and all your celebrations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to delivering genuine, safe, and high-quality fireworks with fast shipping during the festive season. Order online and get delivery right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { num: '127+', label: 'Products' },
              { num: '21',   label: 'Categories' },
              { num: '100%', label: 'Factory Direct' },
              { num: '4',    label: 'Contact Numbers' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-[#e87316] mb-1">{num}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-14 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-10">
            <p className="subtitle-two">Why Choose Us</p>
            <h2 className="text-3xl font-extrabold text-gray-900">The Sri Veera Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Factory Direct Prices',  desc: 'We are the manufacturer. No middlemen means you always pay the lowest possible price for the best quality.' },
              { title: 'Genuine & Safe Products', desc: 'All our fireworks are licensed, tested, and comply with government safety standards. 100% genuine products guaranteed.' },
              { title: 'Wide Range',              desc: '127+ products across 21 categories — crackers, sparklers, fountains, sky shots, gift boxes and more.' },
              { title: 'Fast Delivery',           desc: 'We ship within 24 hours during the festive season. Pan-India delivery with careful packaging.' },
              { title: 'Trusted Since Years',     desc: 'Sri Veera Fireworks has been serving customers across Tamil Nadu and all over India with trust and quality.' },
              { title: 'Easy Online Ordering',    desc: 'Browse, add to cart, and send your enquiry via WhatsApp in minutes. Simple, fast, and hassle-free.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-10 h-10 bg-[#e87316] rounded-xl mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-[700px] mx-auto px-4 text-center">
          <p className="subtitle-two">Get In Touch</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Contact Us</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <Phone size={22} color="#e87316" className="flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-sm">Phone</div>
                <div className="text-gray-500 text-sm">83000 57711 &nbsp;|&nbsp; 83000 57722 &nbsp;|&nbsp; 80000 57733 &nbsp;|&nbsp; 80000 57744</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <MapPin size={22} color="#e87316" className="flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-sm">Address</div>
                <div className="text-gray-500 text-sm">NH-07, Vachakkarapatti RR Nagar, Virudhunagar District, Tamil Nadu</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <Mail size={22} color="#e87316" className="flex-shrink-0" />
              <div className="text-left">
                <div className="font-bold text-gray-800 text-sm">Email</div>
                <div className="text-gray-500 text-sm">veerafireworks2020@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link to="/products" className="inline-block bg-[#e87316] text-white rounded-xl px-8 py-3 font-semibold hover:bg-[#cf6512] transition-colors no-underline">
              Shop Products →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
