// eslint-disable-next-line prettier/prettier
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

function LoadScreen(){
    return (
        <SafeAreaView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <LottieView style={{height: '85%', width: '60%'}} source={require('../assets/38217-money-growth.json')} autoPlay loop/>
                <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold'}}>Preparing Your Quotes</Text>
            </View>
        </SafeAreaView>
    );
}

export default LoadScreen;
