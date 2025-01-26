import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './apiConfig';


function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/session`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Session verification failed');
        }

        const data = await response.json();

        if (!data.isLoggedIn) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/');
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();
      console.log('Logout successful:', data);

      sessionStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isLoggedIn');

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="background welcome d-flex flex-column align-items-center justify-content-center">
      <div className="form-group">
        <h1 className="mb-4">Welcome!</h1>
        <span className="highlight">You have successfully logged in.</span> This page is currently under construction!
        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-primary btn-lg" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;