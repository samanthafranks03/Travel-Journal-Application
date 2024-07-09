import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../App';
import { useFocusEffect } from '@react-navigation/native';

const Map = () => {
  const [entries, setEntries] = useState([]);

  const loadEntries = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const q = query(collection(db, 'entries'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userEntries = [];
        querySnapshot.forEach(doc => {
          userEntries.push({ id: doc.id, ...doc.data() });
        });
        console.log('Entries fetched: ', userEntries); // Log fetched entries
        setEntries(userEntries);
      } catch (error) {
        console.error('Failed to load entries', error);
        Alert.alert('Error', 'Failed to load entries');
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [loadEntries])
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: entries.length > 0 ? entries[0].location.latitude : 37.78825,
          longitude: entries.length > 0 ? entries[0].location.longitude : -122.4324,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        {entries.map((entry) => (
          entry.location && (
            <Marker
              key={entry.id}
              coordinate={entry.location}
              title={entry.name}
              description={entry.locationName}
            />
          )
        ))}
      </MapView>
      {entries.length === 0 && (
        <View style={styles.noEntries}>
          <Text>No entries found.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noEntries: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50, 
    marginTop: -10, 
    alignItems: 'center',
  },
});

export default Map;