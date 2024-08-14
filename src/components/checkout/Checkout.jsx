import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';


export default function Checkout() {
 let {onlinePayment,cartId,cashPayment} = useContext(CartContext);
  const [isLoading, setisLoading] = useState();
  const [selectButton, setselectButton] = useState();
 let navigate = useNavigate();
 function getOut() {
     localStorage.removeItem('userToken');
     navigate('/');
 }
 async function handleOnlineSubmit(values){
  setisLoading(true)
    let response = await onlinePayment(cartId,values);
    if(response?.data?.status === 'success')
    {
      console.log(response);
      toast.success("Successfuly Order")
      window.location.href = response.data.session.url;
    }
    else{
      (response?.response?.data.message === 'Expired Token. please login again' ||response?.response?.data.message === 'You are not logged in. Please login to get access' )?getOut() : toast.error('Failed Order');

    }
    setisLoading(false);
 }
 async function handleCashSubmit(values) {
  setisLoading(true);
  let response = await cashPayment(cartId, values);
  if (response?.data?.status === 'success') {
      toast.success('Successfuly Order');
      navigate('/allorders');
  }
  else {
      (response?.response?.data?.message == 'Expired Token. please login again' ||
        response?.response?.data?.message == 'You are not logged in. Please login to get access') ?
          getOut() : toast.error('Failed Order');
  }
  setisLoading(false);
}
function handleSubmit(values){
   if(selectButton === 'Cash' ){
    handleCashSubmit(formik.values)
   }
   else if(selectButton === 'Visa'){
    handleOnlineSubmit(formik.values)
   }
}
let myValdiation = Yup.object({
  details :Yup.string().required('details is required').min(4,'Minimum letter should be 4').max(50,'maximum letters should be 100'),
  phone :Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}/,'phone must be a valid number'),
  city : Yup.string().required('city is required').min(2,'Minimum letter should be 2').max(12,'maximum letters should be 12'),
})
 let formik = useFormik({
  initialValues:{
   details:'',
   phone:'',
   city:''
  },
  onSubmit: handleSubmit,
  validationSchema : myValdiation,
 });
  return (
   <div className='w-50 mx-auto py-5'>
      <Helmet>
                
                <title>Check out</title>
                
            </Helmet>
            <div className="row">
            <div className='col-md-8 mx-auto sahdow-main'>
   <form onSubmit={formik.handleSubmit}  >
     <label htmlFor='details'>Address:</label>
      <input type="text" value={formik.values.details}  onChange={formik.handleChange}  onBlur={formik.handleBlur} name="details" id="details" className='form-control mb-3' />
      {formik.errors.details &&formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div> : ""}

     
     <label htmlFor='phone'>phone :</label>
      <input type="tel" value={formik.values.phone} onChange={formik.handleChange}  onBlur={formik.handleBlur} name="phone" id="phone" className='form-control mb-3' />
      {formik.errors.phone &&formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}

      <label htmlFor='city'>city :</label>
    <input type="text" value={formik.values.city}  onChange={formik.handleChange}  onBlur={formik.handleBlur} name="city" id="city" className='form-control mb-3' />
    {formik.errors.city &&formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div> : ""}
 
       <div className="row ">
        <div className="col-md-6 d-flex">
        <button type="submit" className='btn bg-main w-100 mb-3  mb-3 text-black fw-bold' disabled={isLoading || !(formik.dirty && formik.isValid)} onClick={()=>{setselectButton('Visa')}}>
        {isLoading ?<i className='fas fa-spinner fa-spin'></i> :
          <>
          <i class="fa-brands fa-cc-visa fa-lg pe-2"></i>PayVisa
          </>
          }
        </button>
        </div>
        <div className="col-md-6 d-flex">
        <button type="submit" className='btn bg-main w-100 mb-3 text-black fw-bold' disabled={isLoading || !(formik.dirty && formik.isValid)} onClick={()=>{setselectButton('Cash')}}>
          {isLoading ?<i className='fas fa-spinner fa-spin'></i> :
          <>
          <i class="fa-solid fa-money-check-dollar fa-lg pe-2"></i>PayCash
          </>
          }
        </button>
        </div>
       </div>
      
   </form>
   </div>
   </div>
   </div>
  )
}

