import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Slider from 'react-slick';
import {Helmet} from "react-helmet";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';


export default function ProductDetails() {
  let baseurl ='https://ecommerce.routemisr.com'
  let {addToCart,setnumOfItem,addProductToAddWishlist,removeProductFromWishlist,numOfFavoriteItems, setNumOfFavoriteItems,wishListDetails, setWishListDetails,checkWhishlist} =useContext(CartContext);
  let{getProductsDetails} =useContext(ProductContext);
  const [productDetails, setproductDetail] = useState(null);
 const [isLoading, setisLoading] = useState(false);
 const [isFavorite, setIsFavorite] = useState(false);

let params = useParams();
async function addProduct(ProductId) {
  let response = await addToCart(ProductId);
  if (response?.data?.status === 'success') {
    setnumOfItem(response.data.numOfCartItems);
    
    toast.success(response.data.message, { duration: 2000 });
  } else {
    toast.error('Error', { duration: 2000 });
  }
}
async function addToWishlist(ProductId) {
  let response =  await addProductToAddWishlist(ProductId)
  if (response?.data?.status ==="success") { 
    // console.log(response);
    checkWhishlist();
    //setNumOfFavoriteItems(response?.count)
    console.log(numOfFavoriteItems);
           
     setIsFavorite(true)
     toast.success(response?.data?.message);
  }      

}
async function deleteFromWishlist(ProductId) {
  let response =await  removeProductFromWishlist(ProductId)
  if (response?.data?.status === 'success') {
    setIsFavorite(false)
    toast.success('removed');  
  }
}
function checkFavorite() {
  wishListDetails?.forEach(element => {
      if (element?._id == params.id) {
          setIsFavorite(true);
      }
  });
}

async function getDetailsOfProduct(id){
  setisLoading(true);
  let response = await getProductsDetails(id);
  if (response?.data?.data?._id !==null) {
    setproductDetail(response?.data.data)
  }

  setisLoading(false)
}
useEffect(() => {
 getDetailsOfProduct(params.id); 
  checkFavorite();

}, [])

var settings = {
 dots: true,
 infinite: true,
 speed: 500,
 slidesToShow: 1,
 slidesToScroll: 1,
 arrows:true,
 autoplay: true,
 autoplaySpeed: 5000
};

  return (
   <>
   <Helmet>
                
                <title>{productDetails?.title ?productDetails.title :  'Product Details'}</title>
                
            </Helmet>
   <div className="container">
   <div className='row justify-content-center align-items-center py-3'>
    {isLoading? 
    <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
    :<>
    <div className='col-md-4'>
    <Slider {...settings}>

     {productDetails?.images.map( (img)=> <img  src={img}/>)}
     </Slider>
    
    </div>


    <div className='col-md-8 pt-1'>
    <div className='d-flex justify-content-between align-items-center'>
    <h3 className='fw-bolder'>{productDetails?.title}</h3>
    <i className="fa-solid fa-heart fa-lg" style={{color:isFavorite?'#ff0000':'#BDBDBD'}}  onClick={()=>{isFavorite ?deleteFromWishlist(productDetails._id): addToWishlist(productDetails._id) }}></i>
    </div>
      <p className='p-2 text-muted'>{productDetails?.description}</p>
     <div className='d-flex justify-content-between'>
     <span className='text-muted'>{productDetails?.price}EGP</span>
     <span>
     <i className="fa-solid fa-star text-warning">  </i>
     {productDetails?.ratingsAverage}
     </span>
     </div>
     <button className='btn bg-main w-100 text-white' onClick={()=>addProduct(productDetails._id)}>+ Add</button>
     <div className="row pt-3">
     <div className='col-md-12 d-flex justify-content-between'>
      <div className='category-title'>
      <span className='fw-bold pe-1'>Category:</span>
      <Link className='product-order-name' to={`/categories/${productDetails?.category?._id}`}>
        {productDetails?.category?.name}
      </Link>
      </div>
       <div className='brand-title'>
       <span className='fw-bold pe-1'>Brand:</span>
       <Link className='product-order-name' to={`/brands/${productDetails?.brand?._id}`}>
          {productDetails?.brand?.name}
      </Link>
       </div>
      
    </div>
     </div>
    </div>
    
    </>}
  
   </div>
   </div>
   </>
  )
}
