import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {Helmet} from "react-helmet";
import loginimg from '../../assets/login.svg'


export default function Login({saveUserData}) {
  let baseurl ='https://ecommerce.routemisr.com'
  let navigate = useNavigate();
  const [isLoding, setisLoding] = useState(false);
  const [mesgError, setmesgError] = useState('')
  async function sendLoginDataToApi(values) {
    setisLoding(true);
    let {data}= await axios.post(`${baseurl}/api/v1/auth/signin`,values).catch((err)=>{
    setisLoding(false)
   setmesgError(`${err.response.data.statusMsg}! :${err.response.data.message} `) 
  
   })
   if(data.message == 'success'){
    localStorage.setItem('userToken' ,data.token)
    saveUserData();
    navigate('/')
    setisLoding(false);
   }
  }

  let myValdiation = Yup.object({
   
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'incorrect password'),
    
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: myValdiation,
    onSubmit: sendLoginDataToApi
  });

  return (
    <div className='w-75 mx-auto py-4'>
      <Helmet>
                
                <title>Login</title>
                
            </Helmet>
      <h2 className='text-center text-main'>Login Now</h2>
    {mesgError.length >0 ?<div className="alert alert-danger">
        {mesgError}
      </div> : null} 
      <div className="row d-flex align-items-center">
        <div className="col-md-4 sahdow-main py-4">
        <form onSubmit={formik.handleSubmit} >
        
        <label htmlFor="email">Email :</label>
        <input type="text" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
        {formik.errors.email&&formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

        <label htmlFor="password">password :</label>
        <input type="password" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.password} name="password" id="password" />
        {formik.errors.password &&formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}
         <br/>
         <Link to='/forgetpassword'> ForgetPassword ?</Link>
        <br/>
         {isLoding?<button  type='button' className='btn bg-main text-white'><i className="fa fa-spinner fa-spin"></i></button>:
          <button disabled={!(formik.dirty &&formik.isValid)} type='submit' className='btn bg-main text-white'>login</button>
         }
        
       
      </form>
      <div className='pt-2'>
         <span className='pe-1'>Don't have an account?</span>
        <Link className='text-main fw-bold product-order-name' to='/register'>
         Register
        </Link>
         </div>
        </div>
        <div className="col-md-8">
          <img src={loginimg} className='w-100' alt="" srcset="" />
        </div>
        </div> 
      

    </div>

  )
}
