import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {Helmet} from "react-helmet";
import sigunimg from '../../assets/signup.svg'
export default function Register() {
  let baseurl ='https://ecommerce.routemisr.com'
  let navigate = useNavigate();
  const [isLoding, setisLoding] = useState(false);
  const [mesgError, setmesgError] = useState('')
  async function sendRegisterDataToApi(values) {
    setisLoding(true);
    let {data}= await axios.post(`${baseurl}/api/v1/auth/signup`,values).catch((err)=>{
    setisLoding(false)
   setmesgError(`${err.response.data.statusMsg}! :${err.response.data.message} `) 
  
   })
   if(data.message == 'success')
    navigate('/login')
    setisLoding(false);
  }

  let myValdiation = Yup.object({
    name: Yup.string().required('name is required').min(3, 'minmum length should be 3').max(10, 'maxmum length should be 10'),
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'incorrect password'),
    rePassword: Yup.string().required('repassword is required').oneOf([Yup.ref('password')], "password and repassword must be same"),
    phone: Yup.string().required('phone is required').matches(/^01[1205][0-9]{8}$/, 'phone is valid')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: myValdiation,
    onSubmit: sendRegisterDataToApi
  });

  return (
    <div className='w-75 mx-auto py-4'>
      <Helmet>
                
                <title>Register</title>
                
            </Helmet>
      <h2 className='text-main text-center'>Register Now</h2>
    {mesgError.length >0 ?<div className="alert alert-danger">
        {mesgError}
      </div> : null}  
      <div className="row d-flex align-items-center">
        <div className="col-md-4 sahdow-main py-4">
        <form onSubmit={formik.handleSubmit} >
        <label htmlFor="name">name :</label>
        <input type="text" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.name} name="name" id="name" />
        {formik.errors.name &&formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

        <label htmlFor="email">Email :</label>
        <input type="text" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.email} name="email" id="email" />
        {formik.errors.email&&formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

        <label htmlFor="password">password :</label>
        <input type="password" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.password} name="password" id="password" />
        {formik.errors.password &&formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

        <label htmlFor="rePassword">rePassword :</label>
        <input type="password" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="rePassword" />
        {formik.errors.rePassword &&formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

        <label htmlFor="phone">phone :</label>
        <input type="tel" onBlur={formik.handleBlur} className='mb-3 form-control' onChange={formik.handleChange} value={formik.values.phone} name="phone" id="phone" />
        {formik.errors.phone &&formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
         {isLoding?<button  type='button' className='btn bg-main text-white'><i className="fa fa-spinner fa-spin"></i></button>:
          <button disabled={!(formik.dirty &&formik.isValid)} type='submit' className='btn bg-main text-white'>Register</button>
         }
         <div className='pt-2'>
         <span className='pe-1'>you already have an account?</span>
        <Link className='text-main fw-bold product-order-name' to='/login'>
         login
        </Link>
         </div>
        
      </form>
        </div>
        <div className="col-md-8">
          <img src={sigunimg} className='w-100' alt="" srcset="" />
        </div>
        
      </div>
      

    </div>

  )
}
