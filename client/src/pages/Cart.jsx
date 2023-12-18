import React from 'react'
import Header from '../components/Header'
import CartContainer from '../components/CartContainer'
import Footer from '../components/Footer'

const Cart = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <CartContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Cart
