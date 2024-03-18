import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter,Route,Routes}
    from "react-router-dom";
    import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import React, { useState } from 'react';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import Home from './components/Home';
import { UserContextProvider } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials=true;
function App() {

  

  

  return (

    <BrowserRouter>
    
   <UserContextProvider>
   <Toaster
  position='bottom-right'
  toastOptions={{
    duration: 3000,
    style: {
      width: '300px', // Set your desired width here
    },
  }}
/>

   <div className='bdy'>
      
   <div className="logo absolute right-20 top-8 w-36 bg-transparent text-3xl font-thin "><span className='text-4xl'>L</span>ang.<span className='text-4xl' >T</span>utor</div>
      
      <div className='footer absolute -left-100px bottom-6'>&#169; Dhruv &#x2122; , 9712306630 , <span className='lowercase font-normal'>dhruvpatel2721978@gmail.com</span></div>
      
      <Routes> 
      
          <Route path='/' element={<Login/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/signup' element={<Signup/>}/>
          
          
          <Route path='/home' element={<Home/>}/>
          
          
          

          
         

      </Routes>
      
      </div>

      <div>
             
      </div>

      </UserContextProvider>

</BrowserRouter>
  );
}

export default App;
