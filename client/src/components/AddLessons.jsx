import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddLessons = () => {
  const [formData, setFormData] = useState({
    level: 1,
    image: null, // Change to null as we'll store the file object
    question: "",
    description: "",
    correctAnswer: "",
    options: ["", "", "", ""],
    language: "Hindi" // Updated field name and default value
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "options") {
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else if (name === "image") {
      // Convert image file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
       
   const resp = await axios.post('addLessons' , {

    level:  formData.level,
    image: formData.image ,
    question: formData.question,
    description: formData.description,
    correctAnswer: formData.correctAnswer,
    options: formData.options,
    language: formData.language
   });
    
   if(resp){ 
    
    
    toast.success(resp.data.messege);
    
    setFormData({


      level: 1,
    image: null, // Change to null as we'll store the file object
    question: "",
    description: "",
    correctAnswer: "",
    options: ["", "", "", ""],
    language: "Hindi"


    


    })
   

   }

  };

  return (
    <div className="lesn-frm w-3/4 mx-auto my-8 p-4 border border-gray-300 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Level</label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 font-bold mb-2">Image</label>
            <input
              type="file" // Change input type to "file"
              name="image"
              onChange={handleChange} // Handle file change event
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 font-bold mb-2">Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 font-bold mb-2">Correct Answer</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          {formData.options.map((option, index) => (
            <div key={index} className="w-1/2 flex flex-col mr-2">
              <label className="block text-gray-700 font-bold md-2">Option {index + 1}</label>
              <input
                type="text"
                name="options"
                value={option}
                onChange={(e) => handleChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Hindi">Hindi</option>
            <option value="German">German</option>
          </select>
        </div>
       
        <button
        id='lsn-btn'
          type="submit"
          className="btn-reg"
        >
          Add new Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLessons;
