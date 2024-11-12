import React, { useEffect, useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from 'react-router-dom'; // For navigation in React Router v6+
import axios from 'axios'; // For making API calls

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // useNavigate hook for redirection

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // End point for user Auth
        const response = await axios.get('http://localhost:5000/check-session', { withCredentials: true });

        if (response.status === 200) {
          setIsAuthenticated(true); 
        } else {
          setIsAuthenticated(false);
          navigate('/login'); // take user to login if not auth
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login on error 
      }
    };

    checkAuth(); // Perform session check
  }, [navigate]); // Dependency on navigate to re-run effect if needed

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optional loading state while checking authentication
  }

  return (
    <>
      <AdminPanel /> {/* Render AdminPanel if the user is authenticated */}
    </>
  );
};

export default AdminPage;
