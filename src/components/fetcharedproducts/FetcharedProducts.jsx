import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ProductContext } from '../../context/ProductContext';
import ProductCart from '../productcart/ProductCart';
export default function FetcharedProducts() {
  let baseurl = 'https://ecommerce.routemisr.com';
  let {getAllProducts} = useContext(ProductContext);
  let [Products, setProducts] = useState([]);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);


  function getOut() {
    localStorage.removeItem('userToken');
    navigate('/');
}


  async function get(page =1) {
    setIsLoading(true);
    let response= await getAllProducts(`limit=18&page=${page}`);    
    if (response?.data.results >0) {
      setProducts(response?.data?.data);
      setNumberOfPages(response?.data?.metadata?.numberOfPages || 1);
      setCurrentPage(response?.data?.metadata?.currentPage || 1);
      
    }else{
     if (response?.response?.data?.message == 'Expired Token. please login again') {
      getOut();
     }
    }
    setIsLoading(false);  
  }

  useEffect(() => {
    get(currentPage);
  }, [currentPage]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    const filtered = Products.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase()) ||
      product.category.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length === 0 && value !== '') {
      toast.error('No matching products found', { duration: 2000 });
    }
  };

  const filteredProducts = Products.filter(product =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= numberOfPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="my-3 w-75 mx-auto">
        <input
          type="text"
          placeholder="Search by Name or Category"
          className="form-control"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>

      <div className='row'>
        {isLoading ? 
          <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div> 
        : 
          <>
            {filteredProducts.map((product) => {
              return (
                <ProductCart key={product.id} product={product}></ProductCart>
              );
            })}
          </>
        }
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center  mt-5">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link custom-pagination" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(numberOfPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link custom-pagination" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
            <button className="page-link custom-pagination" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
