
import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../context/userContext';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Progress() {
  const [completedLevels, setCompletedLevels] = useState(27);
  const totalLevels = 30; // Update this with the total number of levels

  const handleLevelCompletion = () => {
    
    setCompletedLevels((prevLevels) => Math.min(prevLevels + 1, totalLevels));
  };

  const { user } = useContext(userContext);

  return (
    <>
    <div className="container w-11/12  flex flex-col place-content-center"> 
    
     <div className="person-name flex place-content-center"> <span id='usn'> {user.name}</span>'s  Report card</div>
     
     <div className="cards"> 
     
     <div style={{ width: '100px', margin: 'auto'}}>
        <CircularProgressbar
          value={(completedLevels / totalLevels) * 100}
          text={`${completedLevels}/${totalLevels}`}
        />
      </div>
     
     </div>

    
    
    
    </div>
    </>
  )
}

export default Progress