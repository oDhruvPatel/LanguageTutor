const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Define the User model    

const userSchema = new Schema({

    level: Number,
    image: String,
    question: String,
    description: String,
    correctAnswer: String,
    options: [String],
    status:String
    
})


const English = mongoose.model('English' , userSchema);

module.exports = English;
