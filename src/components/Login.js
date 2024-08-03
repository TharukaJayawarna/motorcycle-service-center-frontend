import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5001/api/login', { email, password });

      // Handle successful login response
      localStorage.setItem('token', res.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: 'You have successfully logged in.',
      });

      // Redirect to home page after successful login
      navigate('/'); // Replace '/' with the path to your home page route
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to login. Please try again.';
      if (error.response && error.response.status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleLogin}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
