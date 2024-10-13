import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import github from '../../svgs/github.svg';
import coffee from '../../svgs/coffee.svg';
import linkedin from '../../svgs/linkedin.svg';
import hamburger from '../../svgs/hamburger.svg';
import instagram from '../../svgs/instagram.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // React Router's hook for navigation
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 
  // Handle scroll effect for opacity
  useEffect(() => {
    const handleScroll = () => {
      var header = document.querySelector('header');
      var scrollPosition = window.scrollY;

      // Calculate opacity based on scroll position
      var opacity = Math.min(0.5, scrollPosition / 500);

      // Update the opacity of the header
      header.style.backgroundColor = 'rgba(244, 239, 194, ' + opacity + ')';
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        setIsOpen(false); // Close the menu if clicked outside
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  return (
    <header>
      <nav>
        <div onClick={() => navigate('/')}  className="logo">
          <h1>Free Sticker</h1>
        </div>
        <div>
          <h5 onClick={() => navigate('/ceramics')} className="nav-button">
            Free Ceramics
          </h5>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <img src={hamburger} alt="Menu" />
        </div>
        <div ref={dropdownRef}> 
          {isOpen ? <div className='triangle'></div> : ""}
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li className="icon-container">
              <a
                href="https://www.instagram.com/total_willcall/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="icon" src={instagram} alt="instagram" />
              </a>
            </li>
            <li className="icon-container">
              <a
                href="https://www.buymeacoffee.com/kittyturbo"
                target="_blank"
                rel="noreferrer"
              >
                <img className="icon" src={coffee} alt="coffee" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
