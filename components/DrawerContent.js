/* eslint-disable prettier/prettier */
import React, {} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';


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
                icon = {(color,size) => <Icon style={{ marginLeft: '-2%'}} color={'orange'} size= {30} name="home"/>}
                label={()=> { return (<Text style={{color: 'white', fontSize: 15, fontFamily: 'monospace', fontWeight: 'bold', marginLeft: '-5%'}}>Home</Text>);}}
                onPress={() => {props.navigation.navigate('Home');}}
            />
            <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="bookmark"/>}
                label={()=> { return (<Text style={{color: 'white', fontSize: 15, fontFamily: 'monospace', fontWeight: 'bold', marginLeft: '-3%'}}>Saved</Text>);}}
                onPress={() => {props.navigation.navigate('Favorites');}}
            />
             <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="user"/>}
                label={()=> { return (<Text style={{color: 'white', fontSize: 15, fontFamily: 'monospace', fontWeight: 'bold', marginLeft: '-3%'}}>Authors</Text>);}}
                onPress={() => {props.navigation.navigate('Authors');}}
            />
            <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="book"/>}
                label={()=> { return (<Text style={{color: 'white', fontSize: 15, fontFamily: 'monospace', fontWeight: 'bold', marginLeft: '-13%'}}>Learn</Text>);}}
                onPress={() => {props.navigation.navigate('Learn');}}
            />
            <DrawerItem
                icon = {(color,size) => <Icon style={{ marginLeft: '5%'}}color={'orange'} size= {30} name="info"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>About</Text>);}}
                onPress={() => {props.navigation.navigate('About');}}
            />
            </DrawerContentScrollView>
        </View>
    );
}

/*

    <DrawerItem
                icon = {(color,size) => <Icon color={'orange'} size= {30} name="book"/>}
                label={()=> { return (<Text style={styles.navigationFontStyle}>About</Text>);}}
                onPress={() => {props.navigation.navigate('About');}}
            />
*/


