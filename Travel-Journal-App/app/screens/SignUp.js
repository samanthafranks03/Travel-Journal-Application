// app/screens/Profile.js
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [eyeIcon, setIcon] = useState("eye-off-outline")
  return (
    <View style={styles.container}>
    <View style={styles.content}> 
      <Text style={styles.text}>First Name</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={firstName}
          onChangeText={value => setFirstName(value)}
          editable={true}></TextInput>
      </View>
      

      <Text style={styles.text}>Last Name</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={lastName}
          onChangeText={value => setLastName(value)}
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

      <Text style={styles.text}>Set Password</Text>
      <View style={styles.inputView}>
          <TextInput 
          style={styles.inputText}
          value={password}
          onChangeText={value => setPassword(value)}
          editable={true}secureTextEntry={eyeIcon === "eye-off-outline"}/>
          <TouchableOpacity onPress = {() => {setIcon(prevIconName => prevIconName === "eye-off-outline" ? "eye-outline" : "eye-off-outline");}}>
              <Icon style={styles.icon} name={eyeIcon}/>
          </TouchableOpacity>
      </View>

    </View>

    <TouchableOpacity onPress = {() => {navigation.navigate('LogIn')}} style={styles.accountButton}>
          <Text style={styles.accountText}>Create Account</Text>
     </TouchableOpacity>

    <View style={styles.signUpText}> 
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress = {() => {navigation.navigate('LogIn')}}>
            <Text>Log in</Text>
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
  content: {
    padding: 15
  },
  profileText: {
    fontSize: 20,
    paddingLeft: '30%',
    paddingRight: '20%'
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
    height:50,
    marginBottom:20,
    padding:15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  signUpText: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  accountText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  accountButton:{
    width:"80%",
    backgroundColor:"#98B6D0",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    alignSelf: "center"
    },
  icon: {
      color: 'grey',
      fontSize: 20,
    }
});

export default SignUp;