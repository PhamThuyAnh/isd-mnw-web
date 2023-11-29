import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login/Login'
import Signup from '../pages/Auth/Signup/Signup'
import { useDispatch, useSelector } from 'react-redux'
import Homepage from '../pages/Homepage/Homepage'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import axios from 'axios'
import { AuthReduxActions } from '../reduxSaga/Auth/AuthRedux'
import Profile from '../pages/Auth/Profile/Profile'
import ChangePassword from '../pages/Auth/ChangePassword/ChangePassword'
import Product from '../pages/Product/Product'
import DetailProduct from '../pages/DetailProduct/DetailProduct'
import Cart from '../pages/Cart/Cart'
import Payment from '../pages/Payment/Payment'
import Order from '../pages/Order/Order'

function Router() {
  const { loginStatus } = useSelector((state) => state.auth);
  console.log(loginStatus, 'loginStatus');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/auth/profile',
    })
      .then(res => {
        console.log(res,'res');
        dispatch(AuthReduxActions.setLoginStatus(true));
      })
      .catch(error => console.log(error));
  }, [loginStatus])

  return (
    <Routes>
      {
        loginStatus ?
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product/detail/:id" element={<DetailProduct />} />
          </> :
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
      }
    </Routes>
  )
}

export default Router