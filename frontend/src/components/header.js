import React from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function Header() {
  const navigate = useNavigate();

  const clearAuthToken = () => {
    const cookiesToClear = ['auth_token', 'refresh_token'];
    cookiesToClear.forEach(name => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
    localStorage.removeItem('isLoggedIn');
    console.log('Auth token cleared');
  };

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

  const handleHelp = () => {
    navigate('/help');
  };

  return (
    <div className="header-bar">
      <span className="hello-text">Hello Student!</span>
      <div className="header-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <button className="help-button" onClick={handleHelp}>
          Help
        </button>
      </div>
    </div>
  );
}

export default Header;
