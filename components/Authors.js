/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {} from 'react';
import { Dimensions } from 'react-native';
import {SafeAreaView, Text, StyleSheet, View, Image} from 'react-native';
import { withTheme } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
   authorImage: {
     width: 110,
     height: 160,
     borderRadius: 5,
   },
   cardStyle:{
    flexDirection: 'column',
    width : 110,
    height : 100,
    backgroundColor: 'rgb(75,77,75)',
    borderRadius: 5,
    marginTop: '5%',
    marginLeft: '4%',
   },
   textStyle:{
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'monospace',
    marginTop: '12%',
   },
   rowStyle: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 10,
   },
   rowStyle2: {
    flexDirection: 'row',
    marginTop: '27%',
    width: Dimensions.get('window').width - 10,
   },
   rowStyle3: {
    flexDirection: 'row',
    marginTop: '25%',
    width: Dimensions.get('window').width - 10,
   },
   scrollStyle: {
     height: '85%',
   },
});


function Authors() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollStyle} contentContainerStyle={{paddingBottom: '40%'}}>
        <View style={styles.rowStyle}>
            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/492px-Warren_Buffett_KU_Visit.jpg',
                }}
              />
              <Text style={styles.textStyle}>Warren Buffett</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Benjamin-Graham-fundamental.jpg',
                }}
              />
              <Text style={styles.textStyle}>Benjamin Graham</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Robert_Kiyosaki_by_Gage_Skidmore.jpg',
                }}
              />
              <Text style={styles.textStyle}>Robert Kiyosaki</Text>
            </View>
        </View>

        <View style={styles.rowStyle2}>
            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Andrew_Carnegie%2C_three-quarter_length_portrait%2C_seated%2C_facing_slightly_left%2C_1913.jpg',
                }}
              />
              <Text style={styles.textStyle}>Andrew Carnegie</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Napoleon_Hill_headshot.jpg',
                }}
              />
              <Text style={styles.textStyle}>Napoleon Hill</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/JP_Morgan.jpg',
                }}
              />
              <Text style={styles.textStyle}>J. P. Morgan</Text>
            </View>
        </View>

        <View style={styles.rowStyle3}>
            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Suze_Orman_Time_100_Shankbone.jpg',
                }}
              />
              <Text style={styles.textStyle}>Suze Orman</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/John_D._Rockefeller_1885.jpg',
                }}
              />
              <Text style={styles.textStyle}>John D. Rockefeller</Text>
            </View>

            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Cornelius_Vanderbilt_Daguerrotype2.jpg',
                }}
              />
              <Text style={styles.textStyle}>Cornelius Vanderbilt</Text>
          </View>
        </View>

        </ScrollView>
        </SafeAreaView>
      );
}

export default Authors;
