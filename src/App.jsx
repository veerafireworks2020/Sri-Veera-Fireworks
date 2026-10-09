import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import { Toaster } from 'react-hot-toast'
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
} from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
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
            <Route index              element={<Navigate to="/admin/orders" replace />} />
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
