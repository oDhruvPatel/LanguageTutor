const LangTutor = require('../database/user');
const GermanLessons = require('../database/German');
const EnglishLessons = require('../database/English');
const HindiLessons = require('../database/Hindi');
const { default: OpenAI } = require('openai');


const lessons = 
    async (req , res)=>{

        const {id} = req.body;
        const user1 = await LangTutor.findOne({_id: id });

        if(user1) {

            res.json(user1);

        
        }

        else {res.send('Nope');}
      
      }


    const German = async(req,res)=>{

       const {level} = req.body;
       const data = await GermanLessons.findOne({level: level});

       res.json(data);

    }  


    const English = (req,res)=>{

        res.send("English...");
 
     }


     const Hindi = async(req,res)=>{

        const {level} = req.body;
        const data = await HindiLessons.findOne({level: level});
 
        res.json(data);
 
     }

        const Update = async(req,res)=>
        {

            const {id , Nextlevel} = req.body;
            
            const result = await LangTutor.updateOne(
                { _id: id }, // Filter: Find the user with the specified ID
                { $set: { level: Nextlevel } } // Update: Set the 'level' field to the new level
              );

              res.send(result);


        }


        const getUsers = async(req , res)=> {

            const users = await LangTutor.find({});
            
            res.send(users);

            
        }

        const addLesson = async (req, res) => {
           
            const lesson = req.body;

           
            
            const newlesson = await GermanLessons.create(lesson);

            if(newlesson) res.json({    

                       messege: "Level Has been added succesfully",
                       data : newlesson.level,

               });
            else res.json('Not well');
       
    
            
          };

  
              const openai =  new OpenAI({

              apiKey:"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"


              })


          const chatAi = async(req , res)=>{

              const response  = await  openai.chat.completions.create({

                  model:'gpt-3.5-turbo',
                  messages:[{"role":"user","content":"Global worming essay"}],
                  max_tokens:50
              })
            

             res.send("chat gpt is working........" + response)


          }
          
     

module.exports = {
    lessons , German , English , Hindi , Update , getUsers , addLesson , chatAi
};
