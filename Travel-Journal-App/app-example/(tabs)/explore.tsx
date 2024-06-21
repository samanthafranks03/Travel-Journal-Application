import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import ExploreScreen from './explore'; // Import the ExploreScreen

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} /> {/* Add the ExploreScreen */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
