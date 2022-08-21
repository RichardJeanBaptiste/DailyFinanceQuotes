/* eslint-disable prettier/prettier */


import React, { } from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import ProfPic from '../assets/prof.jpg';
import Divider from './Divider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function About(){

    const Styles = {
        profileView: {
            marginTop: '8%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: '9%',
        },
        profilePic: {
            width: 70,
            height: 70,
            borderRadius: 35,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        profileText: {
            color: 'white',
            fontSize: 20,
            marginTop: '3%',
        },
        profileText2: {
            color:'white',
            fontSize: 15,
            textAlign: 'center',
            marginTop: '2%',
        },
        developerView: {
            paddingTop: '4%',
            paddingBottom: '6%',
        },
        developerText: {
            color: 'orange',
            marginLeft: '3%',
            fontSize: 15,
        },
        developerText2: {
            color: 'white',
            marginLeft: '3%',
            marginTop: '3%',
        },
        genericText: {
            paddingTop: '3%',
            marginLeft: '3%',
            color: 'white',
            fontSize: 15,
        },
    };


    return (
        <SafeAreaView>
            <View style={Styles.profileView}>
                <Image
                    style={Styles.profilePic}
                    source={ProfPic}
                />
                <Text style={Styles.profileText}>
                    Daily Finance Inspiration
                </Text>
                <Text style={Styles.profileText2}>
                    v1.5
                </Text>
            </View>
            <View style={Styles.developerView}>
                <Text style={Styles.developerText}>Developer</Text>
                <Text style={Styles.developerText2}> <FontAwesome5 name="envelope" style={{ color: 'white', fontSize: 20,}}/>     Richinbk1@gmail.com</Text>
            </View>
            <Divider/>
            <View style={{ marginTop: '3%' }}>
                <Text style={Styles.genericText}>Privacy Policy</Text>
                <Text style={Styles.genericText}>Terms & Conditions</Text>
            </View>
        </SafeAreaView>
    );
}

export default About;
