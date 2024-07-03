// Travel-Journal-App/app/screens/SignUp.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocs, query, where, collection } from 'firebase/firestore';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [eyeIcon, setIcon] = useState("eye-off-outline");

  const handleSignUp = async () => {
    try {
      // Check if username is already taken
      const usersRef = collection(db, 'users');
      let q = query(usersRef, where('username', '==', username));
      let querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('Username is already taken. Please choose a different one.');
        return;
      }

      // Check if email is already taken
      q = query(usersRef, where('email', '==', email));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('Email is already taken. Please choose a different one.');
        return;
      }

      // Check if phone number is already taken
      q = query(usersRef, where('number', '==', number));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('Phone number is already taken. Please choose a different one.');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      // Ensure user is authenticated
      if (!user) {
        alert('Authentication failed. Please try again.');
        return;
      }

      // Verify user UID
      console.log('User UID:', user.uid);

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        username,
        email,
        number,
      });

      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Error during sign up:', error);
      if (error.code === 'permission-denied') {
        alert('You do not have permission to perform this operation. Please check your Firestore rules.');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            value={firstName}
            onChangeText={value => setFirstName(value)}
            editable={true}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            value={lastName}
            onChangeText={value => setLastName(value)}
            editable={true}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            value={username}
            onChangeText={value => setUsername(value)}
            editable={true}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={value => setEmail(value)}
            editable={true}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            value={number}
            onChangeText={value => setNumber(value)}
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

        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('LogIn') }}>
            <Text>Log in</Text>
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
  signUpButton: {
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
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  loginText: {
    flexDirection: 'row',
  },
  icon: {
    color: 'grey',
    fontSize: 20,
    alignSelf: 'center',
  }
});

export default SignUp;