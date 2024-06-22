// app/tabs/_layout.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import statement
import Journal from '../screens/Journal';
import Map from '../screens/Map';
import NewTrips from '../screens/NewTrips';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications';

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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="New Trips" component={NewTrips} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
};

export default TabsLayout;