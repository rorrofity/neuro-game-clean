import React, { useState } from 'react';
import Game from './components/Game';
import ActivitySelector from './components/ActivitySelector';
import Sidebar from './components/Sidebar';
import './src/styles.css';

const App = () => {
  const [currentActivity, setCurrentActivity] = useState('arrows');
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentLevel={currentLevel} 
        onLevelSelect={handleLevelSelect} 
        levels={[1, 2, 3]}
      />
      <div className="main-content">
        <h1 className="game-title">Actividades de Rehabilitación</h1>
        <ActivitySelector
          currentActivity={currentActivity}
          onActivitySelect={setCurrentActivity}
        />
        {currentActivity === 'arrows' ? (
          <Game currentLevel={currentLevel} />
        ) : (
          <div className="placeholder">
            <h2>Números y movimientos</h2>
            <p>Esta actividad está en desarrollo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
