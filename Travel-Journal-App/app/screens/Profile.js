// app/screens/Profile.js
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const onPressLogout = () => {
  // TO DO
};

const Profile = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress = {() => {navigation.navigate('Tabs')}}>
          <Icon size={25} name='chevron-back-outline'/>
        </TouchableOpacity>
        <Text style={styles.profileText}>Edit Profile</Text>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneText}>Save</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.content}> 
      <Text style={styles.text}>Name</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={name}
          onChangeText={value => setName(value)}
          editable={true}></TextInput>
      </View>


      <Text style={styles.text}>Email</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={email}
          onChangeText={value => setEmail(value)}
          editable={true}></TextInput>
      </View>


      <Text style={styles.text}>Phone Number</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={number}
          onChangeText={value => setNumber(value)}
          editable={true}></TextInput>
      </View>

      <TouchableOpacity onPress = {() => {navigation.navigate('SignUp')}} style={styles.loginButton}>
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%', 
    padding:15,
    backgroundColor: '#e9e9e9',
  },
  content: {
    padding: 15
  },
  profileText: {
    fontSize: 20,
    paddingLeft: '30%',
    paddingRight: '20%'
  },
  doneButton: {
    width:55,
    backgroundColor:"white",
    borderRadius:25,
    height:35,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  doneText: {
    textAlign: 'center',
    height: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    paddingLeft: 10
  },
  inputView: {
    width:"80%",
    backgroundColor:"#e9e9e9",
    borderRadius:20,
    height:45,
    marginBottom:20,
    justifyContent:"center",
    padding: 15
  },
  inputText: {

  },
  logOutText:{
    color: '#BF0000',
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
  }
});

export default Profile;