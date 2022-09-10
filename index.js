/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';



// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('notification clicked');
    //console.log('NOTIFICATION:', notification);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('action clicked');
    //console.log("ACTION:", notification.action);
    //console.log("NOTIFICATION:", notification);

    // process the action
  },


  requestPermissions: Platform.OS === 'ios'

});




AppRegistry.registerComponent(appName, () => App);
