/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  authorImage: {
    width: 65,
    height: 65,
    marginLeft: '15%',
  },

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
    marginTop: '5%',
    marginHorizontal: '7%',
    marginLeft: '5%',
    height: '55%',
  },

  titleView: {
    marginTop: '12%',
  },
});

class Quotes extends Component {

  constructor(props) {
    super(props);
    this.state = {author: '',quote: '',res:'',imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nymphenburg-Statue-3f.jpg/220px-Nymphenburg-Statue-3f.jpg'};
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

  render() {
    return (
      <SafeAreaView>
        
        <ScrollView style={styles.textArea} contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
            <Text style={styles.textStyle}>{this.state.quote}</Text>
            <Text style={styles.authorText}>- {this.state.author}</Text>

        </ScrollView>

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
