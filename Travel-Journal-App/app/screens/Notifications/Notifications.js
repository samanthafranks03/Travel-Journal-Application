// app/screens/Notifications.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import NotificationsHeader from './NotificationsHeader.js'

const Notifications = () => {
  return (
    <View style={styles.container}>
      <NotificationsHeader/>
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

export default Notifications;
