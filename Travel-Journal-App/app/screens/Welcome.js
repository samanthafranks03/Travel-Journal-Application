import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    Playfair: require('../../assets/fonts/PlayFair.ttf'),
    // Add more custom fonts here if needed
  });
}


const Welcome = ({ navigation }) => {
  React.useEffect(() => {
    loadFonts();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.jpg')} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.8)']}
        style={styles.overlay}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to TravelDoc</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#8da1a6",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    height: '70%',
    width: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  overlay: {
    height: '60%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 85,
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  welcomeText: {
    width: '90%',
    fontSize: 37,
    color: '#4c6563',
    marginBottom: 40,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  loginText: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'Roboto',
  },
});

export default Welcome;