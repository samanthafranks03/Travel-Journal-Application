import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import JournalHeader from './ScreenHeader.js';
import SearchBar from '../elements/SearchBar.js';
import NewEntry from '../elements/NewEntry.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Slider from '@react-native-community/slider';


const Journal = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryName, setEntryName] = useState('');
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  const [search, setSearch] = useState('');

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

  const updateSearch = (search) => {
      setSearch
  }

  const addOrEditEntry = () => {
    if (entryName.trim() === '') {
      Alert.alert("Error", "Entry name cannot be empty.");
      return;
    }

    const uniqueName = generateUniqueName(entryName, editingEntry ? editingEntry.id : null);

    if (editingEntry) {
      setEntries(prevEntries => prevEntries.map(entry =>
        entry.id === editingEntry.id ? { ...entry, name: uniqueName, location, locationName } : entry
      ));
      setEditingEntry(null);
    } else {
      const newEntry = { id: Date.now().toString(), name: uniqueName, location, locationName };
      setEntries((prevEntries) => [...prevEntries, newEntry]);
    }

    setEntryName('');
    setLocation(null);
    setLocationName('');
    setModalVisible(false);
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
    <TouchableOpacity style={styles.entry} onPress={() => editEntry(item)}>
      <Icon name='book' size={30} color='black' style={styles.entryIcon} />
      <Text style={styles.entryText}>{item.name}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>

      <JournalHeader headerTitle="Journal" navigation={navigation} />
      {/*<SearchBar onChangeText={updateSearch} value={search} /> */}
      <View style={styles.newEntryButton} > 
      <View style={styles.test} > 
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
          {!location && (
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
          )}
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
          {editingEntry && (<TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => { navigation.navigate('JournalEntry', { entryName, locationName }); }}>{editingEntry ? "Open Entry" : ""}</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={styles.button} onPress={addOrEditEntry} >
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
  entryList: {
  },
  entry: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 18,
    marginTop: 10,
    marginHorizontal: 20, // Add horizontal margins to center the entries
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
  button: {
    backgroundColor: '#c3c3c3',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
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
    padding: 10
  }
});

export default Journal;
