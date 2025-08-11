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

const longTeamNames = {
  WIN: '깡통멀리날리기동아리',
  TNT: 'IQ145의신입생대표였던중등화학올림피아드은상및화학교내경시대회1등을수상하고화학중간기말모두전교1등을한박윤호를탈락시킨동아리',
  LOTTOL: '경민쌤원툴동아리',
  RAIBIT: '정보쌤친목동아리',
  PLUTONIUM: '세계최고의취미동아리',
  QUASAR: '천하제일렌즈닦기동아리',
};

const Scoreboard = () => {
  const [scores, setScores] = useState(initialScores);
  const [teamNames, setTeamNames] = useState(initialTeamNames);
  const [clickedTeam, setClickedTeam] = useState(null);

  const handleScoreChange = (team, amount) => {
    setScores(prevScores => ({
      ...prevScores,
      [team]: prevScores[team] + amount
    }));
  };

  const handleCardClick = (team) => {
    setClickedTeam(team);
    setTimeout(() => {
      setClickedTeam(null);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        const teamKeyMap = {
          '1': 'WIN',
          '2': 'TNT',
          '3': 'LOTTOL',
          '4': 'RAIBIT',
          '5': 'PLUTONIUM',
          '6': 'QUASAR',
        };
        const team = teamKeyMap[event.key];

        if (team) {
          setTeamNames(prev => ({
            ...prev,
            [team]: prev[team] === initialTeamNames[team] ? longTeamNames[team] : initialTeamNames[team],
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTeamNames]);

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
            className={`team-card ${leadingTeams.includes(team) ? 'leading-team' : ''} ${clickedTeam === team ? 'clicked' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={process.env.PUBLIC_URL + teamLogos[team]} alt={`${teamNames[team]} logo`} className="team-logo" />
            <h2 className="team-name">{teamNames[team]}</h2>
            <div className="score-display">{scores[team]}</div>
            <div className="score-buttons">
              <button onClick={(e) => {
                e.stopPropagation();
                handleScoreChange(team, e.shiftKey ? 10 : 1);
                handleCardClick(team);
              }}>+</button>
              <button onClick={(e) => {
                e.stopPropagation();
                handleScoreChange(team, e.shiftKey ? -10 : -1);
                handleCardClick(team);
              }}>-</button>
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
