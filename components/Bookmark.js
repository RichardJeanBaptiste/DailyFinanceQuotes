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
import {SafeAreaView, Text, StyleSheet, View, Share} from 'react-native';
import 'react-native-get-random-values';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const styles = StyleSheet.create({
      card: {
        borderRadius: 7,
        marginTop: '2%',
        backgroundColor: 'rgb(75,77,75)',
        flex: 1,
        flexDirection: 'row',
      },
      cardButtons : {
        alignItems:'flex-end',
        marginRight: '4%',
        marginLeft: '4%',
        flexDirection: 'column',
      },
    });

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
        <Text style={{color:'white', flex: 3, fontSize: 15, marginTop: 10, width: '84.5%', paddingBottom:'7%', marginLeft: 10}} >{item.quote}</Text>
        <View style={styles.cardButtons}>
            <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 25, color: 'orange', paddingTop: 10, paddingBottom: 15}} name={'bookmark'} onPress={removeBookmark}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 25, color: 'orange'}} name={'share-alt'} onPress={shareQuote}/>
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
