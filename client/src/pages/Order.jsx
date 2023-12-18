import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import OrderContainer from '../components/OrderContainer'

const Order = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <OrderContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Order
