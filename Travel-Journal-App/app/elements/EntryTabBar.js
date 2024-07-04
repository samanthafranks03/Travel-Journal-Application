import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const openCamera = async () => {
  const result = await launchImageLibrary();
};

const EntryTabBar = () => {
  const [textInputs, setTextInputs] = useState([]);

  //Add new text box under the existing ones
  const addNewTextBox = () => {
    const newTextBox = (
      <View key={textInputs.length} style={styles.textBoxContainer}>
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

      </View>
    );
    setTextInputs([newTextBox, ...textInputs]);
  };

  return (
    <View style={styles.container}>
        {/* Render text inputs */}
        {textInputs.map((textInput, index) => (
        <View key={index}>{textInput}</View>
      ))}

      <View style={styles.header}>
        {/* Font */}
        <TouchableOpacity>
          <MIcon size={20} name="text-fields" />
        </TouchableOpacity>

        {/* Color */}
        <TouchableOpacity>
          <MIcon size={20} name="format-color-text" />
        </TouchableOpacity>

        {/* Add text box */}
        <TouchableOpacity onPress={() => {
          addNewTextBox();

        }}>
          <MIcon size={40} name="add-circle-outline" />
        </TouchableOpacity>

        {/* Sticker */}
        <TouchableOpacity>
          <MCIcon size={20} name="sticker-emoji" />
        </TouchableOpacity>

        {/* Image Upload */}
        <TouchableOpacity onPress={openCamera}>
          <MCIcon size={20} name='image-outline' />
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
  },
    //Text box
    textBox: {
      backgroundColor: 'grey',
      borderWidth: 20,
      borderColor: 'white',
      height: 200,
      padding: 15,
      flexGrow: 1,
      borderRadius: 40
    },
});

export default EntryTabBar;