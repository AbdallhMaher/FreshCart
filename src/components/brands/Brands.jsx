import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import {Helmet} from "react-helmet";
import { ProductContext } from '../../context/ProductContext';
import { useParams } from 'react-router';
import BrandProduct from '../brandproduct/BrandProduct';

export default function Brands() {
  let baseurl ='https://ecommerce.routemisr.com'
  const [Brands, setBrands] = useState();
  const [isLoading, setisLoading] = useState(false);
  let {getBrandDetails} =useContext(ProductContext);
  let params =useParams();

 async function getDetailsOfBrands(){
  setisLoading(true)
    let response = await getBrandDetails(params?.id)
    console.log(response);
    if (response?.data !==null) {
      console.log(response);
      setBrands(response?.data?.data)
    }
     setisLoading(false)
  }
  useEffect ( ()=> {
    getDetailsOfBrands();
  },[])
  return (
    <div className="container">
        <Helmet>
                
                <title>{Brands?.name}</title>
                
            </Helmet>
    <div className="row d-flex justify-content-evenly mt-3">
    {isLoading? 
    <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
    :<>

    <div className="col-md-3 col-11 bg-dark sahdow-main card" key={Brands?._id}>
     <img className='w-100 pt-2' src={Brands?.image} alt="" />
     <h3 className='text-main fw-bold pt-2'>{Brands?.name}</h3>
     <div className="d-flex justify-content-between pb-2">
          <span className='lead text-muted fs-5'><i className="fa-regular fa-calendar-days text-warning pe-1"></i>{Brands?.createdAt?.slice(0,10)}</span>
          <span className='lead text-muted  fs-5'><i className="fa-regular fa-clock text-warning pe-1"></i>{Brands?.createdAt?.slice(11,16)}</span>
     </div>
  </div>
  <BrandProduct brandId={params?.id}/>

    </>}
        
      </div>
    
      </div>
  )
}
