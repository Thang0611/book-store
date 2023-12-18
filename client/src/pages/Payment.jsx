import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PaymentSuccess from '../components/PaymentSuccess'

const Payment = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <PaymentSuccess />
      </div>
      <Footer />
    </div>
  )
}

export default Payment