import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './screens/SignUp.js'
import Tabs from './(tabs)/_layout.js'
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator()

export default class App extends Component{
    render(){
        return (
            <View style={styles.container}>
              <NavigationContainer independent = {true}>
                <RootStack.Navigator initialRouteName="SignUp"> 
                    <RootStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
                    <RootStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
                </RootStack.Navigator>
              </NavigationContainer>
            </View>
        );
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
