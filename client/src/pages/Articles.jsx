import Announcement from "../components/Announcement";
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'

const Articles = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      {/* <Slider /> */}
      {/* <Categories /> */}
      {/* <Products/> */}
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Articles