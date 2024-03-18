const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const LangTutor = require('../server/database/user');
const {hashPassword , comparePassword} = require( '../server/authentication/auth');
const {lessons , German , English , Hindi , Update , getUsers , addLesson , chatAi} = require('./routes/Router');
const GermanLessons = require('../server/database/German');
const EnglishLessons = require('../server/database/English');
const HindiLessons = require('../server/database/Hindi');

const SECRET = 'kjbsdfjwoeiur8t6as'

router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

router.use(cors({

  credentials:true ,
  origin: 'http://localhost:3000'
}));



router.get('/', (req, res) => {
  res.send('Home page !');
});


router.post('/signup', async (req, res) => {

  const data = JSON.stringify(req.body);
   
  const {username , password , email , language} = req.body;

  try { 

    if(!username)
    {
      return res.json({
        error: 'Please Enter the name'
      })
    };

    if(!password ||  password.length < 8)
    {
      return res.json({
        error: 'Enter password and should be at least 8 character long'
      })
    };

    if(!language)
    {
      return res.json({
        error: 'Please Select the language'
      })
    };

    if(!email)
    {
      return res.json({
        error: 'Please Enter the Email !'
      })
    };


    const exist = await LangTutor.findOne({email});
    
    if(exist)
    { 
          
      return res.json({
        error: 'Email already exist !'
      })

     }

     const hashedPassword = await hashPassword(password);

    const userData= {
      username: username,
      email: email,
      password: hashedPassword,
      language: language,
      level: 1
    };
    // Insert data into the LangTutor collection
   const loginuser = await LangTutor.create(userData);

    return res.json(loginuser);


   } 
  
  catch (error) { console.error("An error occurred:", error); }
});


router.post('/login', async (req, res) => {

const {email , password} = req.body;

try {

  const user = await LangTutor.findOne({email});

  if(!user)
  {
    return res.json({

      error: 'User  does not exist! please Signup first',
      da: email,
      password: password,

    })
     
  }

   const match = await comparePassword(password, user.password);

   if(match){{
    jwt.sign(
      { email: user.email, id: user._id, name: user.username , level: user.level},
      SECRET,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }

        res.cookie('token' , token);

        return res.json({
          message: 'Login successful',
        });
      }
    );
  }   

   }
   else{
    
     
    return res.json({
      error : 'Password did not match !'})

   }
   


  
} catch (error) {
  console.log(error);
}


});

// Make sure to install the 'jsonwebtoken' package

router.get('/profile', (req, res) => {
 


  const token = req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).trim().substring('token='.length);

   
  if(token)
  {
    jwt.verify(token , SECRET , {} , (err , user)=>{
        
      if(err) throw err
      else res.json(user)


    })
  }


  
     
  


});

router.post('/level' , lessons);

router.post('/german' , German);

router.post('/english' , English);

router.post('/hindi' , Hindi);

router.patch('/update' , Update);

router.get('/getUsers' , getUsers);

router.post('/addLessons' , addLesson);

router.get('/chat-ai' , chatAi);




module.exports = router;
