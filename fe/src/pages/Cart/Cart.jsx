import React from 'react'
import Navbar from '../Homepage/components/Navbar'
import Footer from '../Homepage/components/Footer'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Cart() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const [profileData, setProfileData] = useState();
  const [total, setTotal] = useState();
  const [hasChange, setHasChange] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/auth/profile',
    })
      .then(res => {
        setProfileData(res.data);
        let tempTotal = 0;
        res?.data?.cart?.forEach(ele => {
          tempTotal += ele?.price * ele?.quantity
        })
        setTotal(tempTotal)
      })
      .catch(error => console.log(error));
  }, [hasChange]);

  const addToCart = (data) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/product/add-cart',
      timeout: 20000,
      data: {
        id: data.id,
        name: data.name,
        price: data.price,
        main_img: data.main_img,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setHasChange(!hasChange)
      })
  }

  const minusCart = (data) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/product/remove-cart',
      timeout: 20000,
      data: {
        id: data.id,
        name: data.name,
        price: data.price,
        main_img: data.main_img,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setHasChange(!hasChange)
      })
  }

  const convertNumberToString = (number) => {
    let obj1 = new Intl.NumberFormat('en-US');
    let output = obj1.format(number);
    return output
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: '100px 150px 0 150px' }}>
        <h2 style={{ textAlign: 'center' }}>Giỏ Hàng Của Tôi</h2>
        <div style={{ fontSize: '18px', margin: '15px 0', fontWeight: '500' }}>Giỏ hàng ({profileData?.cart.length} sản phẩm)</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%' }}>
            {profileData?.cart.map(ele => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img src={ele?.main_img} width={'140px'} style={{ borderRadius: '20px' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', margin: '0 0 0 20px', fontWeight: '500' }}>{ele?.name}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <span style={{ padding: '5px 0px' }}>
                    <span style={{ padding: '0px 10px' }} onClick={() => minusCart(ele)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg>
                    </span>
                    <span style={{ padding: '0px 20px', fontSize: '23px' }}>{ele?.quantity}</span>
                    <span style={{ padding: '0px 10px' }} onClick={() => addToCart(ele)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                    </span>
                  </span>
                  <div style={{ fontSize: '18px', margin: '25px 0 0 25px', fontWeight: '600', color: '#f47245' }}>
                    {convertNumberToString(ele?.price * ele?.quantity)} VND
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ width: '30%' }}>
            <div style={{ fontSize: '18px', fontWeight: '500' }}>Tổng tiền</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
              <p>Tạm tính</p>
              <p style={{ fontSize: '18px', margin: '25px 0 0 25px', fontWeight: '600', color: '#f47245' }}>{convertNumberToString(total)} VND</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
              <p>Giảm giá</p>
              <p>0 VNĐ</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
              <div>
                <p>Tổng cộng</p>
                <p>(đã bao gồm VAT)</p>
              </div>
              <p style={{ fontSize: '18px', margin: '25px 0 0 25px', fontWeight: '600', color: '#f47245' }}>{convertNumberToString(total)} VND</p>
            </div>
            <Button onClick={() => navigate('/payment')} variant="outlined" style={{ margin: '20px 0', width: '100%', background: '#664424', color: 'White', fontWeight: 'bold', height: '50px' }}>Thanh toán</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart