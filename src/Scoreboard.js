import React, { useState } from 'react';
import './Scoreboard.css';

const initialScores = {
  WIN: 0,
  TNT: 0,
  LOTTOL: 0,
  RAIBIT: 0,
  PLUTONIUM: 0,
  QUASAR: 0,
};

const teamLogos = {
    WIN: '/logos/win.jpg',
    TNT: '/logos/tnt.jpg',
    LOTTOL: '/logos/lottol.jpg',
    RAIBIT: '/logos/raibit.jpg',
    PLUTONIUM: '/logos/plutonium.jpg',
    QUASAR: '/logos/quasar.jpg',
};

const Scoreboard = () => {
  const [scores, setScores] = useState(initialScores);

  const handleScoreChange = (team, amount) => {
    setScores(prevScores => ({
      ...prevScores,
      [team]: prevScores[team] + amount
    }));
  };

  // Calculate leading team(s)
  const maxScore = Math.max(...Object.values(scores));
  const leadingTeams = Object.keys(scores).filter(team => scores[team] === maxScore && maxScore > 0); // Only highlight if score > 0

  return (
    <div className="scoreboard-container">
      <h1 className="scoreboard-title">Scoreboard</h1>
      <div className="scoreboard">
        {Object.keys(scores).map((team, index) => (
          <div 
            key={team} 
            className={`team-card ${leadingTeams.includes(team) ? 'leading-team' : ''}`} // Conditionally add class
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={process.env.PUBLIC_URL + teamLogos[team]} alt={`${team} logo`} className="team-logo" />
            <h2 className="team-name">{team}</h2>
            <div className="score-display">{scores[team]}</div>
            <div className="score-buttons">
              <button onClick={() => handleScoreChange(team, 1)}>+</button>
              <button onClick={() => handleScoreChange(team, -1)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <p>Hosted by:</p>
        <img src={process.env.PUBLIC_URL + '/logos/logic.jpg'} alt="Logic logo" className="logic-logo" />
      </div>
    </div>
  );
};

export default Scoreboard;