import React from 'react';
import Game from './components/Game';
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="game-title">Actividad Rehabilitacion</h1>
      <Game />
    </div>
  );
};

export default App;
