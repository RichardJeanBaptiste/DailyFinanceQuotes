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
import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, Text, View, Share} from 'react-native';
import 'react-native-get-random-values';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/BookIndex';


function Bookmark(){

  const [list, setList] = useState([]);

  // Get all saved quotes on intial component render
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

  // Get all quotes when screen is focused
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
    // Share Button Function
    const shareQuote = () => {
      Share.share({
        message: item.quote,
      });
    };

    // Remove quote from flatlist/asyncstorage
    const removeBookmark = () => {
      AsyncStorage.removeItem(item.id);
      setList(list.filter((itemList) => {return itemList.id !== item.id;}));
    };

    return (
      <View style={styles.card}>
        <Text style={styles.quoteStyle} >
          {JSON.parse(item.quote).quote}
          {'\n'}
          {'\n'}
          - {JSON.parse(item.quote).name.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())}
        </Text>
        <View style={styles.cardButtons}>
            <TouchableOpacity>
                <FontAwesome5 style={styles.trashIcon} name={'trash-alt'} onPress={removeBookmark}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome5 style={styles.shareIcon} name={'share-alt'} onPress={shareQuote}/>
            </TouchableOpacity>
        </View>
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
