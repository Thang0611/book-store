import React from 'react'
import Header from '../components/Header'
import DetailContainer from '../components/DetailContainer'
import Footer from '../components/Footer'

const DetailProduct = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <DetailContainer />
      </div>
      <Footer />
    </div>
  )
}

export default DetailProduct
