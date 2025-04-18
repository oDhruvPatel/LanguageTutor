
const express = require('express');
const app = express();
const myRouter = require('./router');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('body-parser');

const URL = 'mongodb://127.0.0.1:27017/LangTutor'


mongoose.connect(URL)
  .then(() => {
    console.log('Connection succesfull...');
  
  })
  .catch((error) => {
    console.error('Connection error:', error.message);
  });



app.use('/', myRouter);
app.use(cors());
app.use(express.json());
app.use(express.json({limit : '50mb',extended : true}))
app.use(express.urlencoded({limit : '50mb',extended : true}))

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
