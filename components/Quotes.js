/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/**
 * Store Quotes/ Navigate backwords through quotes
 * Save Quotes W/ Async Storage
 *      - Get All Keys
 *      - Render in New Component
 * Add Swiping Functionality
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, View, Linking, Button, Share} from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  authorText: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '8%',
    marginLeft: '3%',
  },


  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'monospace',
    textAlign: 'center',
  },


  textArea: {
    textAlign: 'center',
    marginTop: '13%',
    height: '50%',
  },

  titleView: {
    marginTop: '12%',
  },

  buttonView: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },

  bottomTabView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '24%',
    marginLeft: '10%',
  },
});

const backLog = [];


class Quotes extends Component {

  constructor(props) {
    super(props);
    this.state = {author: '',quote: '',res:'',imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nymphenburg-Statue-3f.jpg/220px-Nymphenburg-Statue-3f.jpg'};
    this.newQuote = this.newQuote.bind(this);
    this.lastQuote = this.lastQuote.bind(this);
    this.tweetOut = this.tweetOut.bind(this);
    this.onShare = this.onShare.bind(this);
    this.storeData = this.storeData.bind(this);
  }


  async componentDidMount(){
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
            })
            .catch(error => {
                console.log(error);
            });
  }


  async newQuote(){
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
            })
            .catch(error => {
                console.log(error);
            });
  }

  lastQuote(){
    if (backLog.length === 0){
      return;
    }
    console.log(backLog[backLog.length - 1]);
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
      let currentQuote = [this.state.quote,this.state.author];
      currentQuote = JSON.stringify(currentQuote);
      console.log(id);
      console.log(currentQuote);
      await AsyncStorage.setItem(id,currentQuote);
    } catch (e){
      console.log(e);
    }
  }

  render() {
    return (
      <SafeAreaView>
          <ScrollView style={styles.textArea} contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
              <Text style={styles.textStyle}>{this.state.quote}</Text>
              <Text style={styles.authorText}>- {this.state.author}</Text>
          </ScrollView>

          <View style={styles.bottomTabView}>
              <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 40, color: 'white', width:70}} name={'arrow-left'} onPress={this.lastQuote}/>
              </TouchableOpacity>

              <TouchableOpacity>
                  <FontAwesome5 style={{fontSize: 40, color: 'white', width:70}} name={'twitter'} onPress={this.tweetOut}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 40, color: 'white', width:70}} name={'bookmark'} onPress={this.storeData}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 40, color: 'white', width:70}} name={'share-alt'} onPress={this.onShare}/>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5 style={{fontSize: 40, color: 'white', width:70}} name={'arrow-right'} onPress={this.newQuote}/>
              </TouchableOpacity>

          </View>

      </SafeAreaView>

    );
  }
}


export default Quotes;

