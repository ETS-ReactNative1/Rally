import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as pages from './App/pages';

const StackNav = createStackNavigator({
  Home: {screen: pages.Home},
  FilterEvents: {screen: pages.FilterEvents},
  FilterRallies: {screen: pages.FilterRallies},
  FilterFriends: {screen: pages.FilterFriends},
  Messages: {screen: pages.Messages},
  Profile: {screen: pages.Profile},
  EventOne: {screen: pages.EventOne},
  EventOneExpanded: {screen: pages.EventOneExpanded},
},{
   initialRouteName: 'Home',
});

const MyApp = createAppContainer(StackNav);
export default MyApp;
