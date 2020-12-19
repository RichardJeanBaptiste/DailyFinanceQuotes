/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quotes from './components/Quotes';

const MyTheme = {
  dark: false,
  colors: {
    //primary: 'rgb(255, 45, 85)',
    background: 'rgb(31,25,18)',
    //card: 'rgb(255, 255, 255)',
    text: 'white',
    //border: 'rgb(199, 199, 204)',
    //notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Home" component={Quotes} options={{title: 'Daily Finance Quote', headerTitleAlign: 'center'}}/>
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}




/*

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgb(31,25,18)',
    height: 1000,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
      <SafeAreaView>
        <Navbar/>
        <Quotes/>
      </SafeAreaView>
      </View>
    );
  }
}

export default App;
*/