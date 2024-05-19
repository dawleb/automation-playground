import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import pyramidBackground from './pyramid_background.jpg'; // Zaimportuj obraz piramidy testów

function Login() {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${pyramidBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='p-4 bg-white rounded shadow' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '400px', width: '100%', backdropFilter: 'blur(5px)', padding: '30px' }}>
                <h2 className="mb-4 text-center" style={{ fontSize: '2rem', color: '#000' }}>Login</h2>
                <form action="">
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="email" style={{ display: 'block', fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Enter Email</label>
                        <input type="email" id="email" placeholder='Enter Email' style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Enter Password</label>
                        <input type="password" id="password" placeholder='Enter Password' style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }}/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className='btn btn-primary btn-lg' style={{ fontSize: '1.2rem' }}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;