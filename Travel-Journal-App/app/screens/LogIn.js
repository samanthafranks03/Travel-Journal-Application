import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import {StatusBar} from 'expo-status-bar'

const LogIn = ({navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar style="light"/>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c"/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} secureTextEntry placeholder="Password" placeholderTextColor="#003f5c"/>
        </View>
        <TouchableOpacity style={styles.forgotPassButton}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {navigation.navigate('Tabs')}} style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <View style={styles.signUpText}> 
          <Text>Don't have an account? </Text>
          <TouchableOpacity >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        </View>
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
  loginText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  inputText: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  inputView: {
    width:"80%",
    backgroundColor:"#e9e9e9",
    borderRadius:20,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:15
  },
  loginButton:{
    width:"80%",
    backgroundColor:"#98B6D0",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
    },
  signUpText: {
    flexDirection: 'row',
  }
});

export default LogIn;