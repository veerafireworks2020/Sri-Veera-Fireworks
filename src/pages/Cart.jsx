import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, X, CheckCircle2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import Footer from '../components/Footer'
import '../App.css'

const LOGO = '/images/img-css-23.png'

function parseImages(imgUrl) {
  if (!imgUrl) return []
  try { const a = JSON.parse(imgUrl); return Array.isArray(a) ? a : [imgUrl] }
  catch { return [imgUrl] }
}

function fmtPrice(v) {
  return '₹' + parseFloat(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })
}

export default function Cart() {
  const { cartItems, cartTotal, cartCount, setQty, removeFromCart, clearCart, siteSettings, wishlistCount } = useShop()
  const [form, setForm]       = useState({ name: '', phone: '', address: '', isTN: true })
  const [formErr, setFormErr] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const setF = (k, v) => { setForm(f => ({ ...f, [k]: v })); setFormErr(e => ({ ...e, [k]: false })) }

  const minOrder = form.isTN
    ? parseFloat(siteSettings.min_order_tn || 3000)
    : parseFloat(siteSettings.min_order_other || 5000)

  const handleEnquiry = async (e) => {
    e.preventDefault()
    const errs = {
      name:    !form.name.trim(),
      phone:   !form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()),
      address: !form.address.trim(),
    }
    if (errs.name || errs.phone || errs.address) { setFormErr(errs); return }
    if (cartTotal < minOrder) {
      alert(`Minimum order is ₹${minOrder.toLocaleString('en-IN')} for ${form.isTN ? 'Tamil Nadu' : 'Other States'}.`)
      return
    }

    const lines = cartItems.map(i =>
      `• ${i.product.name} × ${i.qty} = INR ${(i.product.price * i.qty).toLocaleString('en-IN')}`
    ).join('\n')
    const msg = [
      '*ORDER ENQUIRY — Sri Veera Fireworks*',
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*State:* ${form.isTN ? 'Tamil Nadu' : 'Other State'}`,
      `*Address:* ${form.address}`,
      '',
      '*Items:*',
      lines,
      '',
      `*Total: INR ${cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}*`,
      '',
      '_Sent from sriveerafireworks.com_',
    ].join('\n')

    const wa = siteSettings.whatsapp || '918300057711'
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank')

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
    fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        customer_name: form.name,
        phone: form.phone,
        address: `[${form.isTN ? 'Tamil Nadu' : 'Other State'}] ${form.address}`,
        items: JSON.stringify(cartItems.map(i => ({
          product_code: i.product.product_code,
          name: i.product.name,
          quantity: i.qty,
          price: parseFloat(i.product.price || 0),
          unit: i.product.order_unit || '',
        }))),
        total: cartTotal,
        status: 'Payment Pending',
      }),
    }).catch(() => {})

    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="theme-color4 light ltr" style={{ minHeight: '100vh', background: '#f8f8f8' }}>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex-shrink-0">
              <img src={LOGO} alt="Sri Veera Fireworks" className="h-10 w-auto object-contain" />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/"          className="nav-link">Home</Link>
              <Link to="/about"     className="nav-link">About</Link>
              <Link to="/#products" className="nav-link">Products</Link>
              <Link to="/safety"    className="nav-link">Safety Tips</Link>
              <Link to="/#contact"  className="nav-link">Contact</Link>
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
          <span className="text-gray-800 font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-10">

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="flex justify-center mb-4"><CheckCircle2 size={64} color="#22c55e" /></div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Enquiry Sent!</h2>
            <p className="text-gray-500 mb-6">Your enquiry has been sent via WhatsApp. Our team will contact you shortly.</p>
            <Link to="/" className="inline-block bg-[#e87316] text-white rounded-lg px-8 py-3 font-semibold hover:bg-[#cf6512] transition-colors no-underline">
              Continue Shopping
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <div className="flex justify-center mb-4"><ShoppingBag size={64} color="#d1d5db" /></div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some crackers to get started!</p>
            <Link to="/" className="inline-block bg-[#e87316] text-white rounded-lg px-8 py-3 font-semibold hover:bg-[#cf6512] transition-colors no-underline">
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h1 className="text-2xl font-extrabold text-gray-900">Your Cart <span className="text-[#e87316]">({cartCount} items)</span></h1>
              {cartItems.map(({ product: p, qty }) => {
                const imgs = parseImages(p.image_url)
                return (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                    <img
                      src={imgs[0] || '/images/noimage.jpg'}
                      alt={p.name}
                      className="rounded-xl object-cover flex-shrink-0"
                      style={{ width: 80, height: 80 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm leading-tight">{p.name}</div>
                      {p.description && <div className="text-xs text-gray-400 mt-0.5">{p.description}</div>}
                      {p.order_unit && <div className="text-xs text-gray-400">{p.order_unit}</div>}
                      <div className="text-[#e87316] font-bold mt-1">{fmtPrice(p.price)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <button className="text-gray-400 hover:text-red-500" onClick={() => removeFromCart(p.id)}><X size={18} /></button>
                      <div className="qty-row">
                        <button onClick={() => setQty(p.id, qty - 1)}>−</button>
                        <input
                          type="number"
                          value={qty}
                          min={1}
                          onChange={e => {
                            const v = parseInt(e.target.value)
                            if (!isNaN(v) && v > 0) setQty(p.id, v)
                          }}
                        />
                        <button onClick={() => setQty(p.id, qty + 1)}>+</button>
                      </div>
                      <div className="text-sm font-bold text-gray-700">{fmtPrice(p.price * qty)}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary + Form */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{fmtPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Freight</span>
                  <span className="text-orange-500 font-medium">Extra</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between font-extrabold text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-[#e87316]">{fmtPrice(cartTotal)}</span>
                </div>
                <div className="mt-3 text-xs text-gray-400 bg-orange-50 rounded-lg px-3 py-2">
                  Min. order: ₹{minOrder.toLocaleString('en-IN')} ({form.isTN ? 'Tamil Nadu' : 'Other State'})
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">Your Details</h2>
                <form onSubmit={handleEnquiry} className="flex flex-col gap-3">
                  <div className="cart-state-toggle">
                    <button type="button" className={form.isTN ? 'active' : ''} onClick={() => setF('isTN', true)}>Tamil Nadu</button>
                    <button type="button" className={!form.isTN ? 'active' : ''} onClick={() => setF('isTN', false)}>Other State</button>
                  </div>
                  <input className={`cart-input ${formErr.name ? 'input-err' : ''}`} type="text" placeholder="Your Name *"
                    value={form.name} onChange={e => setF('name', e.target.value)} />
                  <input className={`cart-input ${formErr.phone ? 'input-err' : ''}`} type="tel" placeholder="10-digit Phone *"
                    value={form.phone} onChange={e => setF('phone', e.target.value)} maxLength={10} />
                  <textarea className={`cart-input ${formErr.address ? 'input-err' : ''}`} placeholder="Full Address *" rows={3}
                    value={form.address} onChange={e => setF('address', e.target.value)} />
                  <button type="submit" className="btn-wha flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Send WhatsApp Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
