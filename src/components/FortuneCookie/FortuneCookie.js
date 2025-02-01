import React, { useState, useEffect } from 'react';
import './FortuneCookie.css'; 

const FortuneCookie = ({showPopup, setShowPopup}) => {
  const [fortune, setFortune] = useState('');

  useEffect(() => {
    const fetchFortune = async () => {
      try {
        const response = await fetch('https://aphorismcookie.herokuapp.com');
        const data = await response.text();
        setFortune(JSON.parse(data));
        console.log(JSON.parse(data))
      } catch (error) {
        console.error("Error fetching fortune:", error);
      }
    };
    fetchFortune();
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="fortune-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
            <h2>Your Fortune Cookie Says:</h2>
            <p>{fortune.data.message}</p>
            <p>Thank you! You got cups!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FortuneCookie;