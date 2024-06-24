import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import Constants from 'expo-constants';
import {StatusBar} from 'expo-status-bar'



const SignUp = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.login}>Log In</Text>
        <StatusBar style="light"/>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c"/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText} secureTextEntry placeholder="Password" placeholderTextColor="#003f5c"/>
        </View>
        <Text>Don't have an account? Sign Up</Text>
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
  login: {
    color: '#98B6D0',
    fontSize: 40,
    fontFamily: 'Inter-bold',
  },
  inputText: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Inter',
  },
  inputView: {
    width:"80%",
    backgroundColor:"#e9e9e9",
    borderRadius:20,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:15
  }
});

export default SignUp;