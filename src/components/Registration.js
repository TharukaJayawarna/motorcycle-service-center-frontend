import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/register', {
        name,
        email,
        password,
      });

      // Optionally handle success response
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'You have successfully registered. Please login.',
      });

      // Redirect to login page after registration
      navigate('/login');

      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Failed to register. Please try again.';
      if (error.response && error.response.status === 400) {
        errorMessage = 'Email is already taken.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleRegister}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Register</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '3px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Registration;
