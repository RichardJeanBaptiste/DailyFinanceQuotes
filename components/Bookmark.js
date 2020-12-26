/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/**
 * 
 * Save Quotes W/ Async Storage
 *      - Get All Keys
 *      - Render in New Component
 * 
 * check for new quotes
 * 
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View, Linking, Button, Share} from 'react-native';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Bookmark extends Component {

  constructor(props) {
    super(props);
    this.state = {list: ''};
    this.getAllKeys = this.getAllKeys.bind(this);
    this.keys = [];
    this.values;
  }

  async componentDidMount(){
    try {
      this.keys = await AsyncStorage.getAllKeys();
      this.values = await AsyncStorage.multiGet(this.keys);
    } catch (e){
        console.log(e);
    }

    this.getAllKeys();

  }

  getAllKeys = async () => {
    let keys = [];
    let values;
    let test = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      // read key error
      console.log(e);
    }

    values.map((value) =>
      test.push({id: value[0], quote: value[1]})
    );

    this.setState({
      list: test,
    });
    console.log(this.state.list);
  }


  render() {

    this.getAllKeys;

    const renderQuote = ({ item }) => (
      <Text>{item.quote}</Text>
    );

    return (
      <SafeAreaView>
        <FlatList
          data={this.state.list}
          renderItem={renderQuote}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

    );
  }
}


export default Bookmark;

