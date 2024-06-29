import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import JournalHeader from './ScreenHeader.js';
import SearchBar from '../elements/SearchBar.js';
import NewEntry from '../elements/NewEntry.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const Journal = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryName, setEntryName] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const generateUniqueName = (name, excludeId = null) => {
    let uniqueName = name;
    let counter = 1;
    const existingNames = new Set(entries.filter(entry => entry.id !== excludeId).map(entry => entry.name));
    while (existingNames.has(uniqueName)) {
      uniqueName = `${name} (${counter})`;
      counter += 1;
    }
    return uniqueName;
  };

  const addOrEditEntry = () => {
    if (entryName.trim() === '') {
      Alert.alert("Error", "Entry name cannot be empty.");
      return;
    }

    const uniqueName = generateUniqueName(entryName, editingEntry ? editingEntry.id : null);

    if (editingEntry) {
      setEntries(prevEntries => prevEntries.map(entry =>
        entry.id === editingEntry.id ? { ...entry, name: uniqueName } : entry
      ));
      setEditingEntry(null);
    } else {
      const newEntry = { id: Date.now().toString(), name: uniqueName };
      setEntries((prevEntries) => [...prevEntries, newEntry]);
    }

    setEntryName('');
    setModalVisible(false);
  };

  const editEntry = (entry) => {
    setEditingEntry(entry);
    setEntryName(entry.name);
    setModalVisible(true);
  };

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.entry} onPress={() => editEntry(item)}>
      <Icon name='book' size={100} color='#77A0C6' style={styles.entryIcon} />
      <Text style={styles.entryText}>{item.name}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>
      <JournalHeader headerTitle="Journal" navigation={navigation} />
      <SearchBar />
      <NewEntry openModal={() => setModalVisible(true)} />
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.entryList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{editingEntry ? "Edit Journal Entry" : "New Journal Entry"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Entry Name"
            value={entryName}
            onChangeText={setEntryName}
          />
          <TouchableOpacity style={styles.button} onPress={addOrEditEntry}>
            <Text style={styles.buttonText}>{editingEntry ? "Save Changes" : "Save Entry"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  entryList: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  entryIcon: {
    marginRight: 10,
  },
  entryText: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color: 'black',
  },
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
    fontSize: 22,
    fontFamily: 'Roboto',
    color: 'black',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#77A0C6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
});

export default Journal;
