import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '../App'; 
import { doc, addDoc, getDoc, getDocs, query, collection, where, updateDoc, deleteDoc } from 'firebase/firestore';
import JournalHeader from './ScreenHeader.js';
import NewEntry from '../elements/NewEntry.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Journal = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryName, setEntryName] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const user = auth.currentUser;

  useEffect(() => {
    const loadEntries = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'entries'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userEntries = [];
          querySnapshot.forEach(doc => {
            userEntries.push({ id: doc.id, ...doc.data() });
          });
          setEntries(userEntries);
        } catch (error) {
          console.error('Failed to load entries', error);
        }
      }
    };

    loadEntries();
  }, [user]);

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

  const addOrEditEntry = async () => {
    if (entryName.trim() === '') {
      Alert.alert("Error", "Entry name cannot be empty.");
      return;
    }

    const uniqueName = generateUniqueName(entryName, editingEntry ? editingEntry.id : null);
    const newEntry = { name: uniqueName, location, locationName, userId: user.uid };

    try {
      if (editingEntry) {
        await updateDoc(doc(db, 'entries', editingEntry.id), newEntry);
        setEntries(prevEntries => prevEntries.map(entry => 
          entry.id === editingEntry.id ? { ...entry, ...newEntry } : entry
        ));
        setEditingEntry(null);
      } else {
        const docRef = await addDoc(collection(db, 'entries'), newEntry);
        setEntries(prevEntries => [...prevEntries, { id: docRef.id, ...newEntry }]);
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
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== editingEntry.id));
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

  const onMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
    setLocationName(`Lat: ${coordinate.latitude.toFixed(2)}, Lon: ${coordinate.longitude.toFixed(2)}`);
  };

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.entry}
      onPress={() => editEntry(item)}
    >
      <Icon name='book' size={45} color='black' style={styles.entryIcon} />
      <Text style={styles.entryText}>{item.name}</Text>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <JournalHeader headerTitle="Journal" navigation={navigation} />
      <View style={styles.newEntryButton}>
        <View style={styles.test}>
          <NewEntry openModal={() => setModalVisible(true)} />
        </View>
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.entryList}
          style={{flex: 1}}
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
          <Text style={styles.modalText}>{editingEntry ? "Edit Journal Entry" : "New Journal Entry"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Entry Name"
            value={entryName}
            onChangeText={setEntryName}
          />
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;
              setLocation({ latitude: lat, longitude: lng });
              setLocationName(data.description);
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
              <Marker
                coordinate={location}
                title={locationName}
              />
            )}
          </MapView>
          {editingEntry && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={deleteEntry}>
                <Text style={styles.buttonText}>Delete Entry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {
                setModalVisible(false);
                navigation.navigate('JournalEntry', { entryId: editingEntry.id, entryName, locationName });
              }}>
                <Text style={styles.buttonText}>Open Entry</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  entryText: {
    fontSize: 25,
    fontFamily: 'Roboto',
    color: 'black',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#c3c3c3',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '48%',
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
  }
});

export default Journal;
