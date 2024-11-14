import React, { useEffect, useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
                
        if (!token) {
          setIsAuthenticated(false);
          navigate('/login'); // Redirect to login if no token
          return;
        }

        // Use fetch to make the API request with the token
        const response = await fetch('http://localhost:3000/auth/isAuthenticated', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // Send the token in the Authorization header
          }
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
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="loading-container">
        <div className="loading-text">
          Authenticating
          <span className="dots">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">. </span>
          </span>
          <p className="wait-text">Please wait</p>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
};

export default AdminPage;
