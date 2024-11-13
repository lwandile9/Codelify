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

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[!@#$%^&*(),.?":{}|<>].*\d$/;

  const validateForm = () => {
    let formErrors = {};

    // Name validation
    if (!name.trim()) {
      formErrors.name = 'Name is required';
    } else if (name.length < 3) {
      formErrors.name = 'Name must be at least 3 characters long';
    }

    // Email validation
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      formErrors.password = 'Password must start with a special character and end with a number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit handler for registration form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully');
      // Process the form submission (e.g., send data to the backend)
    } else {
      console.log('Form has errors');
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
          <form>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUserAlt className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
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
            <h1>Register</h1>
            <div className="input-box">
              <input 
                type="text" 
                placeholder="Username" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <FaUserAlt className="icon" />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div className="input-box">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <MdEmail className="icon" />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div className="input-box">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              <FaLock className="icon" />
              {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>Already have an account? <a href="#" onClick={toggleForm}>Login</a></p>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default LoginRegister;
