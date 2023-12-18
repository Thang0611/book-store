import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoContainer from '../components/InfoContainer'


const Info = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen">
        <Header />
        <InfoContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Info
