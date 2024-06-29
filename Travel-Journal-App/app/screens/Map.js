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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {entries.map((entry) => (
          entry.location && (
            <Marker
              key={entry.id}
              coordinate={{
                latitude: entry.location.latitude,
                longitude: entry.location.longitude,
              }}
              title={entry.name}
              description={entry.locationName}
            />
          )
        ))}
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
