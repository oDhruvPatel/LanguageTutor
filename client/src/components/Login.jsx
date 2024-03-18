// LoginForm.js

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom'
import axios from 'axios';
import logo from 	 '../images/logo.png';
const LoginForm = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
     

    try{
      const {data} = await axios.post('/login' , {email , password});

      if(data.error)
      {
        toast.error(data.error);
      }

      else
      {

     
         navigate('/home');
         window.location.reload();
         toast.success("Logged in Successfully !");
      }
    }
    catch(err){ 
       console.log(err);
    }

  };



  return (
    <div className="cont-frm round flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
     
      <div className="max-w-md w-full space-y-8">
      <div className="welcome text-center font-bold text-xl ">Learn Anywhere, Speak Everywhere.</div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600 login">L O G I N</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="lable">Email</div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=""   placeholder=""
            />
          </div>
          <div>
            <div className="lable">Password</div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""   placeholder=""
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="btn-reg"
            >
              Login
            </button>
          </div>
         </form>

         <h4 className='text-center text-white fontt'>Not registered yet ? <button className='text-indigo-600'><Link to={'/signup'}>Click here</Link></button></h4>

      </div>
    </div>
  );
};

export default LoginForm;
