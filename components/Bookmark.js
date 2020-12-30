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
import React, {useCallback, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, Text, StyleSheet, View, Button, Share , LogBox} from 'react-native';
import 'react-native-get-random-values';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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

  useFocusEffect(
    React.useCallback(()=> {

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

    },[])
  );


  const renderQuote = ({item}) => {
    const styles = StyleSheet.create({
      card: {
        borderRadius: 7,
        marginTop: '2%',
        fontSize: 20,
        backgroundColor: 'rgb(75,77,75)',
        flexDirection: 'row',
        width: '95%',

      },
    });
    return (
      <View style={styles.card}>
        <Text style={{color:'white'}} >{item.quote}</Text>
      </View>
    );
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
          <FlatList
              data={list}
              renderItem={renderQuote}
              keyExtractor={item => item.id}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Bookmark;
