import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function NewEntry({ openModal }) {
  return (
    <TouchableOpacity style={styles.container} onPress={openModal}>
      <Icon style={styles.icon} size={45} name='plussquareo' />
      <Text style={styles.text}>New Entry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  text: {
    color: '#306182',
    fontSize: 25,
    fontFamily: 'Roboto',
  },
  icon: {
    color: '#306182',
    marginRight: 10,
    size: 30
  },
});
