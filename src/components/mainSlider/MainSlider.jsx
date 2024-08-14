import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../../assets/slider-image-1.jpeg'
import slide2 from '../../assets/slider-image-2.jpeg'
import slide3 from '../../assets/slider-image-3.jpeg'
export default function MainSlider() {
  return (
    <>
      <div className='row g-0'>
       <div className='col-md-9'>
        <OwlCarousel className='owl-theme' items={1} loop>
        <img className='w-100 main-img-slide' height={400} src={slide1} alt=''/>
        <img className='w-100 main-img-slide' height={400} src={slide2} alt=''/>
        <img className='w-100 main-img-slide' height={400} src={slide3} alt=''/>
        </OwlCarousel>
        
       </div>
       <div className='col-md-3'>
        <img height={200} className='w-100' src={slide2 } alt=''/>
        <img height={200} className='w-100' src={slide3} alt=''/>
       </div>
      </div>
    </>
  )
}
