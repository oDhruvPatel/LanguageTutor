// LoginForm.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from 	 '../images/logo.png';
import {toast} from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
  
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [language, setLanguage] = useState('');

  const handleLogin = async() => {


              
    console.log("in");
 

      try{
      const {data} = await axios.post('/signup' , {username , email , password , language});

      if(data.error)
      {
        toast.error(data.error);
      }

     else{
       
        setUsername('');
        setEmail('');
        setPassword('');
        setLanguage('');
        toast.success(' Data has been recorded successfully !')
        navigate('/login');
        // window.location.reload();

     }

    }
    catch{
      console.log('error has occured');
    }

  };
  
  return (

       <div className="round cont-frm center flex items-center justify-cente py-12 px-4 sm:px-6 lg:px-8 ">
      
      
      <div className=" inr">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold login">S I G N U P</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
           <div className="lable">Username</div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=""
              placeholder=""
            />
      
      

          </div>
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
              className=""      placeholder=""
            />
          </div>
     
          <div>
          <label htmlFor="language" className="sr-only">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className=""
          >
            <option value="" disabled>what language you want to Learn ?</option>
            <option value="german">German</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hindi"></option>
          </select>
        </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="btn-reg"
            >
              Sign up
            </button>
          </div>
         </form>

         <h4 className='text-center text-white fontt mt-7'>Alredy have account ? <button className='text-indigo-600'><Link to={'/login'}>Click here</Link></button></h4>

      </div>
    </div>
    

  );
};

export default LoginForm;
