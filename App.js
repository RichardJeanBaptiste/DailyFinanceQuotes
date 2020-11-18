/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import Quotes from './components/Quotes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Quotes/>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
