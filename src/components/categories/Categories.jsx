import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import CategoryProduct from '../categoryproduct/CategoryProduct';

export default function Categories() {
  let baseurl = 'https://ecommerce.routemisr.com';
  const [Category, setCategory] = useState([]);
  const [isLoading, setisLoading] = useState([]);
  let {getCategoryDetails} =useContext(ProductContext)
  let params = useParams();
  // console.log(params.id);
  
  async function get(){
    setisLoading(true)
  let response= await  getCategoryDetails(params?.id)
  
  if (response?.data !==null ) {
    setCategory(response?.data?.data)
    // console.log(Category);
  }
  setisLoading(false)
  }
  useEffect(() => {
    get();
  }, [])
  

  return (
    <div className='container'>
      <Helmet>
                
                <title>{Category?.name}</title>
                
            </Helmet>
      <div className="row d-flex justify-content-evenly mt-3">
        {isLoading?
        <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
        :
        <>
          <div key={Category._id} className="col-11 col-md-3 bg-dark sahdow-main card">
              <img className='w-100 pt-2' height={300} src={Category.image} alt=""/>
              <h3 className='text-main fw-bold pt-2'>{Category.name}</h3>
              <div className="d-flex justify-content-between pb-2">
              <span className='lead text-muted fs-5'><i className="fa-regular fa-calendar-days text-warning pe-1"></i>{Category?.createdAt?.slice(0,10)}</span>
              <span className='lead text-muted  fs-5'><i className="fa-regular fa-clock text-warning pe-1"></i>{Category?.createdAt?.slice(11,16)}</span>
              </div>
          </div>
          <CategoryProduct categoryId={params.id}/>


        
        </>
        }
      </div>

    </div>
  )
}
