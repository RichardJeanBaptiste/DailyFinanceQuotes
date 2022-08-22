/* eslint-disable prettier/prettier */


import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, Image, ScrollView, Pressable, Linking, Modal, Dimensions, Button} from 'react-native';
import ProfPic from '../assets/prof.jpg';
import Divider from './Divider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import InAppReview from 'react-native-in-app-review';
import Rate, { AndroidMarket } from 'react-native-rate';


function About(){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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
        centeredView: {
            //flex: 1,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            width: windowWidth - 65,
            height: windowHeight - 60,
            backgroundColor: '#2a2f3c',
            borderRadius: 25,
        },
        modalFooterView: {
            display: 'flex',
            flexDirection: 'row',
            width: windowWidth - 80,
            position: 'absolute',
            bottom: 20,
        },
        modalFooterText: {
            color: 'orange',
            fontSize: 15,
            marginRight: 'auto',
            marginLeft: '3%',
        },
        modalFooterText2: {
            color: 'orange',
            fontSize: 15,
            marginLeft: 'auto',
            marginRight: '3%',
        },
    };

    const [modalVisible, setModalVisible] = useState(false);
    //const [ canReviewApp, setCanReviewApp ] = useState(false);

    /*
    useEffect(() => {
        console.log(InAppReview.isAvailable());
    },[]);
    */


    const reportBugs = () => {
        Linking.openURL('mailto:Richinbk1@gmail.com');
    };

    const linkToMe = () => {
        Linking.openURL('mailto:Richinbk1@gmail.com');
    };

    const RateButton = () => {
        const [rated, setRated] = useState(false);
        return (
            <View>
                <Button title="Rate App" onPress={()=>{
                const options = {
                    //AppleAppID:"2193813192",
                    GooglePackageName:'com.financequotes',
                    //AmazonPackageName:"com.mywebsite.myapp",
                    //OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                    preferredAndroidMarket: AndroidMarket.Google,
                    preferInApp:false,
                    openAppStoreIfInAppFails:true,
                    //fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
                };
                Rate.rate(options, (success, errorMessage)=>{
                    if (success) {
                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                        setRated(true);
                    }
                    if (errorMessage) {
                    // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
                        console.error(`Example page Rate.rate() error: ${errorMessage}`);
                    }
                });
                }} />
            </View>
        );
    };

    const ChangeLogModal = () => {

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(false);
                    }}
                >
                    <View style={Styles.centeredView}>
                        <View style={Styles.modalFooterView}>
                            <Text style={Styles.modalFooterText}>Rate App</Text>
                            <Text style={Styles.modalFooterText2} onPress={() => setModalVisible(false)}>Close</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <ChangeLogModal/>
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

                    <RateButton/>
                    <Pressable>
                        <View style={Styles.rateAppView}>
                            <Text style={Styles.rateAppText}>Rate App</Text>
                            <Text style={Styles.rateAppText2}>Help me out by rating the app on the Google Play Store</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={reportBugs}>
                        <View style={Styles.rateAppView}>
                            <Text style={Styles.rateAppText}>Report Bug</Text>
                            <Text style={Styles.rateAppText2}>Report bugs or request new features</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <View style={Styles.rateAppView}>
                            <Text style={Styles.rateAppText}>Change Logs</Text>
                            <Text style={Styles.rateAppText2}>Updates to the apps</Text>
                        </View>
                    </Pressable>

                </View>
                <Divider/>

                <Pressable onPress={linkToMe}>
                    <View style={Styles.developerView}>
                        <Text style={Styles.developerText}>Developer</Text>
                        <Text style={Styles.developerText2}> <FontAwesome5 name="envelope" style={Styles.emailIcon}/>     Richinbk1@gmail.com</Text>
                    </View>
                </Pressable>

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
