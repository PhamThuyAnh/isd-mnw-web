import React from 'react'

function Feedback() {
  return (
    <>
      <hr />
      <h1 style={{textAlign: 'center', margin: '40px 0'}}>Phản hồi</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 100px 50px 100px' }}>
        <div style={{ width: '30%' }}>
          <img width='100%' src='https://miniwooddesign.com/storage/uploads/images/1/thiet-ke-chua-co-ten-5-1663321371_700x700.png' alt='#' />
        </div>
        <div style={{ width: '30%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <img width='48%' src='https://miniwooddesign.com/storage/uploads/images/1/120825468-1997916883673202-8261204485376066972-n-1-1623662513_700x700.jpg' alt='#' />
            <img width='48%' src='https://miniwooddesign.com/storage/uploads/images/1/0f9a6159-1-1623662008_700x700.jpg' alt='#' />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img width='48%' src='https://miniwooddesign.com/storage/uploads/images/1/0f9a6159-1-1623662008_700x700.jpg' alt='#' />
            <img width='48%' src='https://miniwooddesign.com/storage/uploads/images/1/thiet-ke-chua-co-ten-6-1663321534_700x700.png' alt='#' />
          </div>
        </div>
        <div style={{ width: '30%' }}>
          <img width='100%' src='https://miniwooddesign.com/storage/uploads/images/1/120825468-1997916883673202-8261204485376066972-n-1-1623662513_700x700.jpg' alt='#' />
        </div>
      </div>
    </>
  )
}

export default Feedback