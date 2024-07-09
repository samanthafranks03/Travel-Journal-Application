// Travel-Journal-App/app/screens/Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App'; 
import { doc, getDoc, query, where, collection, getDocs, updateDoc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.username);
        setEmail(data.email);
        setNumber(data.number);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // Check for duplicate username
      const usersRef = collection(db, 'users');
      let q = query(usersRef, where('username', '==', username));
      let querySnapshot = await getDocs(q);

      if (!querySnapshot.empty && querySnapshot.docs[0].id !== user.uid) {
        alert('Username is already taken. Please choose a different one.');
        return;
      }

      // Check for duplicate email
      q = query(usersRef, where('email', '==', email));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty && querySnapshot.docs[0].id !== user.uid) {
        alert('Email is already taken. Please choose a different one.');
        return;
      }

      // Check for duplicate phone number
      q = query(usersRef, where('number', '==', number));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty && querySnapshot.docs[0].id !== user.uid) {
        alert('Phone number is already taken. Please choose a different one.');
        return;
      }

      // Check if any field is the same
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data.firstName === firstName && data.lastName === lastName && data.username === username && data.email === email && data.number === number) {
        alert('No changes detected.');
        return;
      }

      // Update Firestore document
      await updateDoc(docRef, {
        firstName,
        lastName,
        username,
        email,
        number,
      });

      // Update email in authentication
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      alert('Profile updated successfully!');
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Tabs') }}>
            <Icon size={25} name='chevron-back-outline' />
          </TouchableOpacity>
          <Text style={styles.profileText}>Edit Profile</Text>
          <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
            <Text style={styles.doneText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
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

          <TouchableOpacity onPress={() => { navigation.navigate('LogIn') }} style={styles.loginButton}>
            <Text style={styles.logOutText}>Log out</Text>
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
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  profileText: {
    fontSize: 28,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  doneText: {
    textAlign: 'center',
    height: 20,
  },
  content: {
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  inputText: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Roboto',
    flex: 1,
  },
  logOutText: {
    color: 'black',
    fontSize: 17,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#8da1a6",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Profile;