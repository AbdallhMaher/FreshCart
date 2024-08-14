import axios from 'axios';
import {  useFormik} from 'formik'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router';
import * as Yup from 'yup'

export default function ResetPassword() {
  let baseurl = 'https://ecommerce.routemisr.com'
  let navgite = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  // const [msgError, setmsgError] = useState("")
   let myvalidation = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    newPassword: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"incorect password")
   })
  let form = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema:myvalidation,
    onSubmit: (values=>{
      resetnewPassword(values);
    })
  });
  async function resetnewPassword(val){
    setisLoading(true);
    let {data} = await axios.put(`${baseurl}/api/v1/auth/resetPassword`,val)
    setisLoading(false);
    if(data.token){
      navgite('/login');
    }
  }
  return (
    
      <div className='w-75 mx-auto'>
          <form onSubmit={form.handleSubmit}>
            <label htmlFor="email">eamil</label>
            <input type="email" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.email} name="email" id="email" className='form-control mb-3'/>
            {form.errors.email&&form.touched.email ? <div className="alert alert-danger">{form.errors.email}</div> : ""}
           
            <label htmlFor="newPassword">newPassword</label>
            <input type="password" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.newPassword} name="newPassword" id="newPassword" className='form-control mb-3 '/>
            {form.errors.newPassword&&form.touched.newPassword ? <div className="alert alert-danger">{form.errors.newPassword}</div> : ""}

             {isLoading ? <button className='btn bg-main tex-white'><i className="fa fa-spinner fa-spin"></i></button>:
             <button className='btn bg-main text-white'>uptade password</button>}
            <button  disabled={!(form.dirty &&form.isValid)} className='btn bg-main text-white'>uptade password</button>
          </form>
      </div>
   
  )
}
