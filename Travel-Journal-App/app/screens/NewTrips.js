// app/screens/NewTrips.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewTrips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewTrips;
