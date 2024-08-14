import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import empty from '../../assets/WishList.svg'
import ProductCart from '../productcart/ProductCart';
export default function WishList() {
  let {getLoggedUserWishlist,removeProductFromWishlist,numOfFavoriteItems, setNumOfFavoriteItems,wishListDetails, setWishListDetails,checkWhishlist} = useContext(CartContext);
  const [isLoading, setisLoading] = useState(false)

  async function deleteFromWishlist(ProductId) {
    let response =await  removeProductFromWishlist(ProductId)
    if (response?.data?.status === 'success') {
      setNumOfFavoriteItems(response?.data?.count);
      toast.success('Item removed Successfuly');
      getWishList();

    }
}

async function getWishList() {
  setisLoading(true)
  let response = await getLoggedUserWishlist()
  if(response?.data?.status === "success")
    {      
    setWishListDetails(response?.data?.data)  
    setNumOfFavoriteItems(response?.data?.count)
    } 
  setisLoading(false)
}

// useEffect(() => {
//  getWishList()
// }, [])



  return (
    <div className='row w-75 bg-dark mx-auto sahdow-main my-5'>
    <Helmet>
    <title>Wish List</title>
</Helmet>
    <div className='col-md-12 py-3'>
      <h2 className='text-center text-main fw-bolder'>Wish List :</h2>
    </div>
    {isLoading? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div>
 :<>
 {wishListDetails !==null && wishListDetails?.length > 0 ? 
 <>
 {wishListDetails?.map((product) => <ProductCart
 key={product.id} product={product} />)}
  </>
 :<div className='col-md-12 text-center'>
 <img className='w-100' height={500} src={empty} alt="" />
</div>}
 </>}
    </div>
  )
}
