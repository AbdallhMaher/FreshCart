import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { useNavigate } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';
import ProductCart from '../productcart/ProductCart';

export default function BrandProduct({brandId}) {
  const [isLoading, setisLoading] = useState()
  let {getProductInCustomList} =useContext(ProductContext);
  const [products, setProducts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let navigate = useNavigate();
    function getOut() {
        localStorage.removeItem('userToken');
        navigate('/');
    }
    async function getProductInBrand(brandId) {
      setisLoading(true)
      let response = await getProductInCustomList(brandId,'brand')
      if (response?.data?.results >0) {
        setProducts(response?.data?.data)
        setTotalPages(response?.data?.metadata?.numberOfPages)
        console.log(totalPages);
        
      }
      else {
        if (response?.response?.data?.message === 'Expired Token. please login again') getOut();
        else{
            setProducts(null);
            setTotalPages(1);
        }
    }
    setisLoading(false)      
    }
  useEffect(() => {
    getProductInBrand(brandId);
  }, [])
  function handlePageChange(page) {
    setCurrentPage(page);
}
if(currentPage > totalPages) setCurrentPage(1)

  return (
    <div className='row my-4'>
    {isLoading?
      <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
      :<>
      {products?.map((product)=><ProductCart key={product._id} product={product}/>)}
      
      {totalPages > 1 ?<ResponsivePagination
              total={totalPages}
              current={currentPage}
              onPageChange={page => handlePageChange(page)}
              maxWidth={''}
              extraClassName='justify-content-center'
          />:''}
      </>}
  </div>
  )
}
