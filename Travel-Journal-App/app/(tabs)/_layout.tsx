// app/(tabs)/_layout.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Map from '../screens/Map';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
