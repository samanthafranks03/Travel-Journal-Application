// app/screens/Feed.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Feed: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Feed;
