import React from 'react'
import Navbar from '../Homepage/components/Navbar'
import Footer from '../Homepage/components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Zoom from 'react-img-zoom'
import { Button } from '@mui/material'
import AliceCarousel from 'react-alice-carousel'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
const responsive = {
  0: { items: 1 },
  568: { items: 3 },
  1024: { items: 5 },
};

function DetailProduct() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const navigate = useNavigate();
  const [detailProduct, setDetailProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [listImageProduct, setListImageProduct] = useState([]);
  const [imgMain, setImgMain] = useState('');
  console.log(imgMain, 'imgMain')
  let { id } = useParams();
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/product/get-detail-product/' + id,
      timeout: 20000,
    },)
      .then(res => {
        setDetailProduct(res.data);
        setImgMain(res.data.main_img)
        let tempListImage = [res?.data?.main_img, res?.data?.main_img_1, res?.data?.main_img_2, res?.data?.main_img_3, res?.data?.main_img_4, res?.data?.main_img_5, res?.data?.main_img_6]
        let listImage = tempListImage.map((ele) => {
          if (ele) {
            return (
              <img src={ele} onClick={() => setImgMain(ele)} width={'90px'} alt="#" />
            )
          }
        }
        )
        setListImageProduct(listImage)
      })
  }, [id])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/product/get-all-product',
      timeout: 20000,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        let tempList = res.data.map((ele) => (
          <img Width='85%' onClick={() => navigate(`/product/detail/${ele._id}`)} src={ele.main_img} alt="#" />
        ))
        setListProduct(tempList)
      })
  }, [])

  const convertNumberToString = (number) => {
    let obj1 = new Intl.NumberFormat('en-US');
    let output = obj1.format(number);
    return output
  }

  const addToCart = (detailProduct) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/product/add-cart',
      timeout: 20000,
      data: {
        id: detailProduct._id,
        name: detailProduct.name,
        price: detailProduct.price,
        main_img: detailProduct.main_img,
      }
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        navigate('/cart')
      })
  }
  return (
    <>
      <div style={{ margin: '80px 100px 0 100px' }}>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%' }}>
            <img width='100%' src={imgMain} alt="#" />
            <AliceCarousel mouseTracking items={listImageProduct} disableButtonsControls responsive={responsive} />
          </div>
          <div style={{ width: '48%' }}>
            <h2 style={{}}>{detailProduct?.name}</h2>
            <h2 style={{ color: '#F4724B' }}>{convertNumberToString(detailProduct?.price)} VND</h2>
            <h3>Ghi chú</h3>
            <textarea style={{ width: '100%' }} rows="5" placeholder='Hay cho Miniwood biet ban can ho tro gi them nha!' />
            <Button onClick={() => addToCart(detailProduct)} variant="outlined" style={{ marginTop: '20px', width: '300px', background: '#664424', color: 'White', fontWeight: 'bold', height: '50px' }}><ShoppingCartIcon sx={{ color: 'white', marginRight: '20px' }} /> THêm vào giỏ hàng</Button>
            <h5>MÔ TẢ SẢN PHẨM</h5>
            <div style={{ border: '1px solid gray', padding: '10px' }}>
              <p>{detailProduct?.main_des_1 ? `- ${detailProduct?.main_des_1}` : ''}</p>
              <p>{detailProduct?.main_des_2 ? `- ${detailProduct?.main_des_2}` : ''}</p>
              <p>{detailProduct?.main_des_3 ? `- ${detailProduct?.main_des_3}` : ''}</p>
              <p>{detailProduct?.main_des_4 ? `- ${detailProduct?.main_des_4}` : ''}</p>
              <p>{detailProduct?.main_des_5 ? `- ${detailProduct?.main_des_5}` : ''}</p>
              <p>{detailProduct?.main_des_6 ? `- ${detailProduct?.main_des_6}` : ''}</p>
              <p>{detailProduct?.main_des_7 ? `- ${detailProduct?.main_des_7}` : ''}</p>
              <p>{detailProduct?.main_des_8 ? `- ${detailProduct?.main_des_8}` : ''}</p>
              <p>{detailProduct?.main_des_9 ? `- ${detailProduct?.main_des_9}` : ''}</p>
            </div>
          </div>
        </div>
        <h4 style={{ textAlign: 'center', margin: '50px 0 40px 0' }}>CÓ THỂ BẠN QUAN TÂM</h4>
        <AliceCarousel mouseTracking items={listProduct} disableButtonsControls responsive={responsive} />
      </div>
      <Footer />
    </>
  )
}

export default DetailProduct