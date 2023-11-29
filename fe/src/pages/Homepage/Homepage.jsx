import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Trend from './components/Trend'
import MainProduct from './components/MainProduct'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux'
import { ProductReduxActions } from '../../reduxSaga/Product/ProductRedux'
import { Modal } from '@mui/material'
import Profile from './components/Profile'
import Feedback from './components/Feedback'

function Homepage() {
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  useEffect(() => {
    dispatch(ProductReduxActions.getProductRequest());
  }, [])
  return (
    <div>
      <Navbar />
      <Banner />
      <Trend />
      <MainProduct />
      <Feedback />
      <Footer />
      {/* <Modal
        open={openProfile}
        onClose={()=> setOpenProfile(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Profile />
      </Modal> */}
    </div>
  )
}

export default Homepage