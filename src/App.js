// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import GenerateBill from './pages/GenerateBill';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import JobsPage from './pages/JobsPage';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container mt-3">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/add-job" element={<AddJob />} />
                    <Route path="/job-list" element={<JobsPage />}/>
                    <Route path="/generate-bill" element={<GenerateBill />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;