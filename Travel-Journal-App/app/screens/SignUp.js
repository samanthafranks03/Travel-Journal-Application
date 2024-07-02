// app/screens/Profile.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [eyeIcon, setIcon] = useState("eye-off-outline");

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !number || !password) {
      alert("All fields are required!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user information to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        number,
      });

      navigation.navigate('LogIn');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>First Name</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={firstName}
              onChangeText={setFirstName}
              editable={true}
            />
          </View>

          <Text style={styles.text}>Last Name</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={lastName}
              onChangeText={setLastName}
              editable={true}
            />
          </View>

          <Text style={styles.text}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
              editable={true}
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.text}>Phone Number</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={number}
              onChangeText={setNumber}
              editable={true}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.text}>Set Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputText}
              value={password}
              onChangeText={setPassword}
              editable={true}
              secureTextEntry={eyeIcon === "eye-off-outline"}
            />
            <TouchableOpacity onPress={() => setIcon(prevIcon => prevIcon === "eye-off-outline" ? "eye-outline" : "eye-off-outline")}>
              <Icon style={styles.icon} name={eyeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleSignUp} style={styles.accountButton}>
          <Text style={styles.accountText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.signUpText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
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
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    marginBottom: 10,
  },
  inputView: {
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputText: {
    flex: 1,
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Roboto',
    paddingHorizontal: 15,
  },
  signUpText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  accountButton: {
    width: "100%",
    backgroundColor: "#98B6D0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    color: 'grey',
    fontSize: 20,
    padding: 10,
  }
});

export default SignUp;