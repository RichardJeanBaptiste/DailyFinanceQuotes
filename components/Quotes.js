/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Pressable} from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
import LoadScreen from './LoadScreen';
//import BannerAd from './Ad';
import styles from '../styles/QuoteIndex';
import QuoteModal from './QuoteModal';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

let beginSwiping = false;
let load = false;


function Quotes(){

  const [isLoaded, setisLoaded] = useState(false);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [quoteLog, setQuoteLog] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  //Intial Setup
  useEffect(()=>{

    if (load === false){
      setisLoaded(true);
      setTimeout(async()=>{
        axios.get('https://financequotesapi.herokuapp.com/quotes/random/25')
              .then(response => {
                let temp = [];

                for (let i = 0; i < 15; i++){
                  temp.push({
                    quote:  response.data[i].quote,
                    author: response.data[i].name,
                    image: response.data[i].image,
                    bio: response.data[i].bio,
                  });
                }

                setQuoteLog(temp);
                setQuote(temp[0].quote);
                setAuthor(temp[0].author);
                setImageUrl(temp[0].image);
                setAuthorBio(temp[0].bio);
                //setisLoaded(true);
                load = true;
              })
              .catch(error => {
                console.log(error);
              });
      }, 1000);
    } else {
      load = true;
    }

  },[quoteLog]);



  useEffect(()=>{

    if (beginSwiping){

      if (index === quoteLog.length - 3){
        let temp = quoteLog;
        axios.get('https://financequotesapi.herokuapp.com/quotes/random/25')
              .then(response => {
                for (let i = 0; i < 5; i++){
                  temp.push({
                    quote:  response.data[i].quote,
                    author: response.data[i].name,
                    image: response.data[i].image,
                    bio: response.data[i].bio,
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
        setQuoteLog(temp);
      }


      try {
        setQuote(quoteLog[index].quote);
        setAuthor(quoteLog[index].author);
        setImageUrl(quoteLog[index].image);
        setAuthorBio(quoteLog[index].bio);
      } catch (error) {
        setQuote('A fool and his money are soon parted');
        setAuthor('Thomas Tusser');
        load = false;
      }
    }
  },[index,quoteLog]);

  const dir = (direction) => {
    beginSwiping = true;
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
    if (load === true){
      return (
        <View style={{marginTop:'6%'}}>

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
    } else {
      return (
        <SafeAreaView>
          <LoadScreen/>
        </SafeAreaView>
      );
    }

  }

  return (
    <SafeAreaView style={{ flex: 1}}>
        <QuoteView/>
        <View style={{ position: 'absolute', bottom: 0, width: '100%'}}>
              <BannerAd
                unitId={'ca-app-pub-4929537070408822/6473807185'}
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

