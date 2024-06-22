// app/screens/Notifications.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import NotificationsHeader from './ScreenHeader.js'

const Notifications = () => {
  return (
    <View style={styles.container}>
      <NotificationsHeader headerTitle="Notifications" />
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

export default Notifications;
