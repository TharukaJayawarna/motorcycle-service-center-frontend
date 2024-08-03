import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import GenerateBill from './pages/GenerateBill';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import JobsPage from './pages/JobsPage';
import BillPage from './components/BillPage';
import Login from './components/Login';
import Registration from './components/Registration';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (e.g., token exists in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Ensure isLoggedIn state is set to false on logout
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="container mt-3">
        <Routes>
          {/* Public routes accessible to all */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={<AddJob />} />
              <Route path="/job-list" element={<JobsPage />} />
              <Route path="/generate-bill" element={<GenerateBill />} />
              <Route path="/bill" element={<BillPage />} />
              <Route path="/register" element={<Registration />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
