import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL 
    ? `${process.env.REACT_APP_BACKEND_URL}/api` 
    : "http://localhost:8081/api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/welcome');
        }
    }, [navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        }, {
            withCredentials: true
        })
        .then(res => {
            console.log('Response:', res);
            if (res.status === 200 && res.data.message === "Login successful") {
                localStorage.setItem('isLoggedIn', true);
                navigate('/welcome');
            } else {
                setError('Invalid email or password');
            }
        })
        .catch(err => {
            console.log('Error:', err);
            if (err.response && err.response.status === 401) {
                setError('Unauthorized. Please check your credentials.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        });
    }

    return (
    <div className="d-flex justify-content-center align-items-center background">
        <div id="login">
            <h2 className="mb-4 text-center login-header">Login</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Enter Email</label>
                    <input className="input-label" type="email" id="email" placeholder='[Your Email]' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input className="input-label" type="password" id="password" placeholder='[Your Password]' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2 submit-btn">
                    <button className="btn btn-primary btn-lg" id="submit">Login</button>
                </div>
            </form>
            <div className="footer">
                <p>
                    This site serves as a <strong>sandbox</strong> for testing examples from the book:
                </p>
                <p>
                    <em>"Creating An End-To-End Test Framework: A Detailed Guide With Practical Examples From Playwright, Cypress, and Cucumber"</em>
                </p>
                <p>
                    By Dawid Lebioda &mdash; <span className="copyright">© Copyright 2025</span>
                    <span> Part of the <em>Automation: Theory and Practice</em> series of books.</span>
                </p>
            </div>
        </div>
    </div>
    );
}

export default Login;
