import React from 'react';
import pyramidBackground from './assets/pyramid_background.jpg';

const welcomeStyle = {
  color: 'white',
  textAlign: 'center',
  lineHeight: '100vh',
};

function Welcome() {
  return (
    <div style={{ backgroundImage: `url(${pyramidBackground})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 style={welcomeStyle}>Welcome!</h1>
    </div>
  );
}

export default Welcome;