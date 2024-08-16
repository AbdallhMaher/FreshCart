import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Offline } from "react-detect-offline"
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import Brands from './components/brands/Brands'
import Cart from './components/cart/Cart'
import Categories from './components/categories/Categories'
import Checkout from './components/checkout/Checkout'
import ForgetPassword from './components/forgetpassword/ForgetPassword'
import ResetPassword from './components/forgetpassword/ResetPassword'
import Home from './components/home/Home'
import Layout from './components/layout/Layout'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import NotFound from './components/notfound/NotFound'
import ProductDetails from './components/productDetails/ProductDetails'
import Products from './components/products/Products'
import ProtectedRoute from './components/protectedroute/ProtectedRoute'
import Register from './components/register/Register'
import { CartContextProvider } from './context/CartContext'
import Orders from './components/orders/Orders'
import { ProductContextProvider } from './context/ProductContext'
import WishList from './components/wishlist/WishList'
export default function App() {
 useEffect(() => {
 if(localStorage.getItem('userToken') !== null)
 {
  saveUserData();
 }
 }, [])
 
  
const [userData, setUserData] = useState(null);

function saveUserData(){
 let encodedToken = localStorage.getItem('userToken');
 let decodedToken = jwtDecode(encodedToken);
 setUserData(decodedToken);
}
let routers = createHashRouter([
  {path:'' ,element:<Layout setUserData={setUserData} userData={userData}/>, children:[
     {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
     {path:'products' ,element:<ProtectedRoute><Products/></ProtectedRoute>},
     {path:'cart' ,element:<ProtectedRoute><Cart/></ProtectedRoute>},
     {path:'checkout' ,element:<ProtectedRoute><Checkout/></ProtectedRoute>},
     {path:'brands/:id' ,element:<ProtectedRoute><Brands/></ProtectedRoute>},
     {path:'categories/:id' ,element:<ProtectedRoute><Categories/></ProtectedRoute>},
     {path:'ProductDetails/:id' ,element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
     {path:'forgetpassword' ,element:<ForgetPassword/>},
     {path:'resetpassword' ,element:<ResetPassword/>},
     {path:'login' ,element:<Login saveUserData={saveUserData}/>},
     {path:'register' ,element:<Register/>},
     {path:'allorders',element:<ProtectedRoute><Orders userData={userData}/></ProtectedRoute>},
     {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
     {path:'logout' ,element:<Logout/>},
     {path:'*' ,element:<NotFound/>}
  ]}
])

 
  return<> 
    
    <Offline >
      <div className='network rounded'>
      <i className="fa-solid fa-plane-up text-main fa-3x">
      <span className='fw-bolder fs-4 ps-1 text-white'>you are offline <span className='text-warning fs-2'>😢</span> </span>  
        </i> 
            
    </div>
      </Offline>
    <Toaster/>
    <CartContextProvider>
     <ProductContextProvider>
     <RouterProvider router={routers}></RouterProvider>
     </ProductContextProvider>
  </CartContextProvider>
  </>
  
}