import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import BestSellingProducts from '../components/BestSellingProducts'

const Home = () => {
  return (
    <div className="bg-slate-100">
      <Header />
      <Banner />
      <BestSellingProducts />
      <Footer />
    </div>
  )
}

export default Home
