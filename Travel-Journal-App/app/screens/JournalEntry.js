// app/screens/NewTrips.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import EntryTabBar from '../elements/EntryTabBar.js';


const JournalEntry = ({navigation, route}) => {
  //Get entry name and location as parameters
  const { entryName, locationName } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*Back button*/}
        <TouchableOpacity onPress={() => { navigation.navigate('Journal') }}> 
            <Icon style={styles.icon} size={18} name='chevron-back-outline' /> 
        </TouchableOpacity> 

        <View style={{ flex: 1 }} />
        {/*Add collaborators button*/}
        <TouchableOpacity style={styles.collabButton}>
            <Icon style={styles.icon} size={18} paddingRight={15} name='person-add-outline' /> 
        </TouchableOpacity>

        {/*Save button*/}
        <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      

      {/*Display entry name and location*/}
      <View>
        <Text style={styles.journalName}>{entryName}</Text>
        <Text style={styles.journalLocation}>{locationName}</Text>
      </View>

      {/*Text box*/}
      <View style={styles.textBox}>
        <TextInput
        placeholder="Title"
        fontSize={25}
        />
        <TextInput
        placeholder="Date"
        fontSize={18}
        />
        <TextInput
        placeholder="Add text here"
        fontSize={15}
        multiline={true}
        />
      </View>


      {/*Options tab*/}
      <EntryTabBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    padding: 15,
    justifyContent: 'space-between',
  },
  //Back button
  icon: {
    alignItems: 'left',
    justifyContent: 'left'
  },
  //Save button
  saveButton: {
    backgroundColor: '#e9e9e9',
    borderRadius: 25,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  saveText: {
    textAlign: 'center',
    height: 20,
  },
  //Name and location
  journalName: {
    color: 'black',
    fontSize: 35,
    fontFamily: 'Roboto',
    padding: 20
  },
  journalLocation: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
    padding: 20
  },
  //Text box
  textBox: {
    backgroundColor: 'grey',
    borderWidth: 20,
    borderColor: 'white',
    height: 20,
    padding: 15,
    flexGrow: 1,
    borderRadius: 40
  }
});

export default JournalEntry;
