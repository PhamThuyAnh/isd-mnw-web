import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img style={{ width: '100%' }} src="https://miniwooddesign.com/storage/uploads/library/slides/4-1676622226.png" onDragStart={handleDragStart} role="presentation" />,
  <img style={{ width: '100%' }} src="https://miniwooddesign.com/storage/uploads/library/slides/3-1677112669.png" onDragStart={handleDragStart} role="presentation" />,
  <img style={{ width: '100%' }} src="https://miniwooddesign.com/storage/uploads/library/slides/bia-web-1-1678844432.png" onDragStart={handleDragStart} role="presentation" />,
];

function Banner() {
  return (
    <div style={{ marginTop: '60px' }}>
      <AliceCarousel mouseTracking items={items} disableButtonsControls autoPlay autoPlayInterval={2000} />
    </div>
  )
}

export default Banner