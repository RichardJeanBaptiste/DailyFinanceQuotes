/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Image, Linking} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { v1 as uuidv1 } from 'uuid';

const styles = StyleSheet.create({

    titleStyle : {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleView: {
        marginLeft: '2%',
    },
});

const DATA = [
    {
        id: uuidv1(),
        title: 'The Intelligent Investor',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91yj3mbz4JL.jpg',
        author: 'Warren Buffett',
        amazonLink : 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661',
    },
    {
        id: uuidv1(),
        title: 'Security Analysis',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51hwLfcPJPL._SX324_BO1,204,203,200_.jpg',
        author: 'Benjamin Graham & \nDavid L. Dodd',
        amazonLink: 'https://www.amazon.com/Security-Analysis-Foreword-Buffett-Editions/dp/0071592539',
    },
    {
        id: uuidv1(),
        title: 'Rich Dad Poor Dad',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX312_BO1,204,203,200_.jpg',
        author: 'Robert Kiyosaki',
        amazonLink: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194',
    },
    {
        id: uuidv1(),
        title: 'Think and Grow Rich',
        image: 'https://images-na.ssl-images-amazon.com/images/I/71UypkUjStL.jpg',
        author: 'Napoleon Hill',
        amazonLink: 'https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331',
    },
    {
        id: uuidv1(),
        title: 'The Laws Of Wealth',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41oihc1tcGL._SX310_BO1,204,203,200_.jpg',
        author: 'Dr.Daniel Crosby',
        amazonLink: 'https://www.amazon.com/Laws-Wealth-Psychology-investing-success/dp/0857195247/ref=sr_1_1?crid=5PBKIMFODAUB&dchild=1&keywords=daniel+crosby&qid=1609708769&sprefix=daniel+cr%2Caps%2C167&sr=8-1',
    },
    {
        id: uuidv1(),
        title: 'Thinking, Fast and Slow',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg',
        author: 'Daniel Kahneman',
        amazonLink: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555/ref=sr_1_1?crid=1YR8JLK8INSXB&dchild=1&keywords=thinking+fast+and+slow+by+daniel+kahneman&qid=1609709007&sprefix=thinking+fast+an%2Caps%2C166&sr=8-1',
    },
    {
        id: uuidv1(),
        title: 'Principles',
        image: 'https://images-na.ssl-images-amazon.com/images/I/41Mq7Ss7lPL._SX331_BO1,204,203,200_.jpg',
        author: 'Ray Dalio',
        amazonLink: 'https://www.amazon.com/Principles-Life-Work-Ray-Dalio/dp/1501124021/ref=sr_1_3?crid=3R64OI2MS70PK&dchild=1&keywords=principles+by+ray+dalio&qid=1609709357&sprefix=principl%2Caps%2C168&sr=8-3',
    },
    {
        id: uuidv1(),
        title: 'The Book on Rental \nProperty Investing',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51XQNoIYSvL._SX333_BO1,204,203,200_.jpg',
        author: 'Brandon Turner',
        amazonLink: 'https://www.amazon.com/Book-Rental-Property-Investing-Intelligent/dp/099071179X/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=',
    },
];

function buyBook(amazonLink){
    Linking.openURL(amazonLink);
}

const bookView = ({ item }) => (
    <View style={{flexDirection: 'row', paddingBottom: '3%'}}>
         <Image
            style={{width: 100, height: 150}}
            source={{
              uri: item.image,
            }}
        />
        <View style={{marginLeft: '4%'}}>
            <Text style={{color: 'white',fontSize: 17,fontFamily: 'monospace', fontWeight: 'bold'}}>{item.title}</Text>
            <Text style={{color: 'white', fontFamily: 'monospace'}}>- {item.author}</Text>
            <TouchableOpacity style={{marginTop: '7%'}}>
                <FontAwesome5 style={{fontSize: 20, color: 'orange', width:70}} name={'shopping-cart'} onPress={() => buyBook(item.amazonLink)}/>
            </TouchableOpacity>
        </View>
    </View>
);


function Learn(){
    return (
        <SafeAreaView>
            <View style={styles.titleView}>
                <Text style={styles.titleStyle}>Reading is the gateway skill that makes all other learning possible</Text>
                <Text style={styles.titleStyle}> - Barack Obama</Text>
            </View>
            <ScrollView style={{marginTop: '4%', height: '80%'}} contentContainerStyle={{ paddingBottom: '10%'}}>
                <FlatList
                    data={DATA}
                    renderItem={bookView}
                    keyExtractor= {item => item.id}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Learn;
