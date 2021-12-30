/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Pressable} from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
import LoadScreen from './LoadScreen';
import styles from '../styles/QuoteIndex';
import QuoteModal from './QuoteModal';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

//let beginSwiping = false;
//let load = false;


function Quotes(){

  const [quoteLog, setQuoteLog] = useState([]);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png');
  const [authorBio, setAuthorBio] = useState('');
  const [index, setIndex] = useState(0);
  const [beginSwiping, setBeginSwiping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //Intial Setup
  useEffect(() => {

    fetch('https://financequotesapi.herokuapp.com/list/rand/limit=25')
    .then(response => response.json())
    .then(data => {
      setQuoteLog(data);
      setQuote(data[0].quote);
      setAuthor(data[0].name);
      setImageUrl(data[0].image);
      setAuthorBio(data[0].bio);
    })
    .catch(error => console.log(error));

  },[]);

  useEffect(() => {
    if (beginSwiping){
      // Add more quotes to quotelog state
      if (index === quoteLog.length - 3){
        let temp = quoteLog;

        fetch('https://financequotesapi.herokuapp.com/list/rand/limit=25')
       .then(response => response.json())
       .then(data => {
          for (let i = 0; i < 25; i++){
            temp.push({
              quote: (data[i].quote),
              author: (data[i].name),
              imageUrl: (data[i].image),
              bio: (data[i].bio),
            });
          }

          setQuoteLog(temp);
       })
       .catch(error => console.log(error));
      }

      // set next quote
      try {
        setQuote(quoteLog[index].quote);
        setAuthor(quoteLog[index].name);
        setImageUrl(quoteLog[index].image);
        setAuthorBio(quoteLog[index].bio);
      } catch (error) {
        setQuote('A fool and his money are soon parted');
        setAuthor('Thomas Tusser');
      }
    }
  },[beginSwiping, quoteLog, index]);

  const dir = (direction) => {
    setBeginSwiping(true);
    if (direction === 'left'){
      if (index >= quoteLog.length - 1){
        return;
      }
      setIndex(() => {return (index + 1);});
    } else {
      if (index === 0){
        return;
      }
      setIndex(() => {return (index - 1);});
    }
  };


  const onSwipePerformed = (action) => {

    switch (action){
      case 'left':{
        //console.log('left');
        dir('left');
        break;
      }
       case 'right':{
        //console.log('right');
        dir('right');
        break;
      }
       default : {
       console.log('Undeteceted action');
       }
    }
  };

  const storeData = async  () => {
    try {
      let id = uuidv1();
      let currentQuote = quote + '\n\n' + ' - ' + author;
      let alreadySaved = false;

      let keys = await AsyncStorage.getAllKeys();
      let values = await AsyncStorage.multiGet(keys);

      values.map((value) => {
        if (value[1] === currentQuote){
          alreadySaved = true;
          return;
        }
      });

      if (alreadySaved){
        return;
      } else {
        await AsyncStorage.setItem(id,currentQuote);
      }
    } catch (e){
      console.log(e);
    }
  };

  const tweetOut = () => {
    Linking.openURL('https://twitter.com/intent/tweet?text=' + quote + ' - ' + author);
  };

  const onShare = () => {
    const currentMessage = quote + ' - ' + author;

    Share.share({
      message: currentMessage,
    });
  };

  function QuoteView(){
      return (
        <View style={{marginTop:'6%'}}>

          {/** Quote View */}
          <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={onSwipePerformed}>
              <ScrollView style={styles.textArea} contentContainerStyle={{ justifyContent:'center',paddingBottom: '15%', paddingTop:'2%'}}>
                    <QuoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} author={author} imageUrl={imageUrl} bio={authorBio}/>
                  <Pressable onPress={() => setModalVisible(true)}>
                  <Image
                      style={styles.imageStyle}
                      source={{
                        uri: imageUrl,
                      }}
                  />
                  </Pressable>
                  <View style={{ marginTop: '15%'}}>
                  <Text style={styles.textStyle}>{quote}</Text>
                  <Text style={styles.authorText}> - <Text style={{textDecorationLine:'underline'}}>{author}</Text></Text>
                  </View>
              </ScrollView>
          </SwipeGesture>


          {/** Botttom Icons */}
          <View style={styles.bottomTabView}>
              <TouchableOpacity>
                  <FontAwesome5 style={styles.iconStyle} name={'twitter'} onPress={tweetOut}/>
              </TouchableOpacity>

              <TouchableOpacity>
                  <FontAwesome5 style={styles.iconStyle2} name={'bookmark'} onPress={storeData}/>
              </TouchableOpacity>

              <TouchableOpacity>
                  <FontAwesome5 style={styles.iconStyle} name={'share-alt'} onPress={onShare}/>
              </TouchableOpacity>
          </View>
        </View>
      );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
        <QuoteView/>
        <View style={{ position: 'absolute', bottom: 0, width: '100%'}}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: true}}
                onAdLoaded={() => {
                console.log('Advert loaded');}}
                onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);}}
              />
          </View>
    </SafeAreaView>
  );
}

export default Quotes;

