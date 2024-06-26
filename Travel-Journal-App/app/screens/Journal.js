// app/screens/Journal.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import JournalHeader from './ScreenHeader.js'
import SearchBar from '../elements/SearchBar.js'
import NewEntry from '../elements/NewEntry.js'



const Journal = ({navigation}) => {
  return (
    <View style={styles.container}>
      <JournalHeader headerTitle="Journal" navigation = {navigation}/>
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