import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import MajorSelection from './/../MajorSelectionDropDown';  // Import the BlockLine component

const HomePage = () => {
  const [major, setMajor] = useState('');
  const isButtonEnabled = major !== '';

  const handleMajorSelection = (selectedMajor) => {
    setMajor(selectedMajor);
  };

  return (
    <div className="container">
      <div className="green-block"></div>
      <div className="yellow-line"></div>
      <div className="title-container">
        <div className="home-page-title">GMU SCHEDTALK</div>
      </div>
      <div className="gmu-logo-container" />
      <MajorSelection onChange={handleMajorSelection} />
        <Link to="/scheduleCourse">
        <button
          className={`schedule-button ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          disabled={!isButtonEnabled}
        >
         <div className="schedule-button-text">
            SCHEDULE
          </div>
        </button>
        </Link>
        <Link to="/forum">
            <button
              className={`forum-button ${isButtonEnabled ? 'enabled' : 'disabled'}`}
              disabled={!isButtonEnabled}
            >
             <div className="schedule-button-text">
                FORUM
              </div>
            </button>
        </Link>
    </div>
  );
};
export default HomePage;
