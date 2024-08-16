import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  let baseurl ='https://ecommerce.routemisr.com'
  let{getAllCategories,Category, setCategory} = useContext(ProductContext);
  let navigate = useNavigate();
  
  function getOut() {
      localStorage.removeItem('userToken');
      navigate('/');
  }
async function getCategory(){
 let response = await getAllCategories()
 console.log('done');
 
 if (response?.data.results> 0) {
  setCategory(response?.data.data)
 }
 else{
  if (response?.response?.data?.message =='Expired Token. please login again') {
    getOut()
  }
 }
}
useEffect ( ()=>{
  // if(Category=== null){
    getCategory();
// }
},[] )
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
    <h5 >Shop Popular Categories</h5>
   <Slider {...settings}>

   {Category?.map((Category)=> <Link key={Category._id} to={`categories/${Category._id}`}>

        <img className='w-100 category-img-slide' height={200} src={Category.image}/>
        <h2 className='h6 pt-2'>{Category.name}</h2>
        
   </Link>)}


    
   </Slider>
   </>
  )
}
