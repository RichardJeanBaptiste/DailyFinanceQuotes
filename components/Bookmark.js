/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/**
 * 
 * Save Quotes W/ Async Storage
 *      - Get All Keys
 *      - Render in New Component
 * 
 * check for new quotes - useFocuseffect()
 * check for duplicate quotes
 * delete quotes onClick
 */
import 'react-native-gesture-handler';
import React, {Component, useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View, Linking, Button, Share} from 'react-native';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';


function Bookmark(){

  const [list, setList] = useState([]);



  useEffect(() => {

    const getSavedQuotes = async () => {

      let keys = await AsyncStorage.getAllKeys();
      let values = await AsyncStorage.multiGet(keys);
      let temp = [];

      values.map((value) => {
        temp.push({id: value[0], quote: value[1] });
      });
      setList(temp);

    };

    getSavedQuotes();
  },[]);


  const renderQuote = ({item}) => {
    return (
      <Text style={{color:'white'}}>
        {item.quote}
      </Text>
    );
  };


  return (
    <SafeAreaView>
      <FlatList
        data={list}
        renderItem={renderQuote}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  );
}

export default Bookmark;
