import React, { useState } from 'react';
import './Login.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function FormValidation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Handle form validation
  const validateFormInput = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Username is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
    }
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms & conditions.";
    }
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    const formErrors = validateFormInput();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true);

    // Clear previous errors
    setErrors({});

    try {
      // Send data to the API
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful");
        console.log(result);
      } else {
        alert(result.error || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='form-box login'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='input-box'>
          <input 
            type="text" 
            placeholder='Username' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <FaUserAlt className='icon' />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className='input-box'>
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <MdEmail className='emailIcon' />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className='input-box'>
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className='input-box'>
          <input 
            type="password" 
            placeholder='Confirm Password' 
            value={confirmpassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon' />
          {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
        </div>
        <div className='remember-forgot'>
          <label>
            <input 
              type="checkbox" 
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            /> I agree to the terms & conditions
          </label>
          {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
        </div>
        <button className='btnRegister' type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <div className="register-link">
          <p>Already have an account? <a href="#" onClick={() => setShowRegister(false)}>Login</a></p>
        </div>
      </form>
    </div>
  );
}

export default FormValidation;
