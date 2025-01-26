import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api`
    : "http://localhost:8081/api";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (!data.isLoggedIn) {
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
        navigate('/');
      });
  }, [navigate]);

  function handleLogout() {
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Logout successful:', data);
        sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }

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
