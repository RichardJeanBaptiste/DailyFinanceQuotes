/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import SwipeGesture from './SwipeGesture';


//const Stack = createNativeStackNavigator();

export default function Search({ route, navigation }) {

    const { data } = route.params;

    const [ loadSearch, setLoadSearch ] = useState(false);

    useEffect(() => {
        if (data.length === 0) {
            console.log('empty');
        } else {
            setLoadSearch(true);
        }
    },[data]);

    function SearchedQuotes() {

        const [ index, setIndex ] = useState(0);

        // Handle Swiping

        const dir = (direction) => {
            if (direction === 'left'){
                getNextQuote();
            } else {
                getPreviousQuote();
            }
        };

        const onSwipePerformed = (action) => {
            switch (action){
              case 'left':{
                dir('left');
                break;
              }
               case 'right':{
                dir('right');
                break;
              }
               default : {
               console.log('Undeteceted action');
               }
            }
        };

        // Handle Quote Index

        const getNextQuote = () => {
            if (index === data.length - 1) return;
            setIndex(() => index + 1);
        };

        const getPreviousQuote = () => {
            if (index === 0) return;
            setIndex(() => index - 1);
        };

        const handleQuote = () => {

            /*
            if (data[index].quote === undefined) {
                console.log(index);
                return 'Undefined Quote';
            } else {
                console.log('ABCD');
                return data[index].quote;
            }
            */

            if(data[index].quotes === ' '){
                console.log('empty quote');
            }
           if (data[index].quote === 'Undefined Quote' && index === data.length){

                console.log('--- call 1');
                return;
            } else if (data[index].quote === 'Undefined Quote') {
                setIndex(() => index + 1);
                console.log(' --- call 2');
                return data[index].quote;
            } else {
                return data[index].quote;
            }

        };

        return (
            <SwipeGesture style={{height: '85%', width: '100%', marginTop: '3%'}} onSwipePerformed={onSwipePerformed}>
                <ScrollView>
                    <Text style={{ color: 'white', fontSize: 23, width: '80%', textAlign: 'center', marginLeft: '11%', marginTop: '4%'}}>
                        {handleQuote()}
                    </Text>

                    <Text style={{ color: 'white', fontSize: 23, width: '80%', textAlign: 'center', marginLeft: '11%', marginTop: '4%', textTransform: 'capitalize'}}>
                        - {data[index].name}
                    </Text>
                </ScrollView>
            </SwipeGesture>
        );
    }

    function EmptySearchResults(){
        return (
            <View>
                <Text>Empty Search Results</Text>
            </View>
        )
    }

    if (loadSearch){
        return (
            <SafeAreaView>
                <SearchedQuotes/>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
                <EmptySearchResults/>
            </SafeAreaView>
        );
    }
}


