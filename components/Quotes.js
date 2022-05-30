/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, { useState} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Pressable} from 'react-native';
import 'react-native-get-random-values';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SwipeGesture from './SwipeGesture';
//import styles from '../styles/QuoteIndex';
import QuoteModal from './QuoteModal';
import LoadScreen from './LoadScreen';
import BookmarkButton from './BookmarkButton';
//import Divider from './Divider';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

export default function QuoteScreen() {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1}}>
          <Quotes/>
            <View style={{ position: 'absolute', bottom: 0, width: '100%'}}>
                <BannerAd
                  unitId={TestIds.BANNER}
                  size={BannerAdSize.ADAPTIVE_BANNER}
                  requestOptions={{
                  requestNonPersonalizedAdsOnly: true}}
                  onAdLoaded={() => {
                  console.log('Advert loaded');}}
                  onAdFailedToLoad={(e) => {
                  console.error('Advert failed to load: ', e);}}
                />
            </View>
        </SafeAreaView>
      </QueryClientProvider>
    );
}

function Quotes(){

  const randomQuoteIndex = Math.floor(Math.random() * 847);
  const [ quoteLog, setQuoteLog ] = useState([randomQuoteIndex]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Load Quotes
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://financequotesapi.herokuapp.com/quotes/all').then(res =>
      res.json()
    )
  );

  // Handle Quote Changes

  const randomNumber = () => {
    return Math.floor(Math.random() * 847);
  };

  const getNextQuote = () => {
    let temp = [...quoteLog];
    temp.push(randomNumber());
    setQuoteLog(temp);
    setIndex(() => index + 1);
  };

  const previousQuote = () => {
      if (index === 0) return;
      setIndex(() => index - 1);
  };

  // Handle Swiping

  const dir = (direction) => {
    if (direction === 'left'){
      getNextQuote();
    } else {
      previousQuote();
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

  const displayModal = () => {
    let show = modalVisible ? 'block' : 'none';

    return ({
      display: show,
    });
  };

  const tweetOut = () => {
    Linking.openURL('https://twitter.com/intent/tweet?text=' + data[quoteLog[index]].quote + ' - ' + data[quoteLog[index]].name);
  };

  const onShare = () => {
    const currentMessage = data[quoteLog[index]].quote + ' - ' + data[quoteLog[index]].name;

    Share.share({
      message: currentMessage,
    });
  };


  if (isLoading) return (<LoadScreen/>);

  if (error) return <Text style={{ color: 'white', fontSize: 45}}>An error has occured: {error.message}</Text>;

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
                      uri: data[quoteLog[index]].image,
                    }}
                    resizeMode="cover"
                  />
              </Pressable>
            </View>

            <View style={{ marginLeft: '5%', marginTop: '.2%', width: '65%'}}>
              <Text style={{ fontSize: 18, color: 'white', textTransform:'capitalize', fontWeight: '400', paddingBottom: '2.5%' }}>{data[quoteLog[index]].name}</Text>
              <Text style={{ color: 'white', fontSize: 16, paddingBottom: '6%' }}>{data[quoteLog[index]].bio.occupation}</Text>
              <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}/>
            </View>
          </View>

          {/** Quotes Container */}
          <View style={{ height: '80%', marginTop: '3%'}}>
          <View style={displayModal}>
            <QuoteModal modalVisible={modalVisible} setModalVisible={setModalVisible} author={data[quoteLog[index]].name} imageUrl={data[quoteLog[index]].image} bio={data[quoteLog[index]].bio}/>
          </View>
              <SwipeGesture style={{height: '85%', width: '100%', marginTop: '3%'}} onSwipePerformed={onSwipePerformed}>
                  <ScrollView>
                      <Text style={{ color: 'white', fontSize: 23, width: '80%', textAlign: 'center', marginLeft: '11%', marginTop: '4%'}}>
                        {data[quoteLog[index]].quote}
                      </Text>

                      {/** Botttom Icons */}
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: '15%', justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity>
                          <FontAwesome5 style={{ fontSize: 25, color: 'white',paddingRight: '9%'}} name={'twitter'} onPress={tweetOut}/>
                      </TouchableOpacity>

                      <BookmarkButton quote = {data[quoteLog[index]].quote} name={data[quoteLog[index]].name} />

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



