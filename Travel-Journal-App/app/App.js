import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {createStackNavigator} from '@react-navigation/stack';
import Journal from './screens/Journal.js'
import NewTrips from './screens/NewTrips.js'
import Notifications from './screens/Notifications.js'
import Profile from './screens/Profile.js'
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator()

export default class App extends Component{
    render(){
        return (
            <View style={styles.container}>
              <NavigationContainer>
                <RootStack.Navigator initialRouteName="Journal"> 
                    <RootStack.Screen name="Journal" component={Journal}/>
                    <RootStack.Screen name="NewTrips" component={NewTrips}/>
                    <RootStack.Screen name="Notifications" component={Notifications}/>
                    <RootStack.Screen name="Profile" component={Profile}/>
                </RootStack.Navigator>
              </NavigationContainer>
            </View>
        );
    };
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
