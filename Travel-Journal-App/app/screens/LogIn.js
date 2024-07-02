import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeIcon, setIcon] = useState("eye-off-outline");

  const handleLogIn = async () => {
    try {
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
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during login:', errorCode, errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

        <TouchableOpacity style={styles.forgotPassButton}>
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
  }
});

export default LogIn;