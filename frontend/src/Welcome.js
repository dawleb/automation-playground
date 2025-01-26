import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './config';

function Welcome() {
  const navigate = useNavigate();

  const clearAuthToken = () => {
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });

    localStorage.removeItem('isLoggedIn');
    console.log('Auth token cleared');
  };

  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 401) {
        console.warn('Session expired. Redirecting to login.');
        clearAuthToken();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Session verification failed');
      }

      const data = await response.json();

      if (!data.isLoggedIn) {
        console.warn('User is not logged in. Redirecting to login.');
        clearAuthToken();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      clearAuthToken();
      navigate('/login');
    }
  };

  useEffect(() => {
    checkSession();

    const intervalId = setInterval(() => {
      checkSession();
    },1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        clearAuthToken();
        console.log('Logout successful');
        navigate('/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="background welcome d-flex flex-column align-items-center justify-content-center">
      <div className="form-group">
        <h1 className="mb-4">Welcome!</h1>
        <span className="highlight">You have successfully logged in.</span> This page is currently under construction.
        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-primary btn-lg" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
