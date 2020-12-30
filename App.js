/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */
import {Swipeable} from  'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button, LogBox} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quotes from './components/Quotes';
import Bookmark from './components/Bookmark';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.' 
  // name of the error/warning here, or a regex here
]);

const MyTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'rgb(28,28,28)',
    //card: 'rgb(255, 255, 255)',
    text: 'white',
    fontFamily: 'monospace',
    border: 'transparent',
    notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Home" component={Quotes} options={{title: 'Daily Finance',headerTitleAlign: 'center', headerStyle:{ backgroundColor: 'rgb(28,28,28)'}}}/>
  </Stack.Navigator>
);

const BookmarkScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Saved" component={Bookmark} options={{title: 'Daily Finance',headerTitleAlign: 'center', headerStyle:{ backgroundColor: 'rgb(28,28,28)'}}}/>
  </Stack.Navigator>
);



export default function App() {

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Saved" component={BookmarkScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
