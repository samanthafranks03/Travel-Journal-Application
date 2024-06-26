import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from './screens/LogIn.js'
import Profile from './screens/Profile.js'
import Tabs from './(tabs)/_layout.js'
import ScreenHeader from './screens/ScreenHeader.js'
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator()

function App(){
        return (
            <View style={styles.container}>
              <NavigationContainer independent = {true}>
                <RootStack.Navigator initialRouteName="LogIn"> 
                  <RootStack.Screen name="ScreenHeader" component={ScreenHeader} options={{ headerShown: false }}/>
                    <RootStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
                    <RootStack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
                    <RootStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
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

export default App