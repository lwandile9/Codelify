import React, { useEffect, useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use fetch to make the API request
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include' // Ensures cookies are sent with the request
        });

        if (response.ok) { // Equivalent to checking for status 200
          setIsAuthenticated(true);
        } else {
          // If response is not OK (e.g., 401 Unauthorized), user is not authenticated
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return<div class="loading-container">
    <div class="loading-text">
      Authenticating<span class="dots">
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">. </span>
      </span>
            <p className='wait-text'>Please wait</p> 
    </div>
  </div>
  
  }

  return (
    <>
      <AdminPanel />
    </>
  );
};

export default AdminPage;
