import React, { useState } from 'react';
import Game from './components/Game';
import LeftSidebar from './components/LeftSidebar';
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
      <LeftSidebar
        currentActivity={currentActivity}
        onActivitySelect={setCurrentActivity}
      />
      <div className="main-content">
        {currentActivity === 'arrows' ? (
          <Game currentLevel={currentLevel} />
        ) : (
          <div className="placeholder">
            <h2>Colores y movimientos</h2>
            <p>Esta actividad está en desarrollo.</p>
          </div>
        )}
      </div>
      <Sidebar 
        currentLevel={currentLevel} 
        onLevelSelect={handleLevelSelect} 
        levels={[1, 2, 3]}
      />
    </div>
  );
};

export default App;
