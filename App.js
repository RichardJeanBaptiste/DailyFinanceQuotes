/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Quotes from './components/Quotes';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgb(34,36,35)',
    height: 1000,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
      <SafeAreaView>
        <View>
          <Quotes/>
        </View>
      </SafeAreaView>
      </View>
    );
  }
}

export default App;
