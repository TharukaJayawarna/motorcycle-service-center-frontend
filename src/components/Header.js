// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Motorcycle Service Center</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-job">Add Job</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/generate-bill">Generate Bill</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/job-list">Job List</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
