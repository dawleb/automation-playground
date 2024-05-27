import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import pyramidBackground from './assets/pyramid_background.jpg';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        axios.post('http://localhost:8081/login', {
            email: email,
            password: password
        })
        .then(res => {
            console.log('Response:', res);
            if (res.status === 200 && res.data === "Welcome!") {
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
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${pyramidBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='p-4 bg-white rounded shadow' id="login" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '400px', width: '100%', backdropFilter: 'blur(5px)', padding: '30px' }}>
                <h2 className="mb-4 text-center" style={{ fontSize: '2rem', color: '#000' }}>Login</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Enter Email</label>
                        <input type="email" id="email" placeholder='Enter Email' style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }} value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Enter Password</label>
                        <input type="password" id="password" placeholder='Enter Password' style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }} value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className='btn btn-primary btn-lg' id="submit" style={{ fontSize: '1.2rem' }}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
