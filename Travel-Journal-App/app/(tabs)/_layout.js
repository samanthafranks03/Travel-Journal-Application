import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Journal from '../screens/Journal';
import Map from '../screens/Map';
import Notifications from '../screens/Notifications';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Journal':
              iconName = 'book';
              break;
            case 'Map':
              iconName = 'location-outline';
              break;
            /*case 'NewTrips':
              iconName = 'airplane-outline';
              break; */
            case 'Notifications':
              iconName = 'notifications-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#98B6D0',
        tabBarInactiveTintColor: '#BDBBBB',
      })}
    >
      <Tab.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
