import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import empty from '../../assets/Empty-cart.svg'
export default function Cart() {
 const [Cart, setCart] = useState(null);
 const [isLoading, setisLoading] = useState(false);
 let Navigate = useNavigate();
 let {getLoggedUserCart,removeItem,UpdateCartQuantity,ClearCart,setnumOfItem} = useContext(CartContext);
 async function getCart(){
  setisLoading(true);
   let response = await getLoggedUserCart();
   if(response?.data?.status === 'success')
   {
        setCart(response.data.data);
          console.log(response);
   }
   else{
     toast.error('Cart is empty')
   }
  setisLoading(false);

  }

  async function deleteItem(ProductId){
    let response = await removeItem(ProductId);
    setCart(response.data.data);
    toast.success('Item is removed succesfuly',{duration:2000})
    setnumOfItem(response.data.numOfCartItems)
    // console.log(response);
  }
  async function UpdateProductQuantity(ProductId ,count){
    let response = await UpdateCartQuantity(ProductId,count);
    setCart(response.data.data);
    toast.success('Item is uptated succesfuly',{duration:2000})
    
    // console.log(response);
  }

  async function ClearProducts(){
    let response = await ClearCart();
    if (response.data.message === 'success'){
      setCart(response.data.data);
      toast.success('Cart is empty',{duration:2000})
      setnumOfItem(response.data.numOfCartItems)
    }
    
   
    // console.log(response);
  }
  useEffect(() => {
   getCart();
  }, [])
  
  return (
    
   <div className='container'>
     <Helmet>
                
                <title>Cart Details</title>
                
            </Helmet>
 {isLoading? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div>
 :<>
  {Cart !==null && Cart?.products?.length> 0 ? 
  <div className='bg-dark sahdow-main  p-4 my-4'>
    <div className='d-flex justify-content-between'>
      <div>
    <h3>Shop Cart :</h3>
     <h6 className='text-main'>Total Cart Price: {Cart?.totalCartPrice} EGP</h6>
     </div>
      <div>
     <button onClick={ClearProducts}  className='btn btn-danger'><i class="fa-solid fa-lg fa-trash-can"></i> Clear Cart</button>
     </div>
    </div>
     
      {Cart?.products?.map((product)=>  <div key={product.product._id} className='row align-items-center border-bottom py-2 my-2'> 
       <div className='col-md-1'>
        <img src={product.product.imageCover} alt="" className='w-100'  />
       </div>
       <div className='col-md-11 d-flex justify-content-between'>
          <div> 
          <h6>{product.product.title}</h6>
          <h6 className='text-main'>price:{product.price} EGP</h6>
          <button onClick={()=>deleteItem(product.product._id)} className='btn btn-secondary m-0 p-0'><i className='fa-regular text-danger fa-trash-can'> </i> Remove</button>
          </div>

          <div>
              <button onClick={()=>UpdateProductQuantity(product.product._id,product.count+1)} className='btn btn-info btn-sm'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={()=>UpdateProductQuantity(product.product._id,product.count-1)} className='btn btn-info btn-sm'>-</button>
          </div>
       </div>
      </div>
      )}
      <button className='btn bg-main'>
        <Link className='text-white' to={'/checkout'}>
        <i class="fa-solid fa-basket-shopping fa-lg pe-1"></i>Checkout
        </Link>
      </button>
    </div>

  

  :
  <div className='py-5'>
  <img className='w-100' height={500} src={empty} alt="" />
</div>
  }

 </>
 }

   </div>
   )
}
 