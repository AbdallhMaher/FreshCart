import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-hot-toast';
export default function ProductCart({product}) {
  let baseurl = 'https://ecommerce.routemisr.com';
  let { addToCart, setnumOfItem ,addProductToAddWishlist,removeProductFromWishlist,numOfFavoriteItems, setNumOfFavoriteItems,wishListDetails, setWishListDetails,checkWhishlist} = useContext(CartContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function getOut() {
    localStorage.removeItem('userToken');
    navigate('/');
}

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
        if (element?._id == product._id) {
            setIsFavorite(true);
        }
    });
}
useEffect(() => {
  if (wishListDetails.length > 0) {
    checkFavorite();
  }

}, [wishListDetails]);

  return (
    <div key={product._id} className='col-6 col-md-4 col-lg-3 col-xl-2'>
                  <div className='product cursor-pointer px-2 py-3'>
                    <Link to={`/ProductDetails/${product._id}`}>
                      <img className='w-100' src={product.imageCover} alt={product.title} />
                      </Link>
                      <div className='d-flex justify-content-between  align-items-center mb-2'>
                      <div className='cart-title'>
                      <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                      <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                      </div>
                      <div>
                      <i className="fa-solid fa-heart fa-lg" style={{color:isFavorite?'#ff0000':'#BDBDBD'}} 
                      onClick={()=>{
                      isFavorite ?deleteFromWishlist(product._id): addToWishlist(product._id) }}></i>
                      </div>
                      
                      </div>
                      
                      <div className='d-flex justify-content-between'>
                        <span className=' text-white'>{product.price}EGP</span>
                        <span>
                          <i className="fa-solid fa-star text-warning"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                  
                    <button onClick={() => addProduct(product._id)} className='btn bg-main w-100 text-white'><i class="fa-solid fa-cart-plus fa-lg pe-2" style={{color:"#ffffff"}}></i> Add</button>
                  </div>
                </div>
  )
}
