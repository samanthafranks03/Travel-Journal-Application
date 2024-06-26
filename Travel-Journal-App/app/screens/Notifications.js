// app/screens/Notifications.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import NotificationsHeader from './ScreenHeader.js'

const Notifications = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NotificationsHeader headerTitle="Notifications" navigation = {navigation}/>
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
