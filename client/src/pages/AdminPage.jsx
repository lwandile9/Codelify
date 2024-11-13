import React, { useEffect, useState } from 'react';
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
const AdminPage  = ()=>{
const LoginRegister = () =>{}
=======
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
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
>>>>>>> 6e183d976d5336d1cd89692634445632da81bf92

    checkAuth();
  }, []);

<<<<<<< HEAD
       <AdminPanel/>
    
      </>
}
//export default LoginRegister;
export default AdminPanel;
=======
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
>>>>>>> 6e183d976d5336d1cd89692634445632da81bf92
