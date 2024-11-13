import React, { useState } from 'react';
import './css/Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function LoginRegister() {
  // State to toggle between login and register forms
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

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

  // Open modal for forgot password
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
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
                <a href="#" onClick={openModal}>Forgot password?</a>
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

      {/* Modal for Forgot Password */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Forgot Password</h2>
            <p>Enter your email address, and we'll send you a link to reset your password.</p>
            <input type="email" placeholder="Email" />
            <button onClick={closeModal}>Close</button>
            <button>Send Reset Link</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginRegister;
