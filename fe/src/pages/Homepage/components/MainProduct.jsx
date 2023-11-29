import React from 'react'
import styled from 'styled-components';
import { FlexAroundCenter, FlexBetweenCenter, FlexCenterCenter, FlexCenterCenterColumn } from '../../../components/styleComponent';

function MainProduct() {
  return (
    <MainProductContainer>
      <FlexCenterCenterColumn>
        <p style={{ fontWeight: 'bold', fontSize: '30px', marginBottom: '10px' }}>SẢN PHẨM CHÍNH</p>
      </FlexCenterCenterColumn>
      <FlexAroundCenter>
        <CategoryName>TẤT CẢ</CategoryName>
        <CategoryName>ỐP ĐIỆN THOẠI</CategoryName>
        <CategoryName>GỌNG KÍNH</CategoryName>
        <CategoryName>BẬT LỬA</CategoryName>
        <CategoryName>ỐP ĐIỆN THOẠI</CategoryName>
      </FlexAroundCenter>
      <FlexBetweenCenter style={{ margin: '20px 15px' }}>
        <img style={{ width: '23%' }} src='https://miniwooddesign.com/storage/uploads/library/grids/thiet-ke-chua-co-ten-9-1663323431.png' alt='' />
        <img style={{ width: '23%' }} src='https://miniwooddesign.com/storage/uploads/library/grids/thiet-ke-chua-co-ten-11-1663323464.png' alt='' />
        <img style={{ width: '23%' }} src='https://miniwooddesign.com/storage/uploads/library/grids/thiet-ke-chua-co-ten-10-1663323503.png' alt='' />
        <img style={{ width: '23%' }} src='https://miniwooddesign.com/storage/uploads/library/grids/thiet-ke-chua-co-ten-9-1663323431.png' alt='' />
      </FlexBetweenCenter>
    </MainProductContainer>
  )
}

export default MainProduct;

const MainProductContainer = styled.div`
  // margin:  0;
`

const CategoryName = styled.p`
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  font-weight: bold;
  padding: 5px 15px;
`