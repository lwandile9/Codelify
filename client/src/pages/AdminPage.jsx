import React, { useEffect, useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from 'react-router-dom'; 
import '../components/css/adminPanel.css'
  
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // useNavigate hook for redirection

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Using fetch to check if the user is authenticated
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include', // This ensures cookies are sent with the request
        });

        if (response.ok) {
          // If the response status is 200 OK, user is authenticated
          const data = await response.json();
          setIsAuthenticated(true);
        } else {
          // If response is not OK (e.g., 401 Unauthorized), user is not authenticated
          setIsAuthenticated(false);
          navigate('/login'); // Redirect to login if not authenticated
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login on error (e.g., network issues or invalid session)
      }
    };

    checkAuth(); // Perform session check
  }, [navigate]); // Dependency on navigate to re-run effect if needed

  if (!isAuthenticated) {
    return <div class="loading-container">
  <div class="spinner"></div>
  <div class="loading-message">Authenticating, please wait...</div>
</div>
; 
  }

  return (
    <>
      <AdminPanel /> {/* Render AdminPanel if the user is authenticated */}
    </>
  );
};

export default AdminPage;
