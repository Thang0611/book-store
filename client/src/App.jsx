import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './pages/admin/ProtectedRoute'
import DashBoard from './pages/admin/DashBoard'
import AddProduct from './pages/admin/AddProduct'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import DetailProduct from './pages/DetailProduct'

import Order from './pages/Order'
import Product from './pages/Product'

import Info from './pages/Info'
import Payment from './pages/Payment'
function App() {
  return (
    <Routes>
      <Route exact element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashBoard />} />
      </Route>
      <Route path="product" element={<AddProduct />} />
      <Route path="product/:id" element={<AddProduct />} />
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="cart" element={<Cart />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="info" element={<Info />} />
      <Route path="order" element={<Order />} />
      <Route path="payment" element={<Payment />} />
      <Route path="book" element={<Product />} />
      <Route path="book/:id" element={<DetailProduct />} />
    </Routes>
  )
}

export default App
