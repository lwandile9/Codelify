import React, { useState } from 'react';
import './css/Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function LoginRegister() {
  // State to toggle between login and register forms
  const [showRegister, setShowRegister] = useState(false);
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    let formErrors = {};

    // Validation logic here

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit handler for registration form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Registration form submission logic here
    }
  };

  // Login submission handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear any previous error messages

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful', data);
        // Handle successful login (e.g., save token, redirect)
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Server error. Please try again later.');
    }
  };

  // Toggle between login and register views
  const toggleForm = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <div className='FormBody'>
    <div className="wrapper">
      {/* Conditionally render login or register form based on showRegister */}
      {!showRegister ? (
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <FaLock className="icon" />
            </div>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <div className="remember-forgot">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            <button className='btn' type="submit">Login</button>
            <div className="register-link">
              <p>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-box register">
          <form onSubmit={handleSubmit}>
            {/* Registration form fields */}
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginRegister;
