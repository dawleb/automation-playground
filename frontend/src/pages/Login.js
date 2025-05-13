import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import API_URL from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${API_URL}/session`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.isLoggedIn) {
          console.log('Session is valid, navigating to welcome');
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/welcome');
        }
      } catch {
        console.log('No valid session. Staying on login page.');
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/welcome');
    } else {
      checkSession();
    }
  }, [navigate]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true },
      );

      if (res.status === 200 && res.data.message === 'Login successful') {
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/welcome');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response?.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 background">
        Loading...
      </div>
    );
  }

  // Cyoress app actions login
    window.login = async (email, password) => {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      localStorage.setItem('isLoggedIn', 'true');

      window.location.hash = '#/welcome';

      return data;
    };
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 background">
      <div id="login">
        <h2 className="mb-4 text-center login-header">Login</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              className="input-label"
              type="email"
              id="email"
              placeholder="[Your Email]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              data-qa="email-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Enter Password
            </label>
            <input
              className="input-label"
              type="password"
              id="password"
              placeholder="[Your Password]"
              value={password}
              onChange={e => setPassword(e.target.value)}
              data-qa="password-input"
            />
          </div>
          <div className="d-grid gap-2 submit-btn">
            <button className="btn btn-primary btn-lg" id="submit" data-qa="submit-button">
              Login
            </button>
          </div>
        </form>
        <div className="footer mt-4 text-center">
          <p>
            This site serves as a <strong>sandbox</strong> for testing examples from the book:
          </p>
          <p>
            <em>
              "Creating An End-To-End Test Framework: A Detailed Guide With Practical Examples From
              Playwright, Cypress, and Cucumber"
            </em>
          </p>
          <p>
            By Dawid Lebioda &mdash; <span className="copyright">© Copyright 2025</span>
            <span>
              {' '}
              Part of the <em>Automation: Theory and Practice</em> series of books.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
