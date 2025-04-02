import React, { useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Help from './pages/Help';
import API_URL from './config';

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const clearAuthToken = useCallback(() => {
    ['auth_token', 'refresh_token'].forEach(name => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
    localStorage.removeItem('isLoggedIn');
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 401) {
        clearAuthToken();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Session verification failed');
      }

      const data = await response.json();
      if (!data.isLoggedIn) {
        clearAuthToken();
        navigate('/login');
      }
    } catch (error) {
      console.error('Session check error:', error);
      clearAuthToken();
      navigate('/login');
    }
  }, [navigate, clearAuthToken]);

  useEffect(() => {
    checkSession();
    const intervalId = setInterval(checkSession, 5000);
    return () => clearInterval(intervalId);
  }, [checkSession]);

  return children;
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
