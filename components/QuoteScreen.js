/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */


import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, ScrollView, View, Linking, Share, Image, Pressable} from 'react-native';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeGesture from './SwipeGesture';
//import styles from '../styles/QuoteIndex';
import QuoteModal from './QuoteModal';
//import Divider from './Divider';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { useQuery } from 'react-query';

/**
 * 
 * {data[quoteLog[index]].name}
 */

export default function Quotes() {
    const [ quoteLog, setQuoteLog ] = useState([Math.floor(Math.random() * 847)]);
    const [ index, setIndex ] = useState(0);

    const { isLoading, error, data } = useQuery('apiData', () =>
        fetch('https://financequotesapi.herokuapp.com/quotes/all/').then(res =>
            res.json()
        )
    );

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

    if (isLoading) return '<h1 style={{ color: "white"}}>Loading<h1>';

    if (error) return 'An error has occured: ' + error.message;


    function QuoteView() {
        return (
            <View style={{ marginTop: '6%'}}>
                
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
        <QuoteView/>
        <View style={{ position: 'absolute', bottom: 0, width: '100%'}}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: true}}
                onAdLoaded={() => {
                console.log('Advert loaded');}}
                onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);}}
              />
          </View>
    </SafeAreaView>
    );
}
