import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext = createContext();

export function CartContextProvider(props){
  
   let baseurl ='https://ecommerce.routemisr.com'
let headers = {
 token:localStorage.getItem('userToken')
}

let [cartId, setcartId] = useState(null);
let [numOfItem, setnumOfItem] = useState(0);
let [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);
let [wishListDetails, setWishListDetails] = useState([]);


async function checkCart(){
    let response = await getLoggedUserCart();
    
    
    if(response?.data?.status === "success")
   {
      setcartId(response.data.data._id);
    
      
      setnumOfItem(response.data.numOfCartItems);
      // console.log(numOfItem);
   }
  
  

   // console.log(response);
}
useEffect(() => {
  checkCart();
}, [numOfItem,cartId])

async function checkWhishlist() {
  let response = await getLoggedUserWishlist()
  if(response?.data?.status === "success")
    {
    setWishListDetails(response?.data?.data)  
    setNumOfFavoriteItems(response?.data?.count)
    }  
}
useEffect(() => {
  checkWhishlist();
}, [wishListDetails, numOfFavoriteItems]) 

function addToCart(productId) {
 return  axios.post(`${baseurl}/api/v1/cart`,
    {
     productId: productId
    
    },
    {
       headers : headers
    }).then((response )=> response)
       .catch((error)=> error);
}
function getLoggedUserCart() {
   return  axios.get(`${baseurl}/api/v1/cart`,
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }

  function removeItem(ProductId) {
   return  axios.delete(`${baseurl}/api/v1/cart/${ProductId}`,
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }

  
  function UpdateCartQuantity(ProductId,count) {
   return  axios.put(`${baseurl}/api/v1/cart/${ProductId}`,
      {
         count : count
      },
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }

  function ClearCart() {
   return  axios.delete(`${baseurl}/api/v1/cart`,
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }
  function onlinePayment(cartId,shippingAddress) {
  
   return  axios.post(`${baseurl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
         shippingAddress : shippingAddress,
      },
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }
  function cashPayment(cartId,shippingAddress) {
  
   return  axios.post(`${baseurl}/api/v1/orders/checkout-session/${cartId}`,
      {
         shippingAddress : shippingAddress,
      },
      {
         headers : headers
      }).then((response )=> response)
         .catch((error)=> error);
  }
 function getUserOrder(userId) {
  return axios.get(`${baseurl}/api/v1/orders/user/${userId}`)
  .then((response)=>response)
  .catch((error)=>error)
 }

 function addProductToAddWishlist(productId) {
  return axios.post(`${baseurl}/api/v1/wishlist`,
    {
      productId: productId
    },{headers: headers})
    .then((response)=>response)
    .catch((error)=>error)
 }
 function removeProductFromWishlist(productId) {
  return axios.delete(`${baseurl}/api/v1/wishlist/${productId}`,
    {headers :headers})
    .then((response)=>response)
    .catch((error)=>error)
 }
 function getLoggedUserWishlist() {
  return axios.get(`${baseurl}/api/v1/wishlist`,
    {headers :headers})
    .then((response)=>response)
    .catch((error)=>error)
 }

  return <CartContext.Provider value={{cartId,numOfItem,setnumOfItem,addToCart,getLoggedUserCart,onlinePayment,removeItem,UpdateCartQuantity,ClearCart,addProductToAddWishlist,removeProductFromWishlist,getLoggedUserWishlist,numOfFavoriteItems, setNumOfFavoriteItems,wishListDetails, setWishListDetails,checkWhishlist,checkCart,cashPayment,getUserOrder}}>
  {props.children}
 </CartContext.Provider>

}