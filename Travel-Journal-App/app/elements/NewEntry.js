import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function NewEntry({ openModal }) {
  return (
    <TouchableOpacity style={styles.container} onPress={openModal}>
      <Icon style={styles.icon} size={100} name='plussquareo' />
      <Text style={styles.text}>New Entry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 175,
  },
  text: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Roboto',
  },
  icon: {
    color: '#77A0C6',
    fontSize: 100,
    paddingHorizontal: 20,
  },
});
