/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/**
 * 
 * Save Quotes W/ Async Storage
 *      - Get All Keys
 *      - Render in New Component
 * 
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View, Linking, Button, Share} from 'react-native';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';




class Bookmark extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <SafeAreaView>
         <Text>ABCD</Text>
      </SafeAreaView>

    );
  }
}


export default Bookmark;

