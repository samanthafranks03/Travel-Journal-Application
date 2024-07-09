import React, { useState, useRef} from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Button, ScrollView, Image, PanResponder, Animated} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import ColorPicker from 'react-native-wheel-color-picker';

const EntryTabBar = ({ changeTextBoxColor, changeTextColor, addSticker, addNewTextBox, addImage }) => {
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [textColorModalVisible, setTextColorModalVisible] = useState(false);
  const [stickerModalVisible, setStickerModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#d3d3d3');
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [image, setImage] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

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
      {/* Draggable Image */}
      {image && (
        <Animated.View
          style={[styles.draggableContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </Animated.View>
      )}

      {/* Bottom Tab Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setColorModalVisible(true)}>
          <MaterialIcons size={20} name="format-color-fill" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTextColorModalVisible(true)}>
          <MaterialIcons size={20} name="format-color-text" />
        </TouchableOpacity>

        <TouchableOpacity onPress={addNewTextBox}>
          <MaterialIcons size={40} name="add-circle-outline" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStickerModalVisible(true)}>
          <MaterialCommunityIcons size={20} name="sticker-emoji" />
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
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
            <Button title="Select Color" onPress={handleColorSelect} color="#98B6D0" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setColorModalVisible(false) }} color="#98B6D0" />
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
            <Button title="Select Text Color" onPress={handleTextColorSelect} color="#98B6D0" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setTextColorModalVisible(false) }} color="#98B6D0" />
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
            <Button title="Select Sticker" onPress={handleStickerSelect} color="#98B6D0" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { setStickerModalVisible(false) }}  color="#98B6D0"/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
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
    margin: 5,
  },
  draggableContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default EntryTabBar;