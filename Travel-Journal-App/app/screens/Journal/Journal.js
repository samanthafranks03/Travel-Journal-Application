// app/screens/Journal.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import JournalHeader from './JournalHeader.js'

const Journal = () => {
  return (
    <View style={styles.container}>
      <JournalHeader/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Journal;