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
import LoadScreen from './LoadScreen';

function Quotes(){

  const [quoteLog, setQuoteLog] = useState([]);
  const [backLog, setBackLog] = useState([]);
  const [leftSwipeCounter, setLeftSwipeCounter] = useState(1);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png');
  const [authorBio, setAuthorBio] = useState([]);
  const [index, setIndex] = useState(0);
  const [beginSwiping, setBeginSwiping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingQuotes, setLoadingQuotes] = useState(true);


  // Intial Load - Get all quotes
  useEffect(() => {
    fetch('https://financequotesapi.herokuapp.com/quotes/all/')
    .then(response => response.json())
    .then(data => {
      setQuoteLog(data);
      setQuote(data[0].quote);
      setAuthor(data[0].name);
      setImageUrl(data[0].image);
      setAuthorBio(data[0].bio);
      setBackLog([data[0]]);
    })
    .then(() => {
      console.log('display quotes');
      setTimeout(() => {
        setLoadingQuotes(false);
      },3000);
    })
    .catch(error => console.log(error));
  },[]);

  // Change Quote based on Index number
  useEffect(() => {

    if (beginSwiping){
      setQuote(backLog[index].quote);
      setAuthor(backLog[index].name);
      setImageUrl(backLog[index].image);
      setAuthorBio(backLog[index].bio);
    }
  },[beginSwiping, quoteLog, index, backLog]);


  const dir = (direction) => {
    setBeginSwiping(true);
    if (direction === 'left'){

      console.log('Current Index ' + index);
      console.log('Back Log Length ' + backLog.length);

      if (backLog.length === leftSwipeCounter){
        let randomIndex = Math.floor(Math.random() * quoteLog.length);
        let temp = [...backLog];
        temp.push(quoteLog[randomIndex]);
        setBackLog(temp);
        setLeftSwipeCounter(() => {return (leftSwipeCounter + 1);});
        setIndex(() => {return (index + 1);});
      } else {
        setIndex(() => {return (index + 1);});
      }

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

  const checkIfSaved = async () => {
    let currentQuote = quote + '\n\n' + ' - ' + author;
    let keys = await AsyncStorage.getAllKeys();
    let values = await AsyncStorage.multiGet(keys);

    console.log(currentQuote);
    console.log(values);

    let alreadySaved = true;

    values.map((value) => {
      if (value[1] === currentQuote){
        alreadySaved = true;
        return;
      }
    });

    return (alreadySaved);
  };

  const SaveButtonColor = (props) => {
    if (props.isSaved) {
      return (
        <FontAwesome5 style={{ fontSize: 25, color: 'orange',paddingRight: '9%'}} name={'bookmark'} onPress={storeData}/>
      );
    } else {
      return (
        <FontAwesome5 style={{ fontSize: 25, color: 'white',paddingRight: '9%'}} name={'bookmark'} onPress={storeData}/>
      );
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
      if (!loadingQuotes){
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
                  <Text style={{ color: 'white', fontSize: 16, paddingBottom: '6%' }}>{authorBio.occupation}</Text>
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
                              <SaveButtonColor isSaved={false}/>
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
      } else {
        return (
          <>
            <LoadScreen/>
          </>
        );
      }
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
                //console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);}}
              />
          </View>
    </SafeAreaView>
  );
}

export default Quotes;

