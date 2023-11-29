import React, { useEffect } from 'react'
import Navbar from '../Homepage/components/Navbar'
import TableOrder from './TableOrder'
import Footer from '../Homepage/components/Footer'

function Order() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  return (
    <div>
      <Navbar />
      <div style={{margin: '100px 100px 500px 100px'}}>
        <h2>Lịch sử đơn hàng</h2>
        <TableOrder />
      </div>
      <Footer />
    </div>
  )
}

export default Order