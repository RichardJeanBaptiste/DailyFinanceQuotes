/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Modal, Pressable} from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
import LoadScreen from './LoadScreen';
import BannerAd from './Ad';
import styles from '../styles/QuoteIndex';
import MaleBoy from '../assets/male_boy.png';
import QuoteModal from './QuoteModal';


let beginSwiping = false;
let load = false;


function Quotes(){

  const [isLoaded, setisLoaded] = useState(false);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [quoteLog, setQuoteLog] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  //stuff
  useEffect(()=>{

    if (load === false){
      setisLoaded(true);
      setTimeout(async()=>{
        axios.get('https://financequotesapi.herokuapp.com/quotes/random/15')
              .then(response => {
                let temp = [];

                for (let i = 0; i < 15; i++){
                  temp.push({
                    quote:  response.data[i].quote,
                    author: response.data[i].name,
                  });
                }

                setQuoteLog(temp);
                setQuote(temp[0].quote);
                setAuthor(temp[0].author);
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
        //console.log('need more quotes');
        let temp = quoteLog;
        axios.get('https://financequotesapi.herokuapp.com/quotes/random/5')
              .then(response => {
                for (let i = 0; i < 5; i++){
                  temp.push({
                    quote:  response.data[i].quote,
                    author: response.data[i].name,
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
                <QuoteModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Image
                        style={styles.imageStyle}
                        source={MaleBoy}
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
          <BannerAd/>
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
    <SafeAreaView>
      <QuoteView/>
    </SafeAreaView>
  );
}

export default Quotes;

