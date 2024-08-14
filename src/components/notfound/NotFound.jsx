import React from 'react'
import {Helmet} from "react-helmet";
import errorphoto from "../../assets/error.svg"
export default function NotFound() {
  return (
    <div className='text-center'>
      <Helmet>
        <title> Not found</title>
      </Helmet>
      <img src={errorphoto} alt="error 404" className='w-50' />
    </div>
  )
}
