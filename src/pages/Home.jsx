import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart, ShoppingCart, Clock, ThumbsUp, Tag, Package, ChevronRight, ChevronLeft,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import '../App.css'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const LOGO    = '/images/img-css-23.png'
const CAT_IMG = '/images/img-css-28.png'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseImages(imgUrl) {
  if (!imgUrl) return []
  try { const a = JSON.parse(imgUrl); return Array.isArray(a) ? a : [imgUrl] }
  catch { return [imgUrl] }
}

function fmtPrice(v) {
  return '₹' + parseFloat(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })
}


// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const { addToCart, cartQtys, setQty, toggleWishlist, isWishlisted } = useShop()
  const imgs      = parseImages(product.image_url)
  const qty       = cartQtys[product.id] || 0
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="product-box rounded-lg overflow-hidden shadow-sm bg-white transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col h-full">
      <div className="img-wrapper relative">
        <div className="img-host">
          <img src={imgs[0] || '/images/noimage.jpg'} alt={product.name} loading="lazy" />
          <div className="circle-shape" />
          <span className="background-text">FIREWORKS</span>
          <div className="label-block">
            {product.discount_percentage
              ? <span className="label-theme">{product.discount_percentage}% Off</span>
              : <span className="label-theme">Sale</span>
            }
          </div>
          <button
            className="wishlist-heart-btn"
            onClick={() => toggleWishlist(product.id)}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={wishlisted ? '#e87316' : 'none'} color={wishlisted ? '#e87316' : '#999'} />
          </button>
        </div>
      </div>
      <div className="product-style-6 px-3 pt-2 pb-1 flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-0.5">{product.name}</h3>
        {product.description && (
          <p className="text-[11px] text-gray-500 leading-tight mb-1" style={{ fontFamily: 'inherit' }}>{product.description}</p>
        )}
        <p className="price-box">
          {fmtPrice(product.price)}
          {product.discount_percentage > 0 && product.mrp && <del> {fmtPrice(product.mrp)}</del>}
          {product.discount_percentage > 0 && <span className="off-tag">{product.discount_percentage}% off</span>}
        </p>
        {product.order_unit && <p className="text-[11px] text-gray-400 mt-0.5">{product.order_unit}</p>}
        <div className="flex-1" />
      </div>
      <div className="px-3 pb-3 pt-1">
        {qty === 0 ? (
          <button className="btn-add-cart" onClick={() => addToCart(product.id)}>Add to Cart</button>
        ) : (
          <div className="qty-row">
            <button onClick={() => setQty(product.id, qty - 1)}>−</button>
            <input
              type="number"
              value={qty}
              min={1}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v > 0) setQty(product.id, v)
              }}
            />
            <button onClick={() => setQty(product.id, qty + 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { products, loading, cartCount, wishlistCount, siteSettings } = useShop()

  // ── Hero banners from Supabase ─────────────────────────────────────────────
  const [banners, setBanners] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const slideTimer = useRef(null)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/hero_banners?select=*&order=sort_order.asc,created_at.asc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length) setBanners(data) })
  }, [])

  useEffect(() => {
    if (banners.length < 2) return
    slideTimer.current = setInterval(() => {
      setActiveSlide(s => (s + 1) % banners.length)
    }, 4000)
    return () => clearInterval(slideTimer.current)
  }, [banners.length])

  function goSlide(n) {
    clearInterval(slideTimer.current)
    setActiveSlide((activeSlide + n + banners.length) % banners.length)
  }

  // Group products by category, preserving PDF order (first product_code seen per category)
  const categoryOrder = []
  const categoryMap   = {}
  products.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = []
      categoryOrder.push(p.category)
    }
    categoryMap[p.category].push(p)
  })

  return (
    <div className="theme-color4 light ltr" id="home">

      <TopBar />

      {/* ── Main Header ────────────────────────────────────────────── */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <a href="/" className="flex-shrink-0">
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain" />
            </a>
            <nav className="hidden lg:flex items-center gap-1">
              <a href="#home" className="nav-link" style={{ color: '#e87316', fontWeight: 700 }}>Home</a>
              <Link to="/about"   className="nav-link">About</Link>
              <Link to="/products"  className="nav-link">Products</Link>
              <Link to="/safety"  className="nav-link">Safety Tips</Link>
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

      {/* ── Hero Banner Carousel ───────────────────────────────────── */}
      {banners.length > 0 && (
        <section style={{ position: 'relative', overflow: 'hidden', background: '#111' }}>
          <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${activeSlide * 100}%)` }}>
            {banners.map((b, i) => (
              <img
                key={b.id}
                src={b.image_url}
                alt={b.title || `Banner ${i + 1}`}
                style={{ minWidth: '100%', width: '100%', display: 'block', maxHeight: 600, objectFit: 'cover' }}
              />
            ))}
          </div>
          {banners.length > 1 && (
            <>
              <button onClick={() => goSlide(-1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                <ChevronLeft size={22} />
              </button>
              <button onClick={() => goSlide(1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                <ChevronRight size={22} />
              </button>
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                {banners.map((_, i) => (
                  <button key={i} onClick={() => setActiveSlide(i)} style={{ width: i === activeSlide ? 24 : 8, height: 8, borderRadius: 4, background: i === activeSlide ? '#e87316' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s' }} />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* ── Skeleton Loader ──────────────────────────────────────────── */}
      {loading && [0, 1, 2].map(s => (
        <section key={s} className={`py-10 overflow-hidden ${s % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="skeleton-section">
            <div className="skeleton-heading">
              <div className="skeleton skeleton-heading-sub" />
              <div className="skeleton skeleton-heading-main" />
            </div>
            <div className="skeleton-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-card-img" />
                  <div className="skeleton skeleton-card-line1" />
                  <div className="skeleton skeleton-card-line2" />
                  <div className="skeleton skeleton-card-btn" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Products by Category ─────────────────────────────────────── */}
      {categoryOrder.map((cat, idx) => (
        <section
          key={cat}
          id={idx === 0 ? 'products' : undefined}
          className={`py-10 overflow-hidden ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-8">
              <p className="subtitle-two">Sri Veera Fireworks</p>
              <h2 className="text-3xl font-extrabold text-gray-900">{cat}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch">
              {categoryMap[cat].map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      ))}

      {/* ── Our Collections / Categories ──────────────────────────── */}
      <section className="py-10 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-8">
            <p className="subtitle-two">Our Collections</p>
            <h2 className="text-3xl font-extrabold text-gray-900">List of Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {categoryOrder.map(cat => (
              <a key={cat} href={`#products`} className="no-underline">
                <div className="product-box product-box1 rounded-lg overflow-hidden shadow-sm bg-white transition-transform hover:-translate-y-1">
                  <div className="img-wrapper relative">
                    <img src={CAT_IMG} alt={cat} loading="lazy" className="w-full object-cover" style={{ height: '150px' }} />
                    <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-[10px] px-2 py-1 rounded leading-tight">
                      {cat}
                    </div>
                    <div className="insta-hover">
                      <button className="bg-white/90 text-gray-800 border-none rounded px-4 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1">
                        Shop now <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { icon: <Clock size={32} color="#e87316" />,    title: '24hrs Shipping',  sub: 'At Season Time' },
              { icon: <ThumbsUp size={32} color="#e87316" />, title: '100%',            sub: 'Satisfied Guarantee' },
              { icon: <Package size={32} color="#e87316" />,  title: '30+ Varieties',   sub: 'More than 200+ Products' },
              { icon: <Tag size={32} color="#e87316" />,      title: 'Low Price',       sub: 'Available in Low Price' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="service-wrap">
                <div className="service-icon">{icon}</div>
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
                  <span className="text-sm text-gray-500">{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}
