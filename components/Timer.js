import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ active, onFinish, timerKey, gameFinished }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!gameFinished) {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [active, gameFinished, timerKey]);

  useEffect(() => {
    if (!active && gameFinished) {
      onFinish(time);
    }
  }, [active, gameFinished, onFinish, time]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerLabel}>Tiempo: </Text>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  timerLabel: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#333333',
    fontFamily: 'Roboto Mono, monospace',
    marginRight: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#333333',
    fontFamily: 'Roboto Mono, monospace',
  },
});

export default Timer;
