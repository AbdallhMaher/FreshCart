import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
 import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import empty from '../../assets/Empty-Orders.svg'
export default function Orders({userData}) {
  let baseurl ='https://ecommerce.routemisr.com'
  //  let UserId = userData?.id;
  //  console.log(UserId);
   
   let {checkCart,getUserOrder} = useContext(CartContext);
  const [Orders, setOrders] = useState(null)
  const [isLoading, setisLoading] = useState(true)
let navigate = useNavigate();
function getOut() {
  localStorage.removeItem('userToken');
  navigate('/');
}

  async function getOrders(userId) {
    setisLoading(true)
    let response = await getUserOrder(userId)
    if (response?.data?.length > 0){
      setOrders(response?.data)
    }
    else {
      (response?.response?.data?.message == 'Expired Token. please login again') ? getOut() : setOrders(null);
  }
  setisLoading(false);
  }

  useEffect(() => {
    checkCart();
    getOrders(jwtDecode(localStorage.getItem('userToken')).id);
  }, [])

    
  return (
    <>
    <Helmet>
      <title>Orders</title>    
    </Helmet>
    <div className='pt-4 pb-5 w-75 mx-auto'>
      <div className="row py-3">
         <div className="col-md-12">
          <h1 className='text-main text-center fw-bold'>Order List</h1>
         </div>
        {isLoading ? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
        : <>
          {Orders?.length >0 ?
          
          <div class="accordion" id="accordionExample">
             {Orders.slice().reverse().map((order,index)=>{
              return(<div key={order?._id} class="accordion-item sahdow-main">
                <h2 class="accordion-header  " id={order.id}>
                  <button className="accordion-button text-black acc" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${order._id}`} aria-expanded="true" aria-controls={order?._id}>
                    <div className="row position-relative w-100">
                      <div className="col-7 col-md-4 col-lg-3 d-flex row justify-content-between">
                        <span className='text-white fw-bold'>ORDER PLACED</span>
                        <span className='heart fw-lighter'>{order?.updatedAt?.slice(0, 10)}</span>
                      </div>
                      <div className="col-5 col-md-4 col-lg-3 d-flex row justify-content-between">
                          <span className='text-white fw-bold'>TOTAL</span>
                          <span className='heart fw-lighter'> {order?.totalOrderPrice}<span className='text-main ps-1'>EGP</span></span>
                        
                      </div>
                      <div className='position-absolute end-0 drop-down-order' style={{width : 'fit-content'}}>
                      <span className='text-white fw-bold'>OrderId : </span>{order?._id}
                      </div>
                    </div>
                  </button>
                </h2>
                <div id={`collapse${order._id}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div className="row d-flex">
                      <div className="col-md-6 h6">
                      <h4>Order Details: </h4>
                      {order?.user?.name}  <br/>
                      {order?.shippingAddress?.phone}  <br/>
                      {order?.shippingAddress?.city}  
                      </div>
                      <div className="col-md-6 h5 row justify-content-end ">
                        <span className='badge bg-main m-2'style={{width:'fit-content',height:'fit-content'}}> {order?.paymentMethodType === 'card' ? 'Card' : 'Cash'}</span>
                        <span className='badge bg-main m-2'style={{width:'fit-content',height:'fit-content'}}> {order?.isPaid ? 'Paid' : 'Not Paid'}</span>
                        <span className='badge bg-main m-2'style={{width:'fit-content',height:'fit-content'}}>{order?.isDelivered ? 'Delivered' : 'In Way'}</span>
                        <span className='badge bg-main m-2'style={{width:'fit-content',height:'fit-content'}}> {order?.totalOrderPrice}EGP</span>
                      </div>
                    </div>
                    <h4 className='mt-3'>Products : <span className='h6 ms-4 text-bg-primary'>No. {order?.cartItems?.length}</span></h4>
                         <div className="row">
                             {order?.cartItems?.map((item,index)=> <div className="col-md-6 col-lg-4 mt-4" key={index}>
                                     <div className="row border-bottom row pb-1 mx-1">
                                        <div className='col-5 col-md-4 col-lg-3'>
                                            <img className='w-100' src={item?.product?.imageCover} alt="product-imagecover" />
                                        </div>
                                        <div className="col-7 col-md-8 col-lg-9">
                                          <Link className='d-block fw-normal product-order-name text-main' to={`/productdetails/${item?.product?._id}`}>
                                          {item?.product?.title?.split(' ').slice(0, 3).join(' ')}
                                          </Link>
                                          <span>
                                            {item?.count} x EGP {item?.price}
                                          </span>
                                        </div>
                                     </div>
                            </div>
                             )}
                         </div>
                  </div>
                </div>
              </div>

              )
             }
          )}
            </div>

          
          
          
          
          :
          <div className='col-md-12 py-3  text-center'>
            <h3 className='text-danger'>noo orders</h3>
                        <img className='w-100' height={500} src={empty} alt="" />
                    </div>

          }
          </>

        }
      </div>
    </div>

    
    
    </>
  )
}
