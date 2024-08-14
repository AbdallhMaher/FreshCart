import React from 'react'
import {  Outlet, useNavigate } from 'react-router'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'


export default function Layout({userData , setUserData}) {
 let  navigate = useNavigate();
 function logout(){
  localStorage.removeItem('userToken')
  setUserData(null);
  navigate('/login')
 }
  return (
    <div>
    <Navbar userData ={userData}  logout={logout}></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}
