import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../App';
import NotificationsHeader from './ScreenHeader.js';

const fetchUsername = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().username;
  } else {
    console.error('No such user document!');
    return null;
  }
};

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const q = query(collection(db, 'notifications'), where('recipientId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userNotifications = [];
        querySnapshot.forEach(doc => {
          userNotifications.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(userNotifications);
      } catch (error) {
        console.error('Failed to load notifications', error);
      }
    };

    loadNotifications();
  }, [user]);

  const handleAccept = async (notification) => {
    try {
      // Fetch the recipient's username
      const recipientUsername = await fetchUsername(user.uid);

      // Add collaborator to the entry document
      const entryRef = doc(db, 'entries', notification.entryId);
      const entryDoc = await getDoc(entryRef);
      if (entryDoc.exists()) {
        const entryData = entryDoc.data();
        await updateDoc(entryRef, {
          collaborators: [...entryData.collaborators, recipientUsername]
        });

        // Delete the notification
        const notificationRef = doc(db, 'notifications', notification.id);
        await deleteDoc(notificationRef);

        Alert.alert('Success', `You are now a collaborator on ${notification.entryName}.`);
        setNotifications(notifications.filter(n => n.id !== notification.id));

        // Refresh the entries for the user
        navigation.navigate('Journal', { refresh: true });
      } else {
        Alert.alert('Error', 'Entry not found.');
      }
    } catch (error) {
      console.error('Failed to accept collaboration', error);
      Alert.alert('Error', 'Failed to accept collaboration.');
    }
  };

  const handleDeny = async (notification) => {
    try {
      // Delete the notification
      const notificationRef = doc(db, 'notifications', notification.id);
      await deleteDoc(notificationRef);

      Alert.alert('Success', 'Collaboration invitation denied.');
      setNotifications(notifications.filter(n => n.id !== notification.id));
    } catch (error) {
      console.error('Failed to deny collaboration', error);
      Alert.alert('Error', 'Failed to deny collaboration.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationText}><Text style={styles.boldText}>{item.senderName}</Text> invited you to collaborate on their <Text style={styles.boldText}>{item.entryName}</Text> Journal! Press accept to collaborate!</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleAccept(item)} style={styles.acceptButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeny(item)} style={styles.denyButton}>
          <Text style={styles.buttonText}>Deny</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <NotificationsHeader headerTitle="Notifications" navigation={navigation} />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  denyButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notifications;