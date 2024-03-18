import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import Reference from '../images/reference.jpg';
import axios from 'axios';
import { userContext } from '../context/userContext';
import useSound from 'use-sound';
import Sound from '../images/Sound.mp3';
import { v4 as uuidv4 } from 'uuid';
import cross from '../images/remove.png'

function Lesson() {
  const { user } = useContext(userContext);
  const [level, setLevel] = useState(1);
  const [play] = useSound(Sound);
  const [question, setQuestion] = useState(null);
  const [image, setImage] = useState('logo512.png');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedOption , setSelectedOption] = useState(null);
  const [showCorrect , setCorrect] = useState(false);
  const [opt1, setOpt1] = useState(null);
  const [opt2 , setOpt2] = useState(null);
  const [opt3 , setOpt3] = useState(null);
  const [opt4 , setOpt4] = useState(null);
  const [desc, setDesc] = useState(null);
  const [lang, setLang] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const id = user.id;
        const data = await axios.post('/level', { id: id });

        setLevel(data.data.level);
        console.log('Hii ' + data.data.language);

        const btn = document.getElementById('next');
        btn.style.backgroundColor = 'rgba(255,255,255,0.05)';

        setLang(data.data.language);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();


   

  }, [user.id]);

  const ll = async () => {

    if (lang === "english") {
      console.log("Inside English");
    }

    if (lang === "german") {

      const currentLevel = await axios.post('/german', { level: level });
      if (currentLevel) {console.log('Yess' + currentLevel);
      
      const { question, description, image, options , correctAnswer} = currentLevel.data;

  
    setOpt1(options[0]);

    setOpt2(options[1]);
    setOpt3(options[2]);
    setOpt4(options[3]);
    setCorrectAnswer(correctAnswer);

     setQuestion(question) ;
     setDesc(description);
     setImage(image);
    //  setDesc(currentLevel.data.description);
    //  setImage(currentLevel.data.image);
      
    
    }
      else console.log("Next time");
    }
    if (lang === "hindi") {

      
      const currentLevel = await axios.post('/hindi', { level: level });
      if (currentLevel) {console.log('Yess' + currentLevel);
      
      const { question, description, image, options , correctAnswer} = currentLevel.data;

  
    setOpt1(options[0]);

    setOpt2(options[1]);
    setOpt3(options[2]);
    setOpt4(options[3]);
    setCorrectAnswer(correctAnswer);

     setQuestion(question) ;
     setDesc(description);
     setImage(image);

      
    
    }
      

    }
  };

  ll();

  const previous = async () => {
    toast.error('Cannot get previous !');

    const btn = document.getElementById('prev');
    const btn1 = document.getElementById('next');
    ll();
    setSelectedOption(null);

    if (level > 1) {
      setLevel((prevLevel) => prevLevel - 1);
      btn1.style.backgroundColor = '#58cc02';
    }

    if (level === 2) {
      setLevel(1);
      const btn = document.getElementById('prev');
      btn.style.backgroundColor = 'rgba(255,255,255,0.05)';
      btn.style.border = '1px solid rgba(255,255,255,0.05)';
      btn.style.boxShadow = 'none';
    }
  };

  const next = async () => {
    setSelectedOption(null);
    toast.error('Cannot get previous !');
    const btn = document.getElementById('next');
    const btn1 = document.getElementById('prev');

    const id = user.id;

    try {
      const data = await axios.post('/level', { id: id });
      const maxLevel = data.data.level;

      if (level < maxLevel) {
        setLevel((prevLevel) => prevLevel + 1);
        btn1.style.backgroundColor = '#58cc02';
      }

      if (level === maxLevel - 1) {
        setLevel(maxLevel);
        btn.style.backgroundColor = 'rgba(255,255,255,0.05)';
        btn.style.boxShadow = 'blue';
        btn.style.border = '1px solid rgba(255,255,255,0.05)';
      }
    } catch (error) {
      console.error('Error fetching data for next:', error);
    }
  };


 

  const checkAnswer = async() => {

    const id = user.id;
    const data = await axios.post('/level', { id: id });

   

    const a = true;

    if (selectedOption === correctAnswer) {
      const correctPopup = document.getElementById('correct-popup');
      //  toast.success("Correct answer Congratulations !"); 
       setCorrect(true); 
       correctPopup.classList.add('correct-popup-active');

       await new Promise(resolve => setTimeout(() => {
        setCorrect(false);
        setSelectedOption(null);
        correctPopup.classList.remove('correct-popup-active');
        setLevel(level + 1);
        resolve(); // Resolve the promise after the timeout
      }, 7000));

      if(level > data.data.level) { 
        
        
        
        const res = axios.patch('/update' , {Nextlevel: level , id: user.id});
        console.log("Updateddddddddddddddddddddddd");
      
      
      }
      else console.log("Helloooooo");

     
       
      
      }
    else {
      //  toast.error("Answer is Wrong !");  
       const wrongPopup = document.getElementById('wrong-popup');
       wrongPopup.classList.add('wrong-popup-active');

       setTimeout(()=>{ 

        wrongPopup.classList.remove('wrong-popup-active');

        } , 1000)

        }

   
  };

  const option = (selected) => {

    setSelectedOption(selected);
    const utterance = new SpeechSynthesisUtterance(selected);
    utterance.rate = 0.5;
    speechSynthesis.speak(utterance);

    

  };

  return (
    <>
      <div className="container w-11/12">
         
      <div id="wrong-popup" className="wrong-popup fixed  flex place-content-center place-items-center"> Wrong answer .  <img src={cross} alt="Example" /></div>
         <div id="correct-popup" className="correct-popup fixed  flex place-content-center place-items-center"> Correct answer . 
         
         
         <button className="button pop-btn" onClick={() => { play(); }}>
                <span className=''>  Continue  </span>
                </button>
         
         </div>

        <div className="previous h-full">
          <div className="prev">prev</div>
          <div className="button" id='prev' onClick={() => { play(); previous(); }}><button>&#8249;</button></div>
          <div className="button mt-8" id='next' onClick={() => { play(); next(); }}><button><div className="rot">&#8249;</div></button></div>
          <div className="prev">Next</div>
        </div>

        <div className="qna-container">
          <div className="level uppercase">
            <h4>Level {level}</h4>
          </div>

          <div className="qna-wrapper">
            <div className="question">
              <div className="qus"> Que. {question} </div>
              <div className="img">
                <img src={image} alt="Reference" />
              </div>
              <div className="desc"> {desc} </div>
            </div>

            <div className="answer">
              <div className="options">
              
            {showCorrect && <div className="correct-answer"> {correctAnswer}</div>}

              <div className="chosen-answer"> Your answer :  <span className='chosn'> {selectedOption}</span></div>  

              <div className="choices"> 
              
              <div className="opt-btn" id='opt-1' onClick={() => option(opt1)}> {opt1} </div>
              <div className="opt-btn" id='opt-2' onClick={() => option(opt2)}>  {opt2} </div>
              <div className="opt-btn" id='opt-3' onClick={() => option(opt3)}>   {opt3}</div>
              <div className="opt-btn" id='opt-4' onClick={() => option(opt4)}>  {opt4}</div>
              
             </div>
              
              
              
              </div>
              <div className="btn-container">
                <button className="button chk-btn" onClick={() => { play(); checkAnswer(); }}>
                <span className='text-sm'>  Check  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;
