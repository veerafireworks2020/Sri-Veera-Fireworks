import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Phone, MapPin, Mail, Send } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import contactImg from '../assets/contactus.png'
import '../App.css'

const LOGO = '/images/img-css-23.png'

export default function Contact() {
  const { cartCount, wishlistCount, siteSettings } = useShop()
  const [form, setForm]   = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const text = `Hello Sri Veera Fireworks!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0A%0AMessage: ${form.message}`
    const wa   = siteSettings?.whatsapp || '918300057711'
    window.open(`https://api.whatsapp.com/send?phone=${wa}&text=${text}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const wa = siteSettings?.whatsapp || '918300057711'

  const infoBoxes = [
    {
      icon: <MapPin size={26} color="#ff7011" />,
      title: 'Address',
      content: (
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: 1.7 }}>
          1/235/1 SIVAGANAPURAM,<br />Sivagnanapuram,<br />Virudhunagar – 626 002
        </p>
      ),
    },
    {
      icon: <Phone size={26} color="#ff7011" />,
      title: 'Mobile',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['83000 57711', '83000 57722', '80000 57733', '80000 57744'].map(n => (
            <a key={n} href={`tel:+91${n.replace(/\s/g,'')}`}
              style={{ fontSize: '0.95rem', color: '#475569', textDecoration: 'none', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff7011'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >+91 {n}</a>
          ))}
        </div>
      ),
    },
    {
      icon: <Mail size={26} color="#ff7011" />,
      title: 'Email',
      content: (
        <a href="mailto:veerafireworks2020@gmail.com"
          style={{ fontSize: '0.95rem', color: '#475569', textDecoration: 'none', wordBreak: 'break-all' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ff7011'}
          onMouseLeave={e => e.currentTarget.style.color = '#475569'}
        >
          veerafireworks2020@gmail.com
        </a>
      ),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      <TopBar />

      {/* ── Header ── */}
      <header style={{ background: '#fff', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, gap: 16 }}>
            <Link to="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
              <img src={LOGO} alt="Sri Veera Fireworks" style={{ height: 40, objectFit: 'contain' }} />
            </Link>
            <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 4 }}>
              <Link to="/"         className="nav-link">Home</Link>
              <Link to="/about"    className="nav-link">About</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/safety"   className="nav-link">Safety Tips</Link>
              <Link to="/contact"  className="nav-link" style={{ color: '#e87316', fontWeight: 700 }}>Contact</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link to="/wishlist" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff', border: '1px solid #e2e8f0', color: '#374151',
                borderRadius: 8, padding: '7px 12px', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', flexShrink: 0,
              }}>
                <Heart size={17} />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', borderRadius: '50%', width: 20, height: 20, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{wishlistCount}</span>
                )}
              </Link>
              <Link to="/cart" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#e87316', color: '#fff', border: 'none',
                borderRadius: 8, padding: '7px 12px', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', flexShrink: 0,
              }}>
                <ShoppingCart size={17} />
                Cart {cartCount > 0 && (
                  <span style={{ background: '#fff', color: '#e87316', borderRadius: '50%', width: 20, height: 20, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Image ── */}
      <div style={{ width: '100%', lineHeight: 0 }}>
        <img
          src={contactImg}
          alt="Contact Sri Veera Fireworks"
          style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* ── Contact Now + 3 Boxes ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 16px 0' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 800, fontSize: '2rem', color: '#0f172a', marginBottom: 32 }}>
          Contact Now
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {infoBoxes.map(box => (
            <div key={box.title} style={{
              background: '#fff', borderRadius: 16,
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {box.icon}
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  {box.title}
                </h3>
              </div>
              <div style={{ paddingTop: 4, borderTop: '1px solid #f1f5f9' }}>
                {box.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map + Form ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 16px 48px' }}>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Map */}
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Our Location</h2>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', marginBottom: 14 }}>
              <iframe
                title="Sri Veera Fireworks Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.0!2d77.9!3d9.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDAuMCJOIDc3wrA1NCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{
              background: '#fff', borderRadius: 12, padding: '14px 16px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <MapPin size={18} color="#ff7011" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: '0 0 2px', fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>Sri Veera Fireworks</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  NH-07, Vachakkarapatti RR Nagar,<br />Virudhunagar District, Tamil Nadu
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            <h2 style={{ margin: '0 0 14px', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Send a Message</h2>
            <div style={{
              background: '#fff', borderRadius: 16, padding: 24,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9',
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🎉</div>
                  <h3 style={{ color: '#059669', margin: '0 0 6px' }}>Message Sent!</h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>We'll get back to you on WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 5 }}>Your Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Enter your name"
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '10px 14px',
                        border: '1px solid #e2e8f0', borderRadius: 10,
                        fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                      }}
                      onFocus={e => e.target.style.borderColor = '#ff7011'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 5 }}>Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '10px 14px',
                        border: '1px solid #e2e8f0', borderRadius: 10,
                        fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                      }}
                      onFocus={e => e.target.style.borderColor = '#ff7011'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 5 }}>Email (optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '10px 14px',
                        border: '1px solid #e2e8f0', borderRadius: 10,
                        fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                      }}
                      onFocus={e => e.target.style.borderColor = '#ff7011'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 5 }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Write your enquiry or order details..."
                      style={{
                        width: '100%', boxSizing: 'border-box', padding: '10px 14px',
                        border: '1px solid #e2e8f0', borderRadius: 10,
                        fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                      onFocus={e => e.target.style.borderColor = '#ff7011'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      background: '#25d366', color: '#fff', border: 'none',
                      borderRadius: 10, padding: '12px 0', fontSize: '0.95rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1da851'}
                    onMouseLeave={e => e.currentTarget.style.background = '#25d366'}
                  >
                    <Send size={16} /> Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
