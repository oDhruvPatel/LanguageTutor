import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Lesson from '../components/Lesson';
import Quiz from '../components/Quiz';
import Chat from '../components/Chat';
import ProgressBar from '../components/Progress';
import lesn from '../images/blackboard.png'
import quizz from '../images/speech-bubble.png'
import chatt from '../images/chat.png'
import progress from '../images/hourglass.png'
import Progress from '../components/Progress';
import Baloons from '../images/Baloons.svg';
import add from '../images/add.png';
import edit from '../images/pencil.png';
import useSound from 'use-sound';
import Sound from '../images/Sound.mp3'
import Admin from './Admin';
import AddLessons from './AddLessons';
import EditUsers from './EditUsers';
import AddQuiz from './AddQuiz';

function Home() {
  const { user } = useContext(userContext);
  const [showHome, setHome] = useState(true);
  const [showLesson, setShowLesson] = useState(false);
  const [showQuiz, setQuiz] = useState(false);
  const [showChat, setChat] = useState(false);
  const [showProgress, setProgress] = useState(false);
  const [load , setLoad] = useState(true);
  const [isAdmin , setAdmin] = useState(false);
  const [addQuiz , setEditQuiz] = useState(false);
  const [addLessons , setEditLessons] = useState(false) ;
  const [editUses , setEcitUsers] = useState(false);

  useEffect(()=>{
        
       setTimeout( () => setLoad(false),2000);
       
       
  },[])

  const [play] = useSound(Sound);


   
  
  

  return (
    <>

    {/* <h1 className='fixed text-4xl text-white'>Helloo i will always be here </h1> */}
   
   {load ? (<div className="loading-screen">
      
          <div className="loader"></div>
        </div> ) : (

      <main>
        <div className="nav h-screen">
          <div className="name text-white">
            {!!user && <h1>Hii {user.name} ! </h1>}
          </div>
          <div className="links">
           { user.email == "Admin@gmail.com" ? <ul> <li className="text-white" onClick={()=>{setHome(false); setEcitUsers(false); setEditLessons(true); setEditQuiz(false); }}><img src={add} alt="My Image" /> Lessons</li>
           
           <li className="text-white" onClick={()=>{ setHome(false); setEcitUsers(false); setEditLessons(false); setEditQuiz(true); }}><img src={add} alt="My Image" /> Quiz</li>
           <li className="text-white" onClick={()=>{ setHome(false); setEcitUsers(true); setEditLessons(false); setEditQuiz(false); }}><img src={edit} alt="My Image" /> Users</li>
           
            </ul>
           
           
           
           : <ul> 
              <li onClick={() => {setShowLesson(true); setQuiz(false); setProgress(false); setChat(false); setHome(false);}}>  <img src={lesn} alt="My Image" /> Lessons</li>
              <li onClick={() => {setShowLesson(false); setQuiz(false); setProgress(false); setChat(true); setHome(false);}}>  <img src={chatt} alt="My Image" /> Chat.Ai</li>
              <li onClick={() => {setQuiz(true); setShowLesson(false); setProgress(false); setChat(false); setHome(false);}}><img src={quizz} alt="My Image" />Quiz</li> 
              <li onClick={() => {setShowLesson(false); setQuiz(false); setProgress(true); setChat(false); setHome(false);}}>  <img src={progress} alt="My Image" /> Progress</li>                    
            </ul>  }
          </div>
          <div className="logout">
            <Link to={'/login'}><button className='button btn' onClick={play}>Logout &rarr;</button></Link>
          </div>
        </div>

       

        <div className="section">
          {showLesson && <Lesson />}
          {showQuiz && <Quiz />}
          {showChat && <Chat />}
          {showProgress && <Progress />}

          { user.email == "Admin@gmail.com" && <Admin/>}
          {showHome &&
           <div className='content'>
           <img src={Baloons} alt="Description"/>
          <h1 className='text-3xl font-bold text-white'>
            Welcome to <span className='welcome'>Language Tutor</span> !
          </h1>
          <h4 className='p-8 text-white '>
          
          </h4> 

          </div> }
      
      {addLessons && <AddLessons/>}
      {addQuiz && <AddQuiz/>}
      {editUses && <EditUsers/>}

        </div>

      </main>

)}
    </>
  );
}

export default Home;
