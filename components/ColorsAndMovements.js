import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from './Timer';
import ControlButton from './ControlButton';

const activities = [
  'Levanta una mano', 'Toca tu rodilla', 'Ponte de pie', 'Da un paso adelante', 'Aplaude',
  'Gira en sentido horario', 'Gira en sentido antihorario', 'Salta en el lugar', 'Agáchate',
  'Toca tus pies', 'Estira los brazos hacia arriba', 'Estira los brazos a los lados',
  'Haz una sentadilla', 'Levanta ambas manos', 'Balancéate de lado a lado', 'Gira la cabeza a la derecha',
  'Gira la cabeza a la izquierda', 'Inclínate hacia adelante', 'Estira una pierna hacia adelante',
  'Haz círculos con los hombros'
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
        <Text style={[styles.activityText, { color: currentColor, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>{currentActivity}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ControlButton
          title={timerActive ? "Detener" : "Iniciar"}
          onPress={timerActive ? stopActivity : startActivity}
          color={timerActive ? "#FF6B6B" : "#4ECDC4"}
          style={styles.button}
        />
        <ControlButton
          title="Siguiente Actividad"
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
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 28,
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
