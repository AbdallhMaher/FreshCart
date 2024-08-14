import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let ProductContext = createContext();

export function ProductContextProvider(props){
  const [Category, setCategory] = useState([])
  
  let baseurl ='https://ecommerce.routemisr.com'
  let headers = {
   token:localStorage.getItem('userToken')
  }

   function getAllProducts(fields = '') {
    return axios.get(`${baseurl}/api/v1/products?${fields}`)
     .then((response)=>response)
     .catch((error)=>error);
  }
   function getProductsDetails(ProductId) {
    return  axios.get(`${baseurl}/api/v1/products/${ProductId}`)
    .then((response)=>response)
    .catch((error)=>error)
  }
  function getProductInCustomList(id,listName) {
    return axios.get(`${baseurl}/api/v1/products?${listName}=${id}`)
    .then((response)=>response)
    .catch((error)=>error)
  }
 function getAllCategories() {
  return  axios.get(`${baseurl}/api/v1/categories?limit=100`)
  .then((response)=>response)
  .catch((error)=>error)
}
 function getCategoryDetails(categoryId) {
  return  axios.get(`${baseurl}/api/v1/categories/${categoryId}`)
  .then((response)=>response)
  .catch((error)=>error)
}
 function getSubcategoriesInCategory(categoryId) {
  return  axios.get(`${baseurl}/api/v1/categories/${categoryId}/subcategories`)
  .then((response)=>response)
  .catch((error)=>error)
}
 function getBrands() {
  return  axios.get(`${baseurl}/api/v1/brands`)
  .then((response)=>response)
  .catch((error)=>error);
}
 function getBrandDetails(brandId) {
  return  axios.get(`${baseurl}/api/v1/brands/${brandId}`)
  .then((response)=>response)
  .catch((error)=>error);
}
  


return <ProductContext.Provider value={{getAllProducts,getProductsDetails,getAllCategories,getCategoryDetails,getSubcategoriesInCategory,getBrands,getBrandDetails,Category,setCategory,getProductInCustomList}}>
    {props.children}
</ProductContext.Provider>
}