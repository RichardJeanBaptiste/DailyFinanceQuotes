/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share} from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
import LoadScreen from './LoadScreen';
import styles from '../styles/QuoteIndex';



const backLog = [];
let index = 0;



class Quotes extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoaded: false, author: '',quote: '',res:'',imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nymphenburg-Statue-3f.jpg/220px-Nymphenburg-Statue-3f.jpg'};
    this.newQuote = this.newQuote.bind(this);
    this.lastQuote = this.lastQuote.bind(this);
    this.tweetOut = this.tweetOut.bind(this);
    this.onShare = this.onShare.bind(this);
    this.storeData = this.storeData.bind(this);
    this.onSwipePerformed = this.onSwipePerformed.bind(this);
  }


  componentDidMount(){

    setTimeout(async() => {
      axios.get('https://financequotesapi.herokuapp.com/quotes/random/qr')
            .then(response => {
                console.log(response.data.name + '\n' + response.data.quote);
                this.setState({
                  isLoaded: true,
                  author: response.data.name,
                  quote: response.data.quote,
                  imageLink: response.data.image,
                });

                let current = {
                  author: response.data.name,
                  quote: response.data.quote,
                };

                backLog.push(current);
                index++;
            })
            .catch(error => {
                console.log(error);
            });
    }, 3500);
  }

  async newQuote(){

    if (index === backLog.length){

      await axios.get('https://financequotesapi.herokuapp.com/quotes/random/qr')
      .then(response => {
          console.log(response.data.name + '\n' + response.data.quote);
          this.setState({
            author: response.data.name,
            quote: response.data.quote,
            imageLink: response.data.image,
          });

          let current = {
            author: response.data.name,
            quote: response.data.quote,
          };

          backLog.push(current);
          index++;
      })
      .catch(error => {
          console.log(error);
      });

    } else {

      this.setState({
        author: backLog[index].author,
        quote: backLog[index].quote,
      });

      index++;

    }
  }

  lastQuote(){
    if (index === 1){
      console.log('end of line');
      return;
    }
    try {
      index--;
      console.log(backLog[index - 1]);

      this.setState({
        author: backLog[index - 1].author,
        quote: backLog[index - 1].quote,
      });

    } catch (error) {
      console.log(error);
    }
  }

  tweetOut(){
    let author = this.state.author;
    let quote = this.state.quote;

    Linking.openURL('https://twitter.com/intent/tweet?text=' + quote + ' - ' + author);
  }

  onShare(){

    const currentMessage = this.state.quote + ' - ' + this.state.author;

    Share.share({
      message: currentMessage,
    });

  }

  async storeData(){
    try {
      let id = uuidv1();
      let currentQuote = this.state.quote + '\n\n' + ' - ' + this.state.author;
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
  }

  onSwipePerformed = (action) => {

    switch (action){
      case 'left':{
        this.newQuote();
        break;
      }
       case 'right':{
        this.lastQuote();
        break;
      }
       default : {
       console.log('Undeteceted action');
       }
    }
  }

  render() {
    if (this.state.isLoaded === false){
      return (
        <SafeAreaView>
          <LoadScreen/>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <QuoteScreen quote={this.state.quote} author={this.state.author} tweetOut={this.tweetOut} storeData={this.storeData} onShare={this.onShare} onSwipePerformed={this.onSwipePerformed}/>
        </SafeAreaView>
      );
    }
  }
}

function QuoteScreen(props){
  return (
    <View style={{marginTop: '8%'}}>
      <SwipeGesture gestureStyle={styles.swipesGestureContainer} onSwipePerformed={props.onSwipePerformed}>
          <ScrollView style={styles.textArea} contentContainerStyle={{ justifyContent:'center',paddingBottom: '15%', paddingTop:'2%'}}>
              <Text style={styles.textStyle}>{props.quote}</Text>
              <Text style={styles.authorText}>- {props.author}</Text>
          </ScrollView>
        </SwipeGesture>

          <View style={styles.bottomTabView}>

              <TouchableOpacity>
                  <FontAwesome5 style={styles.iconStyle} name={'twitter'} onPress={props.tweetOut}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5 style={styles.iconStyle2} name={'bookmark'} onPress={props.storeData}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5 style={styles.iconStyle} name={'share-alt'} onPress={props.onShare}/>
              </TouchableOpacity>


          </View>
    </View>
  );
}


export default Quotes;

