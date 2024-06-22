// app/(tabs)/_layout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import statement
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Map from '../screens/Map';

const Tab = createBottomTabNavigator();

const TabsLayout: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Journal':
              iconName = 'book';
              break;
            case 'Feed':
              iconName = 'list';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Map':
              iconName = 'map';
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
