import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, ShoppingCart, Menu, X, Download } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import '../App.css'

const LOGO = '/images/img-css-23.png'

const NAV = [
  { label: 'Home',        to: '/' },
  { label: 'About',       to: '/about' },
  { label: 'Products',    to: '/products' },
  { label: 'Safety Tips', to: '/safety' },
  { label: 'Contact',     to: '/contact' },
]

export default function Header() {
  const { cartCount, wishlistCount, siteSettings } = useShop()
  const pricelistUrl = siteSettings?.pricelist_url || ''
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  function isActive(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 no-underline">
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="nav-link"
                  style={isActive(to) ? { color: '#e87316', fontWeight: 700 } : {}}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {pricelistUrl && (
                <a
                  href={pricelistUrl}
                  download="Sri-Veera-Fireworks-Pricelist.pdf"
                  className="hidden lg:flex pricelist-btn"
                >
                  <Download size={16} />
                  <span>Price List</span>
                </a>
              )}
              <Link to="/wishlist" className="relative flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors no-underline">
                <Heart size={18} />
                <span className="hidden lg:inline">Wishlist</span>
                {wishlistCount > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="flex items-center gap-1.5 bg-[#e87316] text-white border-none rounded-md px-3 py-2 text-sm font-semibold hover:bg-[#cf6512] transition-colors no-underline">
                <ShoppingCart size={18} />
                <span className="hidden lg:inline">Cart</span>
                {cartCount > 0 && <span className="bg-white text-[#e87316] rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{cartCount}</span>}
              </Link>

              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white text-gray-700"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', width: 260,
        background: '#fff', zIndex: 9999,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
      }}>
        {/* Sidebar Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <img src={LOGO} alt="Sri Veera Fireworks" style={{ height: 36, objectFit: 'contain' }} />
          <button
            onClick={() => setOpen(false)}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} color="#333" />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {NAV.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '13px 20px',
                fontSize: 15, fontWeight: isActive(to) ? 700 : 500,
                color: isActive(to) ? '#e87316' : '#222',
                textDecoration: 'none',
                borderLeft: isActive(to) ? '3px solid #e87316' : '3px solid transparent',
                background: isActive(to) ? '#fff8f0' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Download Price List — below Contact */}
          {pricelistUrl && (
            <div style={{ padding: '8px 16px 4px' }}>
              <a
                href={pricelistUrl}
                download="Sri-Veera-Fireworks-Pricelist.pdf"
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '13px 4px',
                  fontSize: 15, fontWeight: 500,
                  color: '#e87316', textDecoration: 'none',
                  borderLeft: '3px solid #e87316',
                  paddingLeft: 17,
                  background: '#fff8f0',
                  borderRadius: 4,
                }}
              >
                <Download size={17} /> Download Price List
              </a>
            </div>
          )}
        </nav>

        {/* Cart & Wishlist in sidebar */}
        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
          <Link to="/wishlist" onClick={() => setOpen(false)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', border: '1px solid #e2e8f0', borderRadius: 8, textDecoration: 'none', color: '#333', fontSize: 13, fontWeight: 600 }}>
            <Heart size={16} /> Wishlist {wishlistCount > 0 && <span style={{ background: '#ef4444', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{wishlistCount}</span>}
          </Link>
          <Link to="/cart" onClick={() => setOpen(false)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', background: '#e87316', borderRadius: 8, textDecoration: 'none', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            <ShoppingCart size={16} /> Cart {cartCount > 0 && <span style={{ background: '#fff', color: '#e87316', borderRadius: '50%', width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </>
  )
}
