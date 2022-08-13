/* eslint-disable prettier/prettier */
import React, { useState} from 'react';
import { View, TouchableOpacity, Share} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function ShareButton(props) {


    const onShare = () => {
        const currentMessage = props.quote + ' - ' + props.name;

        Share.share({
          message: currentMessage,
        });
    };

    return (
        <View>
            <TouchableOpacity>
                <FontAwesome5 style={props.shareStyle} name={'share-alt'} onPress={onShare}/>
            </TouchableOpacity>
        </View>
    )
}
