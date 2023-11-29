import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import styled from 'styled-components';
import { FlexCenterCenter, FlexCenterCenterColumn } from '../../../components/styleComponent';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function Trend() {
  const convertNumberToString = (number) => {
    let obj1 = new Intl.NumberFormat('en-US');
    let output = obj1.format(number);
    return output
  }
  const navigate = useNavigate()
  const [dataProduct, setDataProduct] = useState([])
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
        let listProduct = res.data.map((ele) => (
          <FlexCenterCenterColumn className="item" data-value="1">
            <FlexCenterCenterColumn style={{ width: '80%', background: 'white' }}>
              <div>
                <img style={{ width: '100%' }} src={ele.main_img} alt='' />
              </div>
              <FlexCenterCenterColumn>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{ele.name}</p>
                <p>{convertNumberToString(ele.price)} VND</p>
                <Button variant="outlined" onClick={()=> navigate(`product/detail/${ele._id}`)} style={{ marginBottom: '20px', border: '1px solid black', color: 'black', fontWeight: 'bold' }}>Mua ngay</Button>
              </FlexCenterCenterColumn>
            </FlexCenterCenterColumn>
          </FlexCenterCenterColumn>
        ))
        setDataProduct(listProduct)
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <TrendContainer>
      <FlexCenterCenterColumn>
        <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '10px' }}>XU HƯỚNG</p>
        <p>Tại MiniWood, chúng tôi luôn nhận được sự tin tưởng và hỗ trợ khách hàng một cách tốt nhất.</p>
      </FlexCenterCenterColumn>
      <div style={{ margin: '0 10%' }}>
        <AliceCarousel
          mouseTracking
          items={dataProduct}
          responsive={responsive}
          controlsStrategy="alternate"
          disableButtonsControls
        />
      </div>
    </TrendContainer>
  )
}

export default Trend;

const TrendContainer = styled.div`
  background-color: #ededed;
  margin-top: 20px;
  padding-bottom: 20px;
`