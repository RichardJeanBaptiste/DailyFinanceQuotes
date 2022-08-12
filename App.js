/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */

/**
 *  Update Heroku Api
 *  Build Search Function
 *  Complete Notification Feature
 *  Important Finance Terms Screen
 *  Crypto Terms Screen
 *  Refactor Swipe Component
 */

import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quotes from './components/Quotes';
import Bookmark from './components/Bookmark';
import Authors from './components/Authors';
import Learn from './components/Learn';
import Search from './components/Search';
//import SearchScreenNav from './components/SearchScreenNav';
//import About from './components/About';
import { DrawerContent } from './components/DrawerContent';
import { Pressable, Modal, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
//import LoadScreen from './components/LoadScreen';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  'Setting a timer',
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


const SearchComponent = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [ text, onChangeText ] = useState('');

  const OpenQuoteModal = () => {
    setModalVisible(true);
  };

  const SearchForAuthor = ({navigation}) => {

    let uri = 'https://financequotesapi.herokuapp.com/quotes/' + text;

    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        if (data === []){
          console.log('empty');
        } else {
          setModalVisible(false);
          props.goToSearchScreen(data);
          onChangeText('');
        }
      });
  };


  if (!modalVisible) {
    return (
      <Pressable onPress={OpenQuoteModal}>
        <FontAwesome5 name="searchengin" style={{ color: 'white', fontSize: 25, marginRight: 25, marginTop: 5}}/>
      </Pressable>
    );
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: '#2d3439', height: Dimensions.get('window').height}}>
            <View style={{ display: 'flex', flexDirection: 'row',marginLeft: 10}}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ marginTop: 13.5}}>
                <FontAwesome5 name="arrow-left" style={{ color: 'white', fontSize: 20}}/>
              </TouchableOpacity>
              <TextInput
                style={{ backgroundColor: '#2d3439', marginLeft: 15, width: 350, color: 'white', fontSize: 18}}
                onChangeText={onChangeText}
                value={text}
                placeholder="Searching for an author?"
                placeholderTextColor={'white'}
                autoFocus={true}
                onSubmitEditing={SearchForAuthor}
              />
            </View>
        </View>
      </Modal>
    );
  }
};

const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator>
        <Stack.Screen name="Home1" component={Quotes}
          options={{title: 'Daily Finance',
          headerTitleAlign: 'center',
          headerLeft : () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <FontAwesome5 name="bars" style={{ color: 'white', fontSize: 20, marginLeft: 15}}/>
            </Pressable>
          ),
          headerRight : () => (
            <SearchComponent goToSearchScreen={(quotes) => navigation.navigate('Search2', {data: quotes})}/>
          ),
          }}
        />

        <Stack.Screen name="Search2" component={Search}
          options={{title: '',headerTitleAlign: 'center',
          headerStyle:{ backgroundColor: 'rgb(28,28,28)'},
          headerRight : () => (
            <Pressable onPress={() => navigation.navigate('Home1')}>
              <FontAwesome5 name="home" style={{ color: 'white', fontSize: 20, marginRight: 20}}/>
            </Pressable>
          ),
        }}/>
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


const SearchScreen = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Search1" component={Search}
      options={{title: 'Search',headerTitleAlign: 'center',
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

  return (
    <NavigationContainer theme={MyTheme} >
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
          {/* Remeber to add drawer item in DrawerContent.js for new screens*/}
          <Drawer.Screen name="Home" component={HomeStackScreen}/>
          <Drawer.Screen name="Favorites" component={BookmarkScreen}/>
          <Drawer.Screen name="Authors" component={AuthorScreen}/>
          <Drawer.Screen name="Learn" component={LearnScreen}/>
          <Drawer.Screen name="Search" component={SearchScreen}/>
          {/* <Drawer.Screen name="About" component={AboutScreen}/> */}
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
