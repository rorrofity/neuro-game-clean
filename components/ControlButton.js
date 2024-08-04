import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ControlButton = ({ title, onPress, color, style }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={StyleSheet.compose(
        styles.button,
        [
          { backgroundColor: color },
          style
        ]
      )}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 10,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ControlButton;
