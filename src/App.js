import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Ceramics from './components/Ceramics/Ceramics';
import Header from './components/Header/Header';
import './App.css'
import Admin from './components/Admin/Admin';
import AdminHome from './components/AdminHome/AdminHome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app-container'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ceramics" element={<Ceramics />} />
          <Route path="/admin-login" element={<Admin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin" 
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated} >
              <AdminHome/>
            </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </div>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
}

export default App;
