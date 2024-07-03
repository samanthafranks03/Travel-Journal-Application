// Travel-Journal-App/app/screens/LogIn.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App'; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';

const LogIn = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [eyeIcon, setIcon] = useState("eye-off-outline");

  const isEmail = (input) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(input);
  };

  const handleLogIn = async () => {
    try {
      let email = input;

      if (!isEmail(input)) {
        // Fetch email using username
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', input));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('No user found with the provided username.');
        }

        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Fetch user data from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('User data:', docSnap.data());
        navigation.navigate('Tabs');
      } else {
        console.log('No such document!');
        alert('User profile not found. Please complete your profile.');
        navigation.navigate('Profile'); // Navigate to profile setup page if needed
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.message.includes('No user found') ? 'Incorrect Username or Password. Please try again.' : 'Incorrect Email or Password. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    if (!input) {
      Alert.alert("Error", "Please enter your email or username.");
      return;
    }

    try {
      let email = input;

      if (!isEmail(input)) {
        // Fetch email using username
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', input));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('No user found with the provided username.');
        }

        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email;
      }

      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email has been sent.");
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email or Username"
            placeholderTextColor="#003f5c"
            value={input}
            onChangeText={value => setInput(value)}
            editable={true}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={password}
            onChangeText={value => setPassword(value)}
            editable={true}
            secureTextEntry={eyeIcon === "eye-off-outline"}
          />
          <TouchableOpacity onPress={() => { setIcon(prevIconName => prevIconName === "eye-off-outline" ? "eye-outline" : "eye-off-outline"); }}>
            <Icon style={styles.icon} name={eyeIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassButton} onPress={handleForgotPassword}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogIn} style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.signUpText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
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
    width: "80%",
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#98B6D0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signUpText: {
    flexDirection: 'row',
  },
  icon: {
    color: 'grey',
    fontSize: 20,
    alignSelf: 'center',
  },
  forgotPassButton: {
    marginBottom: 20,
  }
});

export default LogIn;
