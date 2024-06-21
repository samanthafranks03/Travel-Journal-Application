import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JournalScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Journal Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JournalScreen;
