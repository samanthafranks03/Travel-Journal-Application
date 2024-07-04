import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import EntryTabBar from '../elements/EntryTabBar.js';

const JournalEntry = ({navigation, route}) => {
  // Get entry name and location as parameters
  const { entryName, locationName } = route.params;

  // State for modal visibility, username input, and list of collaborators
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  const handleAddCollaborator = () => {
    if (username.trim()) {
      setCollaborators([...collaborators, username.trim()]);
      setUsername('');
    }
  };

  const renderCollaborator = ({ item }) => (
    <View style={styles.collaboratorItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={() => { navigation.navigate('Journal') }}> 
          <Icon style={styles.icon} size={18} name='chevron-back-outline' /> 
        </TouchableOpacity> 

        <View style={{ flex: 1 }} />
        {/* Add collaborators button */}
        <TouchableOpacity style={styles.collabButton} onPress={() => setModalVisible(true)}>
          <Icon style={styles.icon} size={18} paddingRight={15} name='person-add-outline' /> 
        </TouchableOpacity>

        {/* Save button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Display entry name and location */}
      <View>
        <Text style={styles.journalName}>{entryName}</Text>
        <Text style={styles.journalLocation}>{locationName}</Text>
      </View>

      {/* Text box */}
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

      {/* Options tab */}
      <EntryTabBar/>

      {/* Add Collaborator Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.close}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close-outline" size={20}  />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Add Collaborators</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleAddCollaborator}
          >
            <Text style={styles.textStyle}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={collaborators}
            renderItem={renderCollaborator}
            keyExtractor={(item, index) => index.toString()}
            style={styles.collaboratorList}
          />
        </View>
      </Modal>
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
  // Back button
  icon: {
    alignItems: 'left',
    justifyContent: 'left'
  },
  // Save button
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
  // Name and location
  journalName: {
    color: 'black',
    fontSize: 35,
    fontFamily: 'Roboto',
    paddingLeft: 20
  },
  journalLocation: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingLeft: 20
  },
  // Text box
  textBox: {
    backgroundColor: 'grey',
    borderWidth: 20,
    borderColor: 'white',
    height: 20,
    padding: 15,
    flexGrow: 1,
    borderRadius: 40
  },
  // Modal
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSave: {
    backgroundColor: "#98B6D0",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  collaboratorList: {
    marginTop: 20,
    width: '100%',
  },
  collaboratorItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  close: {
    alignSelf: 'flex-end',
  }
});

export default JournalEntry;
