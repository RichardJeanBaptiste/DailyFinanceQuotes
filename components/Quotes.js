/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


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
    //marginHorizontal: '7%',
    //marginLeft: '5%',
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
});


class Quotes extends Component {

  constructor(props) {
    super(props);
    this.state = {author: '',quote: '',res:'',imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nymphenburg-Statue-3f.jpg/220px-Nymphenburg-Statue-3f.jpg'};
    this.newQuote = this.newQuote.bind(this);
  }


  componentDidMount(){
    axios.get('https://financequotesapi.herokuapp.com/quotes/random/qr')
            .then(response => {
                console.log(response.data.name + '\n' + response.data.quote);
                this.setState({
                  author: response.data.name,
                  quote: response.data.quote,
                  imageLink: response.data.image,
                });
            })
            .catch(error => {
                console.log(error);
            });
  }

  newQuote(){
    axios.get('https://financequotesapi.herokuapp.com/quotes/random/qr')
            .then(response => {
                console.log(response.data.name + '\n' + response.data.quote);
                this.setState({
                  author: response.data.name,
                  quote: response.data.quote,
                  imageLink: response.data.image,
                });
            })
            .catch(error => {
                console.log(error);
            });
  }

  render() {
    return (
      <SafeAreaView>
          <ScrollView style={styles.textArea} contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
              <Text style={styles.textStyle}>{this.state.quote}</Text>
              <Text style={styles.authorText}>- {this.state.author}</Text>
          </ScrollView>

          <FontAwesome5 style={{fontSize: 50, color: 'white', width:70}} name={'comments'} onPress={this.newQuote}/>


      </SafeAreaView>

    );
  }
}


export default Quotes;

/*
  <View style={styles.titleView}>
            <Image
              style={styles.authorImage}
              source={{uri:this.state.imageLink}}
            />

            <Text style={styles.authorText}>{this.state.author}</Text>
        </View>


 */
