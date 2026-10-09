import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ShopProvider } from './context/ShopContext'
import { Toaster } from 'react-hot-toast'
import Fireworks from './components/Fireworks'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function FireworksOverlay() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return <Fireworks />
}

function PricelistFAB() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  if (pathname.startsWith('/admin') || pathname === '/products' || pathname.startsWith('/products/')) return null
  return (
    <button
      onClick={() => navigate('/products')}
      title="View Products"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9990,
        width: 64, height: 64, borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff7011, #e87316)',
        border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(255,112,17,0.5)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        animation: 'fab-pulse 2.5s ease-in-out infinite',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,112,17,0.65)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,112,17,0.5)' }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>🎆</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>PRODUCTS</span>
    </button>
  )
}
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Safety from './pages/Safety'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import AdminLayout, {
  AdminLogin,
  AdminCategories,
  AdminProducts,
  AdminAnnouncement,
  AdminHeroBanners,
  AdminSettings,
  AdminOrders,
  AdminDashboard,
} from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ScrollToTop />
        <FireworksOverlay />
        <PricelistFAB />
        <Toaster position="top-center" containerStyle={{ zIndex: 1000000 }} />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/cart"         element={<Cart />} />
          <Route path="/wishlist"     element={<Wishlist />} />
          <Route path="/about"        element={<About />} />
          <Route path="/safety"       element={<Safety />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/admin/login"  element={<AdminLogin />} />
          <Route path="/admin"        element={<AdminLayout />}>
            <Route index              element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard"   element={<AdminDashboard />} />
            <Route path="orders"      element={<AdminOrders />} />
            <Route path="categories"  element={<AdminCategories />} />
            <Route path="products"    element={<AdminProducts />} />
            <Route path="banners"     element={<AdminHeroBanners />} />
            <Route path="announcement" element={<AdminAnnouncement />} />
            <Route path="settings"    element={<AdminSettings />} />
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  )
}
