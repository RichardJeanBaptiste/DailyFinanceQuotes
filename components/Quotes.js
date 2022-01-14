/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Pressable} from 'react-native';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
//import styles from '../styles/QuoteIndex';
import QuoteModal from './QuoteModal';
//import Divider from './Divider';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

function Quotes(){

  const [quoteLog, setQuoteLog] = useState([]);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png');
  const [authorBio, setAuthorBio] = useState([]);
  const [index, setIndex] = useState(0);
  const [beginSwiping, setBeginSwiping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //const [loadingQuotes, setLoadingQuotes] = useState(false);

  //Intial Setup
  useEffect(() => {

    fetch('https://financequotesapi.herokuapp.com/quotes/all/random/limit=5')
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


  // Add More Quotes
  useEffect(() => {

      if (beginSwiping) {
        if (quoteLog[index] === undefined){
          //do nothing
          console.log('undefined error');
          fetch('https://financequotesapi.herokuapp.com/quotes/all/random/')
            .then(response => {
              if (!response.ok) {
                throw new Error('HTTP error' + response.status);
              }

              return response.json();
            })
            .then(data => {
              let temp = [...quoteLog];
              temp.push(data);
              setQuoteLog(temp);
          });
        } else {
          setQuote(quoteLog[index].quote);
          setAuthor(quoteLog[index].name);
          setImageUrl(quoteLog[index].image);
          setAuthorBio(quoteLog[index].bio);
        }
      }

  },[index, quoteLog, beginSwiping]);

  const dir = (direction) => {
    setBeginSwiping(true);
    if (direction === 'left'){
      if (index >= quoteLog.length - 1){
        return;
      }
      setIndex(() => {return (index + 1);});
      // add new quote
      fetch('https://financequotesapi.herokuapp.com/quotes/all/random/')
      .then(response => response.json())
      .then(data => {
        let temp = [...quoteLog];
        temp.push(data);
        setQuoteLog(temp);
      });
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
        dir('left');
        break;
      }
       case 'right':{
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

  const displayModal = () => {

    let show = modalVisible ? 'block' : 'none';

    return ({
      display: show,
    });
  };

  function QuoteView(){
      return (
        <View style={{marginTop:'6%'}}>

          <View style={{
            flex: 1,
            marginTop: '3%',
            flexDirection: 'row',
          }}>
            <View style={{ marginLeft: '8%'}}>
              <Pressable onPress={() => setModalVisible(true)}>
                  <Image
                    style={{ width: 70, height: 70, borderRadius: 35}}
                    source={{
                      uri: imageUrl,
                    }}
                    resizeMode="cover"
                  />
              </Pressable>
            </View>

            <View style={{ marginLeft: '5%', marginTop: '.2%', width: '65%'}}>
              <Text style={{ fontSize: 18, color: 'white', textTransform:'capitalize', fontWeight: '400', paddingBottom: '2.5%' }}>{author}</Text>
              <Text style={{ color: 'white', fontSize: 16, paddingBottom: '6%' }}>Occupation</Text>
              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}/>
            </View>
          </View>

          {/** Quotes Container */}
          <View style={{ height: '80%', marginTop: '3%'}}>
          <View style={displayModal}>
            <QuoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} author={author} imageUrl={imageUrl} bio={authorBio}/>
          </View>
              <SwipeGesture style={{height: '85%', width: '100%', marginTop: '3%'}} onSwipePerformed={onSwipePerformed}>
                  <ScrollView>
                      <Text style={{ color: 'white', fontSize: 23, width: '80%', textAlign: 'center', marginLeft: '11%', marginTop: '4%'}}>
                        {quote}
                      </Text>

                      {/** Botttom Icons */}
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: '15%', justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity>
                          <FontAwesome5 style={{ fontSize: 25, color: 'white',paddingRight: '9%'}} name={'twitter'} onPress={tweetOut}/>
                      </TouchableOpacity>

                      <TouchableOpacity>
                          <FontAwesome5 style={{ fontSize: 25, color: 'white', paddingRight: '9%'}} name={'bookmark'} onPress={storeData}/>
                      </TouchableOpacity>

                      <TouchableOpacity>
                          <FontAwesome5 style={{ fontSize: 25, color: 'white'}} name={'share-alt'} onPress={onShare}/>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
              </SwipeGesture>
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

