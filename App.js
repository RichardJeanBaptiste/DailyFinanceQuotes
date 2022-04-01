/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */


import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quotes from './components/Quotes';
import Bookmark from './components/Bookmark';
import Authors from './components/Authors';
import Learn from './components/Learn';
//import About from './components/About';
import { DrawerContent } from './components/DrawerContent';
import { Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import LoadScreen from './components/LoadScreen';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  // name of the error/warning here, or a regex here
]);

const MyTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'rgb(28,28,28)',
    //card: 'rgb(255, 255, 255)',
    text: 'white',
    fontFamily: 'Mukta-Regular',
    //border: 'transparent',
    notification: 'rgb(255, 69, 58)',
  },
};


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Home" component={Quotes}
        options={{title: 'Daily Finance',
        headerTitleAlign: 'center',
        headerLeft : () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
          </Pressable>
        ),
        }}
        />
  </Stack.Navigator>
);

const BookmarkScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Favorites" component={Bookmark}
        options={{title: 'Favorites',headerTitleAlign: 'center',
        headerStyle:{ backgroundColor: 'rgb(28,28,28)'},
        headerLeft : () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
          </Pressable>
        ),
        }}/>
  </Stack.Navigator>
);

const AuthorScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Authors" component={Authors}
        options={{title: 'Authors',headerTitleAlign: 'center',
        headerStyle:{ backgroundColor: 'rgb(28,28,28)'},
        headerLeft : () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
          </Pressable>
        ),
        }}/>
  </Stack.Navigator>
);

const LearnScreen = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Learn" component={Learn}
    options={{title: 'Learn',headerTitleAlign: 'center',
    headerStyle:{ backgroundColor: 'rgb(28,28,28)'},
    headerLeft : () => (
      <Pressable onPress={() => navigation.openDrawer()}>
        <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
      </Pressable>
    ),
    }}/>
  </Stack.Navigator>
);

/*
const AboutScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="About" component={About}
        options={{title: 'Authors',headerTitleAlign: 'center',
        headerStyle:{ backgroundColor: 'rgb(28,28,28)'},
        headerLeft : () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
          </Pressable>
        ),
        }}/>
  </Stack.Navigator>
);
*/

export default function App() {

  //const [ isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {

    let tommorrow = new Date();
    tommorrow.setDate(tommorrow.getDate() + 1);

    PushNotification.createChannel({
      channelId: 'Daily-Channel',
      channelName: 'Daily-Channel-Notification',
    });

    PushNotification.getScheduledLocalNotifications((response) => {
      if (response.length === 0){
        PushNotification.localNotificationSchedule({
          channelId: 'Daily-Channel',
          channelName: 'Daily-Channel-Notification',
          message: 'Daily Notification',
          allowWhileIdle: true,
          date: tommorrow,
        });
      } else {
        //console.log('Notification Exists');
      }
    });
  },[]);

  // <Drawer.Screen name="About" component={AboutScreen}/>
  return (
    <NavigationContainer theme={MyTheme} >
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
          {/* Remeber to add drawer item in DrawerContent.js for new screens*/}
          <Drawer.Screen name="Home" component={HomeStackScreen}/>
          <Drawer.Screen name="Favorites" component={BookmarkScreen}/>
          <Drawer.Screen name="Authors" component={AuthorScreen}/>
          <Drawer.Screen name="Learn" component={LearnScreen}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
