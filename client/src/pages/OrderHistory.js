import Announcement from "../components/Announcement";
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import OrderHistoryComponent from "../components/OrderHistory.jsx/OrderHistoryComponent";

const OrderHistory = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      {/* <Slider /> */}
      {/* <Categories /> */}
      {/* <Products/> */}
      <OrderHistoryComponent />
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default OrderHistory