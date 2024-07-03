import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EntryTabBar() {
  return (
    <View style={styles.container}> 
        <View style={styles.header}>
        {/*Font*/}
        <TouchableOpacity > 
        <MIcon size = {20} name="text-fields"/>
        </TouchableOpacity> 
    

        {/*Color*/}
        <TouchableOpacity > 
        <MIcon size = {20} name="format-color-text" />
        </TouchableOpacity> 

        {/*Add text box*/}
        <TouchableOpacity > 
        <MIcon size = {40} name="add-circle-outline"/>
        </TouchableOpacity> 

        {/*Sticker*/}
        <TouchableOpacity > 
        <MCIcon size = {20} name="sticker-emoji" />
        </TouchableOpacity> 

        {/*Image Upload*/}
        <TouchableOpacity style={styles.collabButton}>
            <MCIcon size = {20} name='image-outline' /> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  //Back button
  icon: {
    alignItems: 'left',
    justifyContent: 'left'
  },
  //Save button
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
});