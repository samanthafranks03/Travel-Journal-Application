import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EntryTabBar from '../elements/EntryTabBar.js';  // Ensure the path is correct

const JournalEntry = ({ navigation, route }) => {
  const { entryId } = route.params;

  const [entryName, setEntryName] = useState(route.params.entryName);
  const [locationName, setLocationName] = useState(route.params.locationName);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [textInputs, setTextInputs] = useState([]);
  const [textBoxColor, setTextBoxColor] = useState('grey');
  const [textColor, setTextColor] = useState('black');
  const [stickers, setStickers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadEntryContent = async () => {
      try {
        const savedContent = await AsyncStorage.getItem(`entry_${entryId}`);
        if (savedContent) {
          const { textInputs, textBoxColor, textColor, stickers, images, collaborators, entryName, locationName } = JSON.parse(savedContent);
          setTextInputs(textInputs);
          setTextBoxColor(textBoxColor);
          setTextColor(textColor);
          setStickers(stickers);
          setImages(images);
          setCollaborators(collaborators);
          setEntryName(entryName);
          setLocationName(locationName);
        }
      } catch (error) {
        console.error('Failed to load entry content', error);
      }
    };

    loadEntryContent();
  }, [entryId]);

  const saveEntryContent = async () => {
    try {
      const entryContent = {
        textInputs,
        textBoxColor,
        textColor,
        stickers,
        images,
        collaborators,
        entryName,
        locationName
      };
      await AsyncStorage.setItem(`entry_${entryId}`, JSON.stringify(entryContent));
      Alert.alert('Success', 'Entry content saved successfully');
    } catch (error) {
      console.error('Failed to save entry content', error);
      Alert.alert('Error', 'Failed to save entry content');
    }
  };

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

  const changeTextBoxColor = (color) => {
    setTextBoxColor(color);
  };

  const changeTextColor = (color) => {
    setTextColor(color);
  };

  const addSticker = (icon) => {
    setStickers([...stickers, { icon }]);
  };

  const addImage = (uri) => {
    setImages([...images, uri]);
  };

  const addNewTextBox = () => {
    const newIndex = textInputs.length + 1;
    const newTextBox = {
      id: newIndex.toString(),
      title: '',
      date: '',
      content: '',
    };
    setTextInputs([...textInputs, newTextBox]);
  };

  const updateTextBox = (index, field, value) => {
    const updatedTextInputs = [...textInputs];
    updatedTextInputs[index][field] = value;
    setTextInputs(updatedTextInputs);
  };

  const renderTextBox = ({ item, index }) => (
    <View key={item.id} style={styles.textBoxContainer}>
      <View style={[styles.textBox, { backgroundColor: textBoxColor }]}>
        <TextInput
          placeholder="Title"
          fontSize={25}
          placeholderTextColor={textColor}
          style={{ color: textColor }}
          value={item.title}
          onChangeText={(text) => updateTextBox(index, 'title', text)}
        />
        <TextInput
          placeholder="Date"
          fontSize={18}
          placeholderTextColor={textColor}
          style={{ color: textColor }}
          value={item.date}
          onChangeText={(text) => updateTextBox(index, 'date', text)}
        />
        <TextInput
          placeholder="Add text here"
          fontSize={15}
          multiline={true}
          placeholderTextColor={textColor}
          style={{ color: textColor }}
          value={item.content}
          onChangeText={(text) => updateTextBox(index, 'content', text)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('Journal') }}>
          <Ionicons style={styles.icon} size={18} name='chevron-back-outline' />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.collabButton} onPress={() => setModalVisible(true)}>
          <Ionicons style={styles.icon} size={18} paddingRight={15} name='person-add-outline' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveEntryContent}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.journalName}
          value={entryName}
          onChangeText={text => setEntryName(text)}
        />
        <Text style={styles.journalLocation}>{locationName}</Text>
      </View>
      <FlatList
        data={textInputs}
        renderItem={renderTextBox}
        keyExtractor={(item) => item.id}
        extraData={{ textColor, textBoxColor }}
      />
      <View style={styles.stickerContainer}>
        {stickers.map((sticker, index) => (
          <Image key={index} source={sticker.icon} style={styles.sticker} />
        ))}
      </View>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>
      <EntryTabBar
        changeTextBoxColor={changeTextBoxColor}
        changeTextColor={changeTextColor}
        addSticker={addSticker}
        addNewTextBox={addNewTextBox}
        addImage={addImage}
        style={{ position: 'absolute', flex: 1 }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={20} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    padding: 15,
    justifyContent: 'space-between',
  },
  icon: {
    alignItems: 'left',
    justifyContent: 'left',
  },
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
  journalName: {
    color: 'black',
    fontSize: 35,
    fontFamily: 'Roboto',
    paddingLeft: 20,
  },
  journalLocation: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingLeft: 20,
  },
  textBoxContainer: {
    padding: 10,
  },
  textBox: {
    borderWidth: 20,
    borderColor: 'white',
    height: 200,
    padding: 15,
    flexGrow: 1,
    borderRadius: 40,
  },
  stickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  sticker: {
    margin: 5,
    width: 50,
    height: 50
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
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
    backgroundColor: "black",
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
});

export default JournalEntry;
