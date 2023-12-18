import React from 'react'
import Header from '../components/Header'
import ProductContainer from '../components/ProductContainer'
import Footer from '../components/Footer'

const Product = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <ProductContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Product
