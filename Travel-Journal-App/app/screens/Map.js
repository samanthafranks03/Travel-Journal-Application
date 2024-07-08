import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigationState } from '@react-navigation/native';

const Map = ({ route }) => {
  const entries = route.params?.entries || [];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.0902,
          longitude: -95.7129,
          latitudeDelta: 50,
          longitudeDelta: 100,
        }}
      >
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
