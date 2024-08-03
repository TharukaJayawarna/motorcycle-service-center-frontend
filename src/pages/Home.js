import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const homeContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative', // Added to position the logout button
    };

    const contentStyle = {
        maxWidth: '1200px',
        width: '100%',
        padding: '20px',
        textAlign: 'center',
    };

    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '20px 0',
        color: '#343a40',
    };

    const descriptionStyle = {
        fontSize: '18px',
        margin: '10px 0 40px',
        color: '#6c757d',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    };

    const cardStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
        transition: 'transform 0.2s',
    };

    const cardTitleStyle = {
        fontSize: '24px',
        margin: '10px 0',
        color: '#007bff',
    };

    const cardDescriptionStyle = {
        fontSize: '16px',
        margin: '10px 0 20px',
        color: '#6c757d',
    };

    const linkButtonStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        margin: '10px',
    };

    const linkButtonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const logoutButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#dc3545',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={homeContainerStyle}>
            <button
                onClick={handleLogout}
                style={logoutButtonStyle}
            >
                Logout
            </button>
            <div style={contentStyle}>
                <h1 style={titleStyle}>Motorcycle Service Center Billing System</h1>
                <p style={descriptionStyle}>Manage your motorcycle service center efficiently and effectively.</p>
                <div style={cardContainerStyle}>
                    <div style={cardStyle}>
                        <h2 style={cardTitleStyle}>Add Job</h2>
                        <p style={cardDescriptionStyle}>Easily add new jobs and services to your system.</p>
                        <Link
                            to="/add-job"
                            style={linkButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkButtonHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = linkButtonStyle.backgroundColor}
                        >
                            Add Job
                        </Link>
                    </div>
                    <div style={cardStyle}>
                        <h2 style={cardTitleStyle}>Generate Bill</h2>
                        <p style={cardDescriptionStyle}>Generate and print bills for completed jobs.</p>
                        <Link
                            to="/generate-bill"
                            style={linkButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkButtonHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = linkButtonStyle.backgroundColor}
                        >
                            Generate Bill
                        </Link>
                    </div>
                    <div style={cardStyle}>
                        <h2 style={cardTitleStyle}>Job List</h2>
                        <p style={cardDescriptionStyle}>View and manage all the jobs and services.</p>
                        <Link
                            to="/job-list"
                            style={linkButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkButtonHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = linkButtonStyle.backgroundColor}
                        >
                            View Jobs
                        </Link>
                    </div>
                    <div style={cardStyle}>
                        <h2 style={cardTitleStyle}>Add New User</h2>
                        <p style={cardDescriptionStyle}>Add a new user to the system.</p>
                        <Link
                            to="/register"
                            style={linkButtonStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkButtonHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = linkButtonStyle.backgroundColor}
                        >
                            Add User
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
