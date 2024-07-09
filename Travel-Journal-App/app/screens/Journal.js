import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
<<<<<<< HEAD
import { auth, db } from '../App'; 
import { doc, addDoc, getDocs, query, collection, where, updateDoc, deleteDoc } from 'firebase/firestore';
=======
import { auth, db } from '../App';
import { doc, addDoc, getDocs, query, collection, where, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
>>>>>>> refs/remotes/origin/main
import JournalHeader from './ScreenHeader.js';
import NewEntry from '../elements/NewEntry.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';

const fetchUsername = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().username;
  } else {
    console.error('No such user document!');
    return null;
  }
};

const Journal = ({ navigation, route }) => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryName, setEntryName] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  const [username, setUsername] = useState('');

  const user = auth.currentUser;
  const isFocused = useIsFocused();

  const loadEntries = async () => {
    if (user) {
      try {
        const fetchedUsername = await fetchUsername(user.uid);
        setUsername(fetchedUsername);

        const userEntries = [];

        const q1 = query(collection(db, 'entries'), where('userId', '==', user.uid));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          userEntries.push({ id: doc.id, ...doc.data() });
        });

        const q2 = query(collection(db, 'entries'), where('collaborators', 'array-contains', fetchedUsername));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          userEntries.push({ id: doc.id, ...doc.data() });
        });

        // Remove duplicates
        const uniqueEntries = Array.from(new Set(userEntries.map(a => a.id)))
          .map(id => {
            return userEntries.find(a => a.id === id)
          });

        setEntries(uniqueEntries);
      } catch (error) {
        console.error('Failed to load entries', error);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadEntries();
    }
  }, [isFocused]);

  const generateUniqueName = (name, excludeId = null) => {
    let uniqueName = name;
    let counter = 1;
    const existingNames = new Set(
      entries.filter((entry) => entry.id !== excludeId).map((entry) => entry.name)
    );
    while (existingNames.has(uniqueName)) {
      uniqueName = `${name} (${counter})`;
      counter += 1;
    }
    return uniqueName;
  };

  const updateEntryName = async (entryId, newName) => {
    try {
      await updateDoc(doc(db, 'entries', entryId), { name: newName });
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId ? { ...entry, name: newName } : entry
        )
      );
    } catch (error) {
      console.error('Failed to update entry name', error);
      Alert.alert('Error', 'Failed to update entry name');
    }
  };

  const addOrEditEntry = async () => {
    if (entryName.trim() === '') {
      Alert.alert('Error', 'Entry name cannot be empty.');
      return;
    }

<<<<<<< HEAD
    if (!location) {
      Alert.alert("Error", "Location cannot be empty.");
      return;
    }

    const uniqueName = generateUniqueName(entryName, editingEntry ? editingEntry.id : null);
=======
    const uniqueName = generateUniqueName(
      entryName,
      editingEntry ? editingEntry.id : null
    );
>>>>>>> refs/remotes/origin/main
    const newEntry = { name: uniqueName, location, locationName, userId: user.uid };

    try {
      if (editingEntry) {
        const entryRef = doc(db, 'entries', editingEntry.id);
        const entryDoc = await getDoc(entryRef);
        if (entryDoc.exists()) {
          const entryData = entryDoc.data();
          await updateDoc(entryRef, {
            ...entryData,
            name: uniqueName,
            location,
            locationName
          });
        }

        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editingEntry.id ? { ...entry, ...newEntry } : entry
          )
        );
        setEditingEntry(null);
      } else {
        const docRef = await addDoc(collection(db, 'entries'), newEntry);
        setEntries((prevEntries) => [...prevEntries, { id: docRef.id, ...newEntry }]);
      }
      setEntryName('');
      setLocation(null);
      setLocationName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to save entry', error);
      Alert.alert('Error', 'Failed to save entry');
    }
  };

  const deleteEntry = async () => {
    if (editingEntry) {
      try {
        await deleteDoc(doc(db, 'entries', editingEntry.id));
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== editingEntry.id)
        );
        setEditingEntry(null);
        setModalVisible(false);
      } catch (error) {
        console.error('Failed to delete entry', error);
        Alert.alert('Error', 'Failed to delete entry');
      }
    }
  };

  const editEntry = (entry) => {
    setEditingEntry(entry);
    setEntryName(entry.name);
    setLocation(entry.location);
    setLocationName(entry.locationName);
    setModalVisible(true);
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setEntryName('');
    setLocation(null);
    setLocationName('');
    setModalVisible(true);
  };

  const onMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
    setLocationName(
      `Lat: ${coordinate.latitude.toFixed(2)}, Lon: ${coordinate.longitude.toFixed(2)}`
    );
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.entry} onPress={() => editEntry(item)}>
        <Icon name="book" size={45} color="black" style={styles.entryIcon} />
        <Text style={styles.entryText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <JournalHeader headerTitle="Journal" navigation={navigation} />
      <View style={styles.newEntryButton}>
        <View style={styles.test}>
          <NewEntry openModal={handleNewEntry} />
        </View>
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.entryList}
<<<<<<< HEAD
          style={{flex: 1, marginBottom: 50}}
=======
          style={{ flex: 1 }}
>>>>>>> origin/collab-notifications
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
<<<<<<< HEAD
          <View style={styles.close}>
=======
<<<<<<< HEAD
        <View style={styles.close}>
>>>>>>> refs/remotes/origin/main
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>{editingEntry ? "Edit Journal Entry" : "New Journal Entry"}</Text>
=======
          <Text style={styles.modalText}>
            {editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
          </Text>
>>>>>>> origin/collab-notifications
          <TextInput
            style={styles.input}
            placeholder="Entry Name"
            value={entryName}
            onChangeText={setEntryName}
          />
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                console.log("Selected location:", { lat, lng, description: data.description }); // Add logging
                setLocation({ latitude: lat, longitude: lng });
                setLocationName(data.description);
              } else {
                console.error("Details are null");
              }
            }}
            query={{
              key: 'AIzaSyBw2lOAQ7hUSvyEp6WlTpgt2VcsiRgyVfg',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              container: styles.autocompleteContainer,
              textInputContainer: styles.autocompleteTextInputContainer,
              textInput: styles.autocompleteInput,
              listView: styles.autocompleteListView,
            }}
          />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.latitude : 37.78825,
              longitude: location ? location.longitude : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={onMapPress}
          >
            {location && (
              <Marker coordinate={location} title={locationName} />
            )}
          </MapView>
          {editingEntry && (
            <View style={styles.buttonContainer}>
<<<<<<< HEAD
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('JournalEntry', {
                    entryId: editingEntry.id,
                    entryName,
                    locationName,
                    updateEntryName: updateEntryName,
                  });
=======
<<<<<<< HEAD
              <TouchableOpacity style={styles.button} onPress={() => {
                setModalVisible(false);
                navigation.navigate('JournalEntry', {
                  entryId: editingEntry.id,
                  entryName,
                  locationName,
                  updateEntryName: updateEntryName
                });
>>>>>>> refs/remotes/origin/main
                }}
              >
                <Text style={styles.buttonText}>Open Entry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={deleteEntry}>
                <Text style={styles.buttonText}>Delete Entry</Text>
=======
              <TouchableOpacity style={styles.button} onPress={deleteEntry}>
                <Text style={styles.buttonText}>Delete Entry</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('JournalEntry', {
                    entryId: editingEntry.id,
                    entryName,
                    locationName,
                    updateEntryName: updateEntryName,
                  });
                }}
              >
                <Text style={styles.buttonText}>Open Entry</Text>
>>>>>>> origin/collab-notifications
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={addOrEditEntry}>
<<<<<<< HEAD
            <Text style={styles.buttonText}>{editingEntry ? 'Save Changes' : 'Save Entry'}</Text>
=======
            <Text style={styles.buttonText}>
              {editingEntry ? 'Save Changes' : 'Save Entry'}
            </Text>
>>>>>>> refs/remotes/origin/main
          </TouchableOpacity>
<<<<<<< HEAD
=======
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
>>>>>>> origin/collab-notifications
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  entry: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 18,
    marginTop: 20,
    marginHorizontal: 20,
  },
  entryIcon: {
    marginRight: 10,
    color: '#385e8a',
  },
  entryText: {
    fontSize: 25,
    fontFamily: 'Roboto',
    color: '#385e8a',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    fontSize: 35,
    fontFamily: 'Roboto',
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 18,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  autocompleteContainer: {
    width: '100%',
    zIndex: 1,
    borderRadius: 18,
  },
  autocompleteTextInputContainer: {
    width: '100%',
    borderRadius: 18,
  },
  autocompleteInput: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  autocompleteListView: {
    position: 'absolute',
    top: 40,
    zIndex: 2,
    borderRadius: 18,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#98B6D0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  newEntryButton: {
    flex: 1,
    flexGrow: 1,
  },
  test: {
    padding: 10,
  },
<<<<<<< HEAD
  close: {
    alignSelf: 'flex-end',
  },
=======
>>>>>>> origin/collab-notifications
});

export default Journal;
