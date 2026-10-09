import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Check, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import safetyImg from '../assets/saftey.png'
import '../App.css'

const LOGO = '/images/img-css-23.png'

const DOS = [
  { title: 'Instructions',      desc: 'Display fireworks as per the instructions mentioned on the pack.' },
  { title: 'Outdoor',           desc: 'Use fireworks only outdoors in open spaces away from buildings and trees.' },
  { title: 'Branded Fireworks', desc: 'Buy fireworks from authorized / reputed manufacturers only.' },
  { title: 'Distance',          desc: 'Light only one firework at a time, by one person. Others should watch from a safe distance.' },
  { title: 'Supervision',       desc: 'Always have adult supervision when children are present.' },
  { title: 'Water',             desc: 'Keep two buckets of water handy. In the event of fire or any mishap.' },
]

const DONTS = [
  { title: "Don't Make Tricks",        desc: 'Never make your own fireworks.' },
  { title: "Don't Relight",            desc: 'Never try to re-light or pick up fireworks that have not ignited fully.' },
  { title: "Don't Carry in Pockets",   desc: 'Never carry fireworks in your pockets.' },
  { title: "Don't Touch Leftovers",    desc: 'After fireworks display never pick up fireworks that may be left over — they may still be active.' },
  { title: "No Glass / Metal",         desc: 'Never shoot fireworks in a metal or glass container.' },
  { title: "No Loose Clothing",        desc: 'Do not wear loose clothing while using fireworks.' },
]

export default function Safety() {
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
              <Link to="/about"    className="nav-link">About</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/safety"   className="nav-link" style={{ color: '#e87316', fontWeight: 700 }}>Safety Tips</Link>
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

      {/* Safety Hero Image */}
      <div style={{ width: '100%', lineHeight: 0 }}>
        <img
          src={safetyImg}
          alt="Fireworks Safety Tips"
          style={{ width: '100%', display: 'block' }}
        />
      </div>


      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">

        {/* Intro */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">SRI VEERA FIREWORKS</h1>
          <p className="text-gray-500 leading-relaxed max-w-3xl">
            There are certain Do's &amp; Don'ts to follow while purchasing, bursting and storing crackers.
            It is very important to follow the precautions while bursting crackers. A little negligence,
            ignorance and carelessness can cause a fatal injury.
          </p>
        </div>

        {/* Do's & Don'ts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Do's */}
          <div>
            <h2 className="text-2xl font-extrabold text-green-600 mb-6 pb-3 border-b-2 border-green-500 inline-block">Do's</h2>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {DOS.map(({ title, desc }) => (
                <li key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{
                    minWidth: 28, height: 28, borderRadius: '50%',
                    backgroundColor: '#22c55e', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, marginTop: 2, flexShrink: 0,
                  }}>
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-0.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed m-0">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div>
            <h2 className="text-2xl font-extrabold text-red-500 mb-6 pb-3 border-b-2 border-red-400 inline-block">Don'ts</h2>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {DONTS.map(({ title, desc }) => (
                <li key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{
                    minWidth: 28, height: 28, borderRadius: '50%',
                    backgroundColor: '#ef4444', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, marginTop: 2, flexShrink: 0,
                  }}>
                    <X size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-gray-900 mb-0.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed m-0">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/#products" className="inline-block bg-[#e87316] text-white rounded-xl px-8 py-3 font-semibold hover:bg-[#cf6512] transition-colors no-underline">
            Shop Safely →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
