import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function NewEntry({ openModal }) {
  return (
    <TouchableOpacity style={styles.container} onPress={openModal}>
      <Icon style={styles.icon} size={30} name='plussquareo' />
      <Text style={styles.text}>New Entry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  text: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Roboto',
  },
  icon: {
    color: 'black',
    marginRight: 10,
  },
});
