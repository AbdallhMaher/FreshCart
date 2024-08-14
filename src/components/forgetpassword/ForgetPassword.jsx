import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
// import resetimg from '../../assets/forgetpass.png'
export default function ForgetPassword() {
  let baseurl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate();
  const [mesgError, setmesgError] = useState("")
  let [Code, setCode] = useState(true)
  let myValdiation = Yup.object({
    email: Yup.string().required("email is required").email("email is in valid")
  })
  let form1 = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: myValdiation,
    onSubmit: (values => {
      console.log(values);
      forgetpasswordApi(values)
    })
  });
  let form2 = useFormik({
    initialValues: {
      resetCode:""
    },
    // validationSchema: myValdiation,
    onSubmit: (values => {
      console.log(values);
       resetcodeApi(values);
    })
  });
  async function forgetpasswordApi(val) {
    let { data } = await axios.post(`${baseurl}/api/v1/auth/forgotPasswords`, val)
    console.log(data);
    if (data.statusMsg === "success") {
      setCode(false)
    }
  }
  async function resetcodeApi(value) {
    let { data } = await axios.post(`${baseurl}/api/v1/auth/verifyResetCode`, value).catch((err) => {

      setmesgError(`${err.response.data.statusMsg}! :${err.response.data.message} `)

    })
    console.log(data);
    if(data.status == "Success"){
      navg('/resetPassword')
    }

  }

  return (
    <div className='mx-auto py-5 w-75'>
      {Code ? 
      <div className="row d-flex align-items-center ">
        <div className="col-md-8 mx-auto sahdow-main p-3">
        <form onSubmit={form1.handleSubmit}>
        <label htmlFor='email' >Email :</label>
        <input onBlur={form1.handleBlur} onChange={form1.handleChange} value={form1.values.email} name='email' type='email' id='email' className='form-control'></input>
        {form1.errors.email && form1.touched.email ? <div className="alert alert-danger">{form1.errors.email}</div> : ""}
        <br />
        <button className='btn bg-main text-white'>send message</button>
      </form> 
        </div>
        {/* <div className="col-md-8">
          <img className='w-50' src={resetimg} alt=""  />
        </div> */}
      </div>
      
      : 
      <div className='col-md-8 mx-auto sahdow-main p-3'>
          <form onSubmit={form2.handleSubmit}>
        <label htmlFor='resetcode' >resetCode :</label>
        <input type="text" onBlur={form2.handleBlur} onChange={form2.handleChange} value={form2.values.resetCode} name='resetCode' id='resetCode' className='form-control'></input>
        {mesgError.length > 0 ? <div className="alert alert-danger">
          {mesgError}
        </div> : null}
        {/* {form1.errors.resetcode&&form1.touched.resetcode ? <div className="alert alert-danger">{form1.errors.resetcode}</div> : ""} */}
        <br />
        <button className='btn bg-main text-white'>verify Code</button>
      </form>
      </div>
    
      }
    </div>

  )
}
