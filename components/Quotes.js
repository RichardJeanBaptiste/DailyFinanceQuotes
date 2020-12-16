/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  authorImage: {
    width: 75,
    height: 75,
  },

  lineStyle: {
    backgroundColor: 'rgb(90,92,90)',
    height: 5,
    width: 100,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    fontFamily: 'monospace',
  },

  textArea: {
    marginTop: 150,
    marginLeft:20,
    width: 350,
    flexDirection: 'row',
  },

  titleView: {
    marginTop: 50,
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
        <View style={styles.titleView}>
            <Image
              style={styles.authorImage}
              source={{uri:this.state.imageLink}}
            />

            <Text style={styles.textStyle}>{this.state.author}</Text>

            <View style={styles.lineStyle}></View>
        </View>

        <View style={styles.textArea}>
          <Text style={styles.textStyle}>{this.state.quote}</Text>
        </View>
      </SafeAreaView>
    );
  }
}


export default Quotes;
