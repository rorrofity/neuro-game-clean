import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from './Timer';
import ControlButton from './ControlButton';

const activities = [
  'Raise one hand', 'Touch your knee', 'Stand up', 'Step forward', 'Clap',
  'Turn clockwise', 'Turn counterclockwise', 'Jump in place', 'Squat down',
  'Touch your feet', 'Stretch your arms up', 'Stretch your arms to the sides',
  'Do a squat', 'Raise both hands', 'Sway side to side', 'Turn your head to the right',
  'Turn your head to the left', 'Bend forward', 'Stretch one leg forward',
  'Roll your shoulders in circles'
];

const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FFA500'];

const ColorsAndMovements = () => {
  const [currentActivity, setCurrentActivity] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    generateNewActivity();
  }, []);

  const generateNewActivity = () => {
    const newActivity = activities[Math.floor(Math.random() * activities.length)];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentActivity(newActivity);
    setCurrentColor(newColor);
  };

  const startActivity = () => {
    setTimerActive(true);
    setTimerKey(prevKey => prevKey + 1);
    generateNewActivity();
  };

  const stopActivity = () => {
    setTimerActive(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Timer active={timerActive} onFinish={() => {}} timerKey={timerKey} gameFinished={false} />
      </View>
      <View style={styles.activityContainer}>
        <Text style={[styles.activityText, { color: currentColor }]}>{currentActivity}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ControlButton
          title={timerActive ? "Stop" : "Start"}
          onPress={timerActive ? stopActivity : startActivity}
          color={timerActive ? "#FF6B6B" : "#4ECDC4"}
          style={styles.button}
        />
        <ControlButton
          title="Next Activity"
          onPress={generateNewActivity}
          color="#45B7D1"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  activityContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ColorsAndMovements;
