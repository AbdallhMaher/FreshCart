import React, { useContext, useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { ProductContext } from '../../context/ProductContext';
import ProductCart from '../productcart/ProductCart';
import empty from '../../assets/NoProducts.svg';
import ResponsivePagination from 'react-responsive-pagination';
export default function Products() {
  let {getAllProducts,Category,setCategory,getAllCategories} = useContext(ProductContext);
  const [isLoading, setisLoading] = useState(false);
  const [Products, setProducts] = useState([])
  const [numOfPages, setnumOfPages] = useState(1)
  const [currentPage, setcurrentPage] = useState(1)
  const [filterOption, setFilterOption] = useState('');
  const [selectedFilteredOption, setSelectedFilteredOption] = useState('select option');
  const [categoryOption, setCategoryOption] = useState('');
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('select option');
  const sortOptions = {
      '&sort=': 'select option',
      '&sort=price': 'Lowest Price',
      '&sort=-price': 'Highest Price',
      '&sort=ratingsAverage': 'Lowest Rating',
      '&sort=-ratingsAverage': 'Highest Rating',
      '&sort=-sold': 'Best Seller',
  };
  const categoryOptions = {
      'all': 'All',
  }
  async function getCategory(){
    let response = await getAllCategories()    
    if (response?.data.results> 0) {
     setCategory(response?.data.data)
    }
  }

  async function getProducts(filter = '', category = '') {
    setisLoading(true)
    let response = await getAllProducts(`page=${currentPage}&limit=24${filter}${category}`)
    if (response?.data?.results>0) {
      setProducts(response?.data?.data)
      setnumOfPages(response?.data?.metadata?.numberOfPages)
    }else{
      setProducts([])
      setnumOfPages(1)
    }
    setisLoading(false)
  }
  useEffect(() => {
  getProducts(filterOption, categoryOption)
  getCategory()

  }, [currentPage])
  
  function handleSortSelection(e) {
    setSelectedFilteredOption(sortOptions[e.target.value]);
    setFilterOption(e.target.value)
    getProducts(e.target.value, categoryOption)
}

function handleCategorySelection(e) {
  Category?.forEach(category => {
        categoryOptions['&category[in]='+category?._id] = category.name;
    });
    setSelectedCategoryOption(categoryOptions[e.target.value]);
    setCategoryOption(e.target.value === 'all' ? '' : e.target.value)
    getProducts(filterOption, e.target.value === 'all' ? '' : e.target.value)
}

function resetAll(){
    setSelectedFilteredOption('select option');
    setFilterOption('')
    setSelectedCategoryOption('select option')
    setCategoryOption('');
    getProducts()
}



  function handlePageChange(page) {
    setcurrentPage(page);
  }
  if (currentPage > numOfPages) {
    setcurrentPage(1);
  }
  
  return (
    <>
      <Helmet>
                
                <title>product</title>
                
      </Helmet>
      {isLoading? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div>
      :<>
     <div className="row py-5">
            <div className='row d-flex w-75 mx-auto '>
                <h2 className='col-md-4 fw-simibold' >
                    <span className='cursor-pointer' onClick={resetAll}>All Products</span>
                </h2>
                <div className='col-md-8'>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center mb-2'>
                            <h5 className='my-0 mx-2'>Category</h5>
                            <div className="dropdown" >
                                <select className="form-control" onChange={handleCategorySelection} >
                                    <option value="">{selectedCategoryOption}</option>
                                    <option value="all">All</option>
                                    {Category?.map((category) =>
                                        <option key={category?._id} value={`&category[in]=${category?._id}`} h={category?.name} >{category?.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6 d-flex align-items-center mb-2'>
                            <h5 className='my-0 mx-2'>Sort by</h5>
                            <div className="dropdown" >
                                <select className="form-control" onChange={handleSortSelection} >
                                    <option value="">{selectedFilteredOption}</option>
                                    <option value="&sort=price">Lowest Price</option>
                                    <option value="&sort=-price">Highest Price</option>
                                    <option value="&sort=ratingsAverage">Lowest Rating</option>
                                    <option value="&sort=-ratingsAverage">Highest Rating</option>
                                    <option value="&sort=-sold">Best Seller</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 row my-5 sahdow-main">
                {Products?.length>0 ? Products?.map((product) => <ProductCart key={product?._id} product={product} />): 
            <div className='d-flex justify-content-center pt-5 pb-2'>
                <img className='w-50' src={empty} alt="" />
            </div>
            }
                </div>

            </div>

            


            {numOfPages > 1? <ResponsivePagination
                total={numOfPages}
                current={currentPage}
                onPageChange={page => handlePageChange(page)}
                maxWidth={''}
                extraClassName='justify-content-center'
            />: null}
            
        </div>

      </>}
    </>
  )
}
