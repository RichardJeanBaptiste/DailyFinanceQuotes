/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import SwipeGesture from './SwipeGesture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookmarkButton from './BookmarkButton';
import TweetButton from './TweetButton';
import ShareButton from './ShareButton';


export default function Search({ route, navigation }) {

    const maxWidth = Dimensions.get('window').width;
    //const maxHeight = Dimensions.get('window').height;

    const Styles = {
        swipeGestureStyle: {
            height: '85%',
            width: '100%',
            marginTop: '3%',
        },
        quoteStyle: {
            color: 'white',
            fontSize: 23,
            width: '80%',
            textAlign: 'center',
            marginLeft: '11%',
            marginTop: '4%',
        },
        authorStyle: {
            color: 'white',
            fontSize: 23,
            width: '80%',
            textAlign: 'center',
            marginLeft: '11%',
            marginTop: '4%',
            textTransform: 'capitalize',
        },
        emptySearchView: {
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 60,
            width: 300,
        },
        emptySearchIcon: {
            color: 'white',
            fontSize: 25,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        emptySearchText: {
            color: 'white',
            textAlign: 'center',
            marginTop: 15,
            fontSize: 20,
        },
        buttonView: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '14%',
            marginLeft: '8.5%',
            justifyContent: 'center',
            alignItems: 'center',

        },
        tweetButtonStyle: {
            fontSize: 25,
            color: 'white',
            paddingRight: '9%',
        },
        shareButtonStyle: {
            fontSize: 25,
            color: 'white'
        }
    };

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
            <SwipeGesture style={Styles.swipeGestureStyle} onSwipePerformed={onSwipePerformed}>
                <ScrollView>
                    <Text style={Styles.quoteStyle}>
                        {handleQuote()}
                    </Text>

                    <Text style={Styles.authorStyle}>
                        - {data[index].name}
                    </Text>

                    <View style={Styles.buttonView}>
                        <TweetButton buttonStyle={Styles.tweetButtonStyle}  quote={data[index].quote} name={data[index].name}/>
                        <BookmarkButton quote={data[index].quote} name={data[index].name} />
                        <ShareButton shareStyle={Styles.shareButtonStyle} quote={data[index].quote} name={data[index].name} />
                    </View>

                </ScrollView>
            </SwipeGesture>
        );
    }

    function EmptySearchResults(){
        return (
            <View style={Styles.emptySearchView}>
                <FontAwesome5 name="searchengin" style={Styles.emptySearchIcon}/>
                <Text style={Styles.emptySearchText}>We couldn't find what you were searching for?</Text>
            </View>
        );
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


