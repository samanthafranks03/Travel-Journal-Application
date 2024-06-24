// app/screens/Journal.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import JournalHeader from './ScreenHeader.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBar from '../elements/SearchBar.js'
import NewEntry from '../elements/NewEntry.js'



const Journal = () => {
  return (
    <View style={styles.container}>
      <JournalHeader headerTitle="Journal" />
      <SearchBar/>
      <NewEntry/>
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
});

export default Journal;