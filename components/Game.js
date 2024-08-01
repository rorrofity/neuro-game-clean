import React, { useState, useEffect } from 'react';
import Board from './Board';
import ControlButton from './ControlButton';
import Sidebar from './Sidebar';
import Timer from './Timer';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [arrows, setArrows] = useState(Array(16).fill({ direction: null, color: '#E0E0E0', active: false, position: null }));
  const [colorHistory, setColorHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500'];

  const startGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setCurrentPosition(0);
    setColorHistory([]);
    setTimerActive(false);
    setTimerKey(prevKey => prevKey + 1); // This will reset the timer
    setArrows(generateInitialArrows());
    if (currentLevel === 1) {
      setTimeout(() => setTimerActive(true), 0);
      generateNewArrow(); // Activate the first arrow immediately for level 1
    }
  };

  const finishGame = () => {
    setGameStarted(false);
    setGameFinished(true);
    setCurrentArrow(null);
    setCurrentPosition(0);
    setArrows(Array(16).fill({ direction: null, color: '#E0E0E0' }));
    setTimerActive(false);
    // We don't reset the timer here, allowing it to display the final time
  };

  const restartGame = () => {
    setGameFinished(false);
    setFinalTime(0);
    startGame();
  };

  const generateInitialArrows = () => {
    const directions = ['Up', 'Down', 'Left', 'Right'];
    return Array(16).fill(null).map((_, index) => ({
      direction: directions[Math.floor(Math.random() * directions.length)],
      color: '#E0E0E0',
      active: false,
      position: index
    }));
  };

  const generateNewColor = () => {
    let newColor;
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (
      colorHistory.length >= 2 &&
      colorHistory[colorHistory.length - 1] === newColor &&
      colorHistory[colorHistory.length - 2] === newColor
    );

    const newColorHistory = [...colorHistory, newColor];
    if (newColorHistory.length > 16) newColorHistory.shift();
    setColorHistory(newColorHistory);

    return newColor;
  };

  const generateNewArrow = () => {
    if (currentPosition < 16) {
      const newColor = generateNewColor();

      if (currentLevel === 1) {
        const directions = ['Up', 'Down', 'Left', 'Right'];
        const newArrow = {
          direction: directions[Math.floor(Math.random() * directions.length)],
          color: newColor,
          position: currentPosition,
        };
        setCurrentArrow(newArrow);
      } else if (currentLevel === 2) {
        const newArrows = [...arrows];
        newArrows[currentPosition] = { ...newArrows[currentPosition], color: newColor, active: true };
        setArrows(newArrows);
      } else if (currentLevel === 3) {
        const newArrows = [...arrows];
        const inactivePositions = newArrows.map((arrow, index) => arrow.active ? null : index).filter(pos => pos !== null);
        if (inactivePositions.length > 0) {
          const randomPosition = inactivePositions[Math.floor(Math.random() * inactivePositions.length)];
          newArrows[randomPosition] = { ...newArrows[randomPosition], color: newColor, active: true };
          newArrows.forEach((arrow, index) => {
            if (arrow.active && index !== randomPosition) {
              arrow.color = '#A0A0A0'; // Deactivated color
            }
          });
          setArrows(newArrows);
        } else {
          finishGame();
          return;
        }
      }
    
      // Start the timer when the first arrow is activated in level 2 or 3
      if (currentPosition === 0 && (currentLevel === 2 || currentLevel === 3)) {
        setTimerActive(true);
      }

      setCurrentPosition(currentPosition + 1);
    } else {
      finishGame();
    }
  };

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    finishGame();
  };

  useEffect(() => {
    // Remove this effect as we no longer want to automatically finish the game
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar currentLevel={currentLevel} onLevelSelect={handleLevelSelect} levels={[1, 2, 3]} />
      <div style={styles.gameArea}>
        <div style={styles.timerContainer}>
          <Timer active={timerActive} onFinish={setFinalTime} timerKey={timerKey} gameFinished={gameFinished} />
        </div>
        <div style={styles.boardContainer}>
          <Board
            currentArrow={currentLevel === 1 ? currentArrow : null}
            arrows={currentLevel === 2 || currentLevel === 3 ? arrows : null}
          />
        </div>
        <div style={styles.buttonContainer}>
          {!gameStarted && !gameFinished ? (
            <ControlButton
              title="Iniciar"
              onPress={startGame}
              color="#4ECDC4"
              style={styles.startButton}
            />
          ) : gameFinished ? (
            <ControlButton
              title="Reiniciar"
              onPress={restartGame}
              color="#4ECDC4"
              style={styles.startButton}
            />
          ) : (
            <>
              <ControlButton
                title="Terminar"
                onPress={finishGame}
                color="#FF6B6B"
                style={styles.gameButton}
              />
              <ControlButton
                title={currentPosition === 16 ? "Terminar" : "Siguiente Flecha"}
                onPress={currentPosition === 16 ? finishGame : generateNewArrow}
                color="#45B7D1"
                style={styles.gameButton}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  gameArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
  },
  timerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  boardContainer: {
    width: '100%',
    aspectRatio: '1',
    maxWidth: '600px',
    maxHeight: '600px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '600px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  startButton: {
    width: '100%',
  },
  gameButton: {
    flex: 1,
  },
};

export default Game;
