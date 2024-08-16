import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { CartContext } from '../../context/CartContext'
import { ProductContext } from '../../context/ProductContext';

export default function Navbar({userData ,logout}) {
  let {numOfItem,numOfFavoriteItems} = useContext(CartContext);
  let {Category} =useContext(ProductContext);
  const [isScorlled, setisScorlled] = useState(false)
  useEffect(() => {
    const handleScroll =()=>{
       if (window.scrollY>50) {
        setisScorlled(true)
       }
       else {setisScorlled(false)}
    }
    window.addEventListener('scroll',handleScroll)

    return ()=> window.removeEventListener('scroll',handleScroll)
  }, [])

  
  
  

 return (
    <nav className={`navbar navbar-dark navbar-expand-sm  sticky-top ${isScorlled?'navbar-scrolled':''} `}>
  <div className="container-fluid">
    <Link className="navbar-brand" ><img src={logo} className='w-100'></img></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userData !==null? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
         <NavLink className={({isActive})=> isActive? "nav-link active" : "nav-link"} to=''>Home</NavLink>
        </li>
       
        <li className="nav-item">
         <NavLink className={({isActive})=> isActive? "nav-link active" : "nav-link"} to='products'>Products</NavLink>
        </li>
      
        <li className="nav-item">
         <NavLink className={({isActive})=> isActive? "nav-link active" : "nav-link"} to='allorders'>Orders</NavLink>
        </li>
        
       </ul>: null}
     
       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className="nav-item d-flex align-items-center">
        <a href="http://www.facebook.com/aljnrlabdullah.aljnrlabdullah" target='_blank'><i className="fa-brands mx-2 fa-facebook "></i> </a>
        <a href="http://www.linkedin.com//in/abdullah-maher-21b43a2a9/" target='_blank'><i className="fa-brands mx-2 fa-linkedin"></i>  </a>
        <a href="http://www.instagram.com/abdllah_maher00/" target='_blank'><i className="fa-brands mx-2 fa-instagram"></i> </a> 
         </li>

        {userData ==null?   <> 
        
        <li className="nav-item">
        <NavLink className={({isActive})=> isActive? "nav-link active" : "nav-link"} to='login'>Login</NavLink>
       </li>
       <li className="nav-item">
        <NavLink className={({isActive})=> isActive? "nav-link active" : "nav-link"} to='register'>Register</NavLink>
       </li>
       </> :<>
       <li className="nav-item position-relative">
         <NavLink className={({isActive})=> isActive? "nav-link active px-2" : "nav-link px-2"} to='wishlist'>
          <i className='fa-solid fa-heart fa-2x heart'></i>
         <span className='badge position-absolute top-0 end-0 bg-heart text-white'>{numOfFavoriteItems}</span></NavLink>
        </li>
       <li className="nav-item position-relative">
         <NavLink className={({isActive})=> isActive? "nav-link active px-2" : "nav-link px-2"} to='cart'>
          <i className='fas fa-shopping-cart fa-2x text-main '></i>
         <span className='badge position-absolute top-0 end-0 bg-main text-white'>{numOfItem}</span></NavLink>
        </li>
      
       <li className="nav-item">
         <span onClick={logout} className="nav-link cursor-pointer" >Logout</span>
        </li>
        </>}
        </ul>
      
    </div>
  </div>
</nav>
  )
}
