import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
export default function BrandSlider() {
  let {getBrands} = useContext(ProductContext);
  const [isLoading, setisLoading] = useState(false);
  const [brands, setbrands] = useState()
  let navigate = useNavigate();
  function getOut() {
      localStorage.removeItem('userToken');
      navigate('/');
  }

  async function getAllBrands(){
    setisLoading(true);
    let response = await getBrands()
    if (response?.data?.results >0) {
      console.log(response);
    setbrands(response?.data?.data)
    }
    else{
      if (response?.response?.data?.message =='Expired Token. please login again') {
        getOut()
      }
     }
    setisLoading(false)
  }
  useEffect(() => {
    getAllBrands()
  }, [])
  const settings = {
    dots: false,
    infinity: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                
            }
        },
    ]
  };
  return (
    <>
    <h5 >Shop Popular Brands</h5>
   <Slider {...settings}>

   {brands?.map((brand)=> <Link key={brand._id} to={`brands/${brand._id}`}>

        <img className='w-75 slide-box'  src={brand.image}/>
        <h2 className='h6 pt-2'>{brand.name}</h2>
        
   </Link>)}


    
   </Slider>
   </>
  )
}
