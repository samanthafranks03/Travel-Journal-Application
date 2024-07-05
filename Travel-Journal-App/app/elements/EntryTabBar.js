import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Button, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import ColorPicker from 'react-native-wheel-color-picker';

const openImageLibrary = (setSelectedImage) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, (response) => {
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
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [selectedStickerColor, setSelectedStickerColor] = useState('#000000');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color);
  };

  const handleStickerColorChange = (color) => {
    setSelectedStickerColor(color);
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
    addSticker(selectedIcon, selectedStickerColor);
    setStickerModalVisible(false);
  };

  const handleImageSelect = (uri) => {
    addImage(uri);
  };

  const icons = [
    'star', 'heart', 'thumb-up', 'thumb-down', 'check-circle', 'close-circle', 'alert-circle', 'information', 'camera', 'flag', 'music-note', 'tag', 'trophy'
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
            ref={r => { this.picker = r }}
            color={selectedColor}
            onColorChange={handleColorChange}
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
            ref={r => { this.picker = r }}
            color={selectedTextColor}
            onColorChange={handleTextColorChange}
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
                <MaterialCommunityIcons
                  name={icon}
                  size={40}
                  color={selectedIcon === icon ? selectedStickerColor : 'black'}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ColorPicker
            ref={r => { this.picker = r }}
            color={selectedStickerColor}
            onColorChange={handleStickerColorChange}
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
            <Button title="Select Sticker" onPress={handleStickerSelect} color="#6200EE" />
          </View>
        </View>
      </Modal>
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
  colorPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
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
