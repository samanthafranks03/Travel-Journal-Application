// app/tabs/_layout.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import statement
import Journal from '../screens//Journal/Journal';
import Map from '../screens/Map/Map';
import NewTrips from '../screens/NewTrips/NewTrips';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications/Notifications';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Journal':
              iconName = 'book';
              break;
            case 'Map':
              iconName = 'location-outline';
              break;
            case 'New Trips':
              iconName = 'airplane-outline';
              break;
            case 'Notifications':
              iconName = 'notifications-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#BDBBBB',
      })}
    >
      <Tab.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={Map} options={{ headerShown: false }}/>
      <Tab.Screen name="New Trips" component={NewTrips} options={{ headerShown: false }}/>
      <Tab.Screen name="Notifications" component={Notifications}options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabsLayout;