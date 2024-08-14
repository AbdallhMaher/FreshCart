import React from 'react'
import {Helmet} from "react-helmet";
import FetcharedProducts from '../fetcharedproducts/FetcharedProducts'
import CategorySlider from '../categoryslider/CategorySlider'
import MainSlider from '../mainSlider/MainSlider'
import BrandSlider from '../brandslider/BrandSlider';
export default function Home() {

  return (
    <>
    <div className="container">
    <Helmet>
                <title>Home</title>
                
            </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
    <FetcharedProducts></FetcharedProducts>
    <BrandSlider></BrandSlider>
    </div>
   
   </>
  )
}
