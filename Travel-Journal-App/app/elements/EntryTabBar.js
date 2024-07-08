import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Button, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import ColorPicker from 'react-native-wheel-color-picker';

const openImageLibrary = async (setSelectedImage) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access media library denied');
    return;
  }

  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  ImagePicker.launchImageLibraryAsync(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setSelectedImage(response.assets[0].uri);
    }
  });
};

const EntryTabBar = ({ changeTextBoxColor, changeTextColor, addSticker, addNewTextBox, addImage }) => {
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [textColorModalVisible, setTextColorModalVisible] = useState(false);
  const [stickerModalVisible, setStickerModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color);
  };

  const handleColorSelect = () => {
    changeTextBoxColor(selectedColor);
    setColorModalVisible(false);
  };

  const handleTextColorSelect = () => {
    changeTextColor(selectedTextColor);
    setTextColorModalVisible(false);
  };

  const handleStickerSelect = () => {
    addSticker(selectedIcon);
    setStickerModalVisible(false);
  };

  const handleImageSelect = (uri) => {
    addImage(uri);
  };

  const icons = [
    require('../../assets/icons/travel.png'),
    require('../../assets/icons/airplane.png'),
    require('../../assets/icons/tickets.png'),
    require('../../assets/icons/luggage.png'),
    require('../../assets/icons/map.png'),
    require('../../assets/icons/postcard.png'),
    require('../../assets/icons/roadtrip.png'),
    require('../../assets/icons/beach.png'),
    require('../../assets/icons/palm-tree.png'),
    require('../../assets/icons/drink.png'),
    require('../../assets/icons/surf.png'),
    require('../../assets/icons/sailboat.png'),
    require('../../assets/icons/cruise.png'),
    require('../../assets/icons/desert.png'),
    require('../../assets/icons/camping.png'),
    require('../../assets/icons/campfire.png'),
    require('../../assets/icons/sign-post.png'),
    require('../../assets/icons/hiking.png'),
    require('../../assets/icons/mountain.png'),
    require('../../assets/icons/lake.png'),
    require('../../assets/icons/ski.png'),
    require('../../assets/icons/snowboard.png'),
    require('../../assets/icons/shopping.png'),
    require('../../assets/icons/city.png'),
    require('../../assets/icons/art.png'),
    require('../../assets/icons/monument.png'),
    require('../../assets/icons/market.png'),
    require('../../assets/icons/restaurant.png'),
    require('../../assets/icons/cheers.png'),
    require('../../assets/icons/confetti.png'),
    require('../../assets/icons/sun.png'),
    require('../../assets/icons/snow.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Change Text Box Color */}
        <TouchableOpacity onPress={() => setColorModalVisible(true)}>
          <MaterialIcons size={20} name="format-color-fill" />
        </TouchableOpacity>

        {/* Change Text Color */}
        <TouchableOpacity onPress={() => setTextColorModalVisible(true)}>
          <MaterialIcons size={20} name="format-color-text" />
        </TouchableOpacity>

        {/* Add Text Box */}
        <TouchableOpacity onPress={addNewTextBox}>
          <MaterialIcons size={40} name="add-circle-outline" />
        </TouchableOpacity>

        {/* Add Sticker */}
        <TouchableOpacity onPress={() => setStickerModalVisible(true)}>
          <MaterialCommunityIcons size={20} name="sticker-emoji" />
        </TouchableOpacity>

        {/* Add Image */}
        <TouchableOpacity onPress={() => openImageLibrary(handleImageSelect)}>
          <MaterialCommunityIcons size={20} name='image-outline' />
        </TouchableOpacity>
      </View>

      {/* Color Picker for Text Box */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={() => setColorModalVisible(false)}
      >
        <View style={styles.colorPickerContainer}>
          <ColorPicker
            color={selectedColor}
            onColorChangeComplete={handleColorChange}
            thumbSize={40}
            sliderSize={40}
            noSnap={true}
            row={false}
            wheelLodingIndicator={<ActivityIndicator size={40} />}
            sliderLodingIndicator={<ActivityIndicator size={20} />}
            useNativeDriver={false}
            useNativeLayout={false}
          />
          <View style={styles.buttonContainer}>
            <Button title="Select Color" onPress={handleColorSelect} color="#6200EE" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setColorModalVisible(false) }} color="#6200EE" />
          </View>
        </View>
      </Modal>

      {/* Color Picker for Text */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={textColorModalVisible}
        onRequestClose={() => setTextColorModalVisible(false)}
      >
        <View style={styles.colorPickerContainer}>
          <ColorPicker
            color={selectedTextColor}
            onColorChangeComplete={handleTextColorChange}
            thumbSize={40}
            sliderSize={40}
            noSnap={true}
            row={false}
            wheelLodingIndicator={<ActivityIndicator size={40} />}
            sliderLodingIndicator={<ActivityIndicator size={20} />}
            useNativeDriver={false}
            useNativeLayout={false}
          />
          <View style={styles.buttonContainer}>
            <Button title="Select Text Color" onPress={handleTextColorSelect} color="#6200EE" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setTextColorModalVisible(false) }} color="#6200EE" />
          </View>
        </View>
      </Modal>

      {/* Sticker Picker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={stickerModalVisible}
        onRequestClose={() => setStickerModalVisible(false)}
      >
        <View style={styles.stickerPickerContainer}>
          <ScrollView contentContainerStyle={styles.iconList}>
            {icons.map(icon => (
              <TouchableOpacity
                key={icon}
                style={styles.iconContainer}
                onPress={() => setSelectedIcon(icon)}
              >
                <Image
                  source={icon}
                  style={{ width: 70, height: 70 }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Select Sticker" onPress={handleStickerSelect} color="#6200EE" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setStickerModalVisible(false) }} color="#6200EE" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 40,
  },
  stickerPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  iconList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    margin: 10,
  },
});

export default EntryTabBar;