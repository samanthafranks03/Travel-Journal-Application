import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Journal from './screens/Journal';
import JournalEntry from './screens/JournalEntry';
import TabsLayout from './tabs/_layout';
import ScreenHeader from './screens/ScreenHeader';

const firebaseConfig = {
  apiKey: 'AIzaSyAnlTM5qYrY6hzimSND8E3SnuWFwtOCj38',
  authDomain: 'mad-team2-ec302.firebaseapp.com',
  projectId: 'mad-team2-ec302',
  storageBucket: 'mad-team2-ec302.appspot.com',
  messagingSenderId: '434776608842',
  appId: '1:434776608842:web:83f658bedb135639e6d6b3',
  measurementId: 'G-JRBRLEV6G1',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const RootStack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer independent={true}>
        <RootStack.Navigator initialRouteName="LogIn">
          <RootStack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
          <RootStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <RootStack.Screen name="Tabs" component={TabsLayout} options={{ headerShown: false }} />
          <RootStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <RootStack.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
          <RootStack.Screen name="JournalEntry" component={JournalEntry} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { auth, db };
export default App;
