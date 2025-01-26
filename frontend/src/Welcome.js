import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
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
