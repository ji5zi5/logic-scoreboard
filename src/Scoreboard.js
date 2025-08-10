import React, { useState, useEffect } from 'react';
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

const initialTeamNames = {
  WIN: 'WIN',
  TNT: 'TNT',
  LOTTOL: 'LOTTOL',
  RAIBIT: 'RAIBIT',
  PLUTONIUM: 'PLUTONIUM',
  QUASAR: 'QUASAR',
};

const newNames = {
  WIN: 'LOSE',
  TNT: '당시기준전교1등과2등으로신입생대표였던박윤호와배윤을면접에서탈락시킨이상한동아리',
  LOTTOL: 'LOTTO',
  RAIBIT: 'GAYBIT',
  PLUTONIUM: 'MECA',
  QUASAR: 'GAYSAR',
};

const Scoreboard = () => {
  const [scores, setScores] = useState(initialScores);
  const [teamNames, setTeamNames] = useState(initialTeamNames);

  const handleScoreChange = (team, amount) => {
    setScores(prevScores => ({
      ...prevScores,
      [team]: prevScores[team] + amount
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        const teamKeys = Object.keys(initialScores);
        const keyNumber = parseInt(e.key, 10);
        if (keyNumber >= 1 && keyNumber <= teamKeys.length) {
          e.preventDefault();
          const teamToChange = teamKeys[keyNumber - 1];
          
          setTeamNames(prevNames => {
            const currentName = prevNames[teamToChange];
            const originalName = initialTeamNames[teamToChange];
            const newName = newNames[teamToChange];

            return {
              ...prevNames,
              [teamToChange]: currentName === originalName ? newName : originalName
            };
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
            <img src={process.env.PUBLIC_URL + teamLogos[team]} alt={`${teamNames[team]} logo`} className="team-logo" />
            <h2 className="team-name">{teamNames[team]}</h2>
            <div className="score-display">{scores[team]}</div>
            <div className="score-buttons">
              <button onClick={(e) => handleScoreChange(team, e.shiftKey ? 5 : 1)}>+</button>
              <button onClick={(e) => handleScoreChange(team, e.shiftKey ? -5 : -1)}>-</button>
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