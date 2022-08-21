/* eslint-disable prettier/prettier */


import React, { } from 'react';
import {SafeAreaView, Text, View, Image, ScrollView} from 'react-native';
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
        appView: {
            marginTop: '4%',
            marginLeft: '3%',
            paddingBottom: '5%',
        },
        appText: {
            color: 'orange',
            fontSize: 14,
        },
        rateAppView: {
            marginTop: '3%',
            paddingBottom: '4%',
        },
        rateAppText: {
            color: 'white',
            fontSize: 18,
        },
        rateAppText2: {
            color: 'grey',
            fontSize: 15,
            marginTop: '1.5%',
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
            color: 'grey',
            marginLeft: '3%',
            marginTop: '3%',
            fontSize: 18,
        },
        emailIcon: {
            color: 'white',
            fontSize: 24,
        },
        privacyPolicyView: {
            marginTop: '3%',
            paddingBottom: '8%',
        },
        genericText: {
            paddingTop: '3%',
            marginLeft: '3%',
            color: 'white',
            fontSize: 18,
        },
    };


    return (
        <SafeAreaView>
            <ScrollView>
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
                <View style={Styles.appView}>
                    <Text style={Styles.appText}>Daily Finance Inspiration</Text>

                    <View style={Styles.rateAppView}>
                        <Text style={Styles.rateAppText}>Rate App</Text>
                        <Text style={Styles.rateAppText2}>Help me out by rating the app on the Google Play Store</Text>
                    </View>

                    <View style={Styles.rateAppView}>
                        <Text style={Styles.rateAppText}>Report Bug</Text>
                        <Text style={Styles.rateAppText2}>Report bugs or request new features</Text>
                    </View>

                    <View style={Styles.rateAppView}>
                        <Text style={Styles.rateAppText}>Change Logs</Text>
                        <Text style={Styles.rateAppText2}>Updates to the apps</Text>
                    </View>
                </View>
                <Divider/>
                <View style={Styles.developerView}>
                    <Text style={Styles.developerText}>Developer</Text>
                    <Text style={Styles.developerText2}> <FontAwesome5 name="envelope" style={Styles.emailIcon}/>     Richinbk1@gmail.com</Text>
                </View>
                <Divider/>
                <View style={Styles.privacyPolicyView}>
                    <Text style={Styles.genericText}>Privacy Policy</Text>
                    <Text style={Styles.genericText}>Terms & Conditions</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default About;
