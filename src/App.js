import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Ceramics from './components/Ceramics/Ceramics';
import Header from './components/Header/Header';
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ceramics" element={<Ceramics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
