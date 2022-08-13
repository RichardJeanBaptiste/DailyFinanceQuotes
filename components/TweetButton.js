/* eslint-disable prettier/prettier */
import React, {} from 'react';
import {TouchableOpacity, Linking, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function TweetButton(props) {

    const tweetOut = () => {
        Linking.openURL('https://twitter.com/intent/tweet?text=' + props.quote + ' - ' + props.name);
    };

    return (
        <View>
            <TouchableOpacity>
                <FontAwesome5 style={props.buttonStyle} name={'twitter'} onPress={tweetOut}/>
            </TouchableOpacity>
        </View>
    );
}
