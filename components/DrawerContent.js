/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Linking} from 'react-native';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Learn from './Learn';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LearnScreen = ({ navigation }) => (
    <Stack.Navigator>
      <Stack.Screen name="Learn" component={Learn} options={{title: 'Learn',headerTitleAlign: 'left', headerStyle:{ backgroundColor: 'rgb(28,28,28)'}}}/>
    </Stack.Navigator>
  );

const styles = StyleSheet.create({
    drawerStyle:{
        flex: 1,
        backgroundColor: 'rgb(28,28,28)',
        height: '100%',
        width: '70%',
    },
    navigationFontStyle: {
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
});


export function DrawerContent(props) {
  return (
        <View style={styles.drawerStyle}>
            <DrawerContentScrollView {... props}>
            <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="home"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>Home</Text>);}}
                onPress={() => {props.navigation.navigate('Home');}}
            />
            <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="bookmark"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>Saved</Text>);}}
                onPress={() => {props.navigation.navigate('Favorites');}}
            />
             <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="user"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>Authors</Text>);}}
                onPress={() => {props.navigation.navigate('Authors');}}
            />
             <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="book"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>Learn</Text>);}}
                onPress={() => {props.navigation.navigate('Learn');}}
            />
            </DrawerContentScrollView>
        </View>
    );
}


