import React, { useState } from 'react';
import Game from './components/Game';
import ActivitySelector from './components/ActivitySelector';
import './styles.css';

const App = () => {
  const [currentActivity, setCurrentActivity] = useState('arrows');

  return (
    <div className="app-container">
      <h1 className="game-title">Actividad Rehabilitacion</h1>
      <ActivitySelector
        currentActivity={currentActivity}
        onActivitySelect={setCurrentActivity}
      />
      {currentActivity === 'arrows' ? (
        <Game />
      ) : (
        <div className="placeholder">
          <h2>Numeros y movimientos</h2>
          <p>Esta actividad está en desarrollo.</p>
        </div>
      )}
    </div>
  );
};

export default App;
