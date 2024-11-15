import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function LoginRegister() {
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validateRegistrationForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = 'Name is required';
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    return formErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formErrors = validateRegistrationForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true); // Set loading to true when request starts
      try {
        const response = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.status === 201) {
          alert("Signup successful!");
        } else {
          setErrors({ form: data.error || "An error occurred. Please try again." });
        }
      } catch (error) {
        setErrors({ form: "Failed to create account. Please try again." });
      } finally {
        setIsLoading(false); // Set loading to false when request ends
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear previous errors
    setIsLoading(true);
  
    try {
      // Send login request to the server
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Pass the email and password
      });
  
      const data = await response.json(); // Parse response data
  
      if (response.ok) {
        console.log('Login successful:', data);
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        
        // Redirect user to the admin dashboard after successful login
        navigate('/admin');
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      setLoginError('Server error. Please try again later.');
    } finally {
      // Hide loading spinner after response
      setIsLoading(false);
    }
  };

  
  const toggleForm = () => {
    setShowRegister((prev) => !prev);
    setErrors({});
    setLoginError('');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="FormBody">
      {isLoading ? ( // Conditionally render loading spinner
        <div className="loading-spinner">
          <div className="spinner"></div> {/* CSS spinner */}
          <p className='loading-text'>Please wait a sec.</p>
        </div>
      ) : (
        <div className="wrapper">
          {!showRegister ? (
            <div className="form-box login">
              <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Admin ID"
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
                  <a href="#" onClick={openModal}>Forgot password?</a>
                </div>
                <button className="btn" type="submit">Login</button>
                <div className="register-link">
                  <p>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></p>
                </div>
              </form>
            </div>
          ) : (
            <div className="form-box register">
              <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Name"
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
                {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
                <button type="submit">Register</button>
                <div className="register-link">
                  <p>Already have an account? <a href="#" onClick={toggleForm}>Login</a></p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Modal for Forgot Password */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Forgot Password</h2>
            <p>Enter your email address, and we'll send you a link to reset your password.</p>
            <input type="email" placeholder="Email" />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginRegister;
