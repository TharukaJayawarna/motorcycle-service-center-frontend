// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Import the home icon from react-icons/fa

const Header = () => {
    return (
        <nav style={{ backgroundColor: '#343a40', padding: '10px 20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>
                    <FaHome style={{ marginRight: '10px', fontSize: '24px' }} /> {/* Home icon with margin */}
                    Tharuka Motor Works {/* Text for the business name */}
                </Link>
                <div>
                    <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                        <li style={{ margin: '0 10px' }}>
                            <Link
                                to="/add-job"
                                style={linkStyle}
                                onMouseOver={(e) => (e.target.style.color = '#17a2b8')}
                                onMouseOut={(e) => (e.target.style.color = '#fff')}
                            >
                                Add Job
                            </Link>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <Link
                                to="/generate-bill"
                                style={linkStyle}
                                onMouseOver={(e) => (e.target.style.color = '#17a2b8')}
                                onMouseOut={(e) => (e.target.style.color = '#fff')}
                            >
                                Generate Bill
                            </Link>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <Link
                                to="/job-list"
                                style={linkStyle}
                                onMouseOver={(e) => (e.target.style.color = '#17a2b8')}
                                onMouseOut={(e) => (e.target.style.color = '#fff')}
                            >
                                Job List
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',
    transition: 'color 0.3s',
};

export default Header;
