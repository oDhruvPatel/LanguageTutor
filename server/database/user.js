const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the User model    

const userSchema = new Schema({

    username: String ,

    email : {
        type: String ,
        unique: true
    },

    password : String,

    language : String,

    level: Number


})


const LangTutor = mongoose.model('User' , userSchema);

module.exports = LangTutor;
