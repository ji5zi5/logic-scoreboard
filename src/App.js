
import React, { useEffect } from 'react';
import Scoreboard from './Scoreboard';
import './index.css'; // Ensure index.css is imported

const Particles = () => {
  useEffect(() => {
    const container = document.querySelector('.particles');
    if (!container) return; // Added check for container existence
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(particle);
    }
  }, []);

  return <div className="particles"></div>;
};

function App() {
  return (
    <div className="App">
      <div className="esports-arena-background">
        <Particles />
        <div className="spotlight s1"></div>
        <div className="spotlight s2"></div>
        <div className="spotlight s3"></div>
      </div>
      <main className="main-content">
        <Scoreboard />
      </main>
    </div>
  );
}

export default App;
