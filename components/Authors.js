/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import { Button } from 'react-native';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';
import {SafeAreaView, Text, StyleSheet, View, Image, Linking} from 'react-native';
import { withTheme } from 'react-native-elements';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

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
   modalView: {
    margin: 50,
    backgroundColor: 'rgb(75,77,75)',
    borderRadius: 20,
    padding: 20,
    height: Dimensions.get('window').height - 110,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: '85%',
    height: '55%',
    borderRadius: 5,
  },
});


function Authors() {

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);

    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollStyle} contentContainerStyle={{paddingBottom: '40%'}}>
        <View style={styles.rowStyle}>
            <View style={styles.cardStyle}>
              <TouchableOpacity onPress={() => {setModalVisible1(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/492px-Warren_Buffett_KU_Visit.jpg',
                  }}
                />
              </TouchableOpacity>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
                <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/492px-Warren_Buffett_KU_Visit.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '3%'}}>Born - August 30, 1930</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    Warren Edward Buffett is an American investor, business tycoon, philanthropist, and the chairman and CEO of Berkshire Hathaway. He is considered one of the most successful investors in the world and has a net worth of over US$85.6 billion as of December 2020, making him the world's fourth-wealthiest person.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft: '-5%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible1(!modalVisible1);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/Warren_Buffett');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
              <Text style={styles.textStyle}>Warren Buffett</Text>
            </View>

            <View style={styles.cardStyle}>
              <TouchableOpacity onPress={() => {setModalVisible2(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Benjamin-Graham-fundamental.jpg',
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
                <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Benjamin-Graham-fundamental.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '3%'}}>Born - May 9, 1894</Text>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Died - September 21, 1976</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    Benjamin Graham was a British-born American economist, professor and investor. He is widely known as the "father of value investing", and wrote two of the founding texts in neoclassical investing: Security Analysis (1934) with David Dodd, and The Intelligent Investor (1949).
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft: '-5%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible2(!modalVisible2);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/Benjamin_Graham');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
                <Text style={styles.textStyle}>Benjamin Graham</Text>
            </View>

        <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => {setModalVisible3(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Robert_Kiyosaki_by_Gage_Skidmore.jpg',
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
              <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Robert_Kiyosaki_by_Gage_Skidmore.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Born - April 8, 1947</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    Robert Toru Kiyosaki is an American businessman and author. Kiyosaki is the founder of Rich Global LLC and the Rich Dad Company, a private financial education company that provides personal finance and business education to people through books and videos.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft:'-5%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible3(!modalVisible3);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/Robert_Kiyosaki');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
                <Text style={styles.textStyle}>Robert Kiyosaki</Text>
              </View>
        </View>

        <View style={styles.rowStyle2}>
            <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => {setModalVisible4(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Andrew_Carnegie%2C_three-quarter_length_portrait%2C_seated%2C_facing_slightly_left%2C_1913.jpg',
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
              <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Andrew_Carnegie%2C_three-quarter_length_portrait%2C_seated%2C_facing_slightly_left%2C_1913.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Born - November 25, 1835</Text>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Died - August 11, 1919</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    Andrew Carnegie was a Scottish-American industrialist and philanthropist. Carnegie led the expansion of the American steel industry in the late 19th century and became one of the richest Americans in history.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft: '-6%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible4(!modalVisible4);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/Andrew_Carnegie');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
              <Text style={styles.textStyle}>Andrew Carnegie</Text>
            </View>
            {/**********************************************************************************************************/}
            <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => {setModalVisible5(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Napoleon_Hill_headshot.jpg',
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible5}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
              <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Napoleon_Hill_headshot.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Born - October 26, 1883</Text>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Died - November 8, 1970</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    Oliver Napoleon Hill was an American self-help author. He is known best for his book Think and Grow Rich (1937) which is among the 10 best selling self-help books of all time.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft: '-6%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible5(!modalVisible5);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/Napoleon_Hill');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
              <Text style={styles.textStyle}>Napoleon Hill</Text>
            </View>
            {/**********************************************************************************************************/}
            <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => {setModalVisible6(true);}}>
                <Image
                  style={styles.authorImage}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/JP_Morgan.jpg',
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible6}
                onRequestClose={() => {
                  console.log('Modal closed');
                }}
              >
              <View style={styles.modalView}>
                  <Image
                    style={styles.modalImage}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/JP_Morgan.jpg',
                    }}
                  />
                  <View style={{marginTop: '5%'}}>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Born - April 17, 1837</Text>
                    <Text style={{textAlign:'left',fontFamily: 'monospace',color:'white', paddingBottom: '2%'}}>Died - March 31, 1913</Text>
                    <Text style={{fontFamily: 'monospace',color:'white', fontSize:13}}>
                    John Pierpont Morgan was an American financier and banker who dominated corporate finance on Wall Street throughout the Gilded Age.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: '6%', alignContent: 'center', marginLeft: '-6%'}}>
                    <Pressable style={{paddingRight: 16}} onPress={() => {setModalVisible6(!modalVisible6);}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Close</Text></Pressable>
                    <Pressable onPress={() => {Linking.openURL('https://en.wikipedia.org/wiki/J._P._Morgan');}}><Text style={{color: 'orange', fontFamily: 'monospace', fontSize: 13}}>Wiki</Text></Pressable>
                  </View>
                </View>
              </Modal>
              <Text style={styles.textStyle}>J. P. Morgan</Text>
            </View>
        </View>
        {/**********************************************************************************************************/}
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
        {/**********************************************************************************************************/}
            <View style={styles.cardStyle}>
              <Image
                style={styles.authorImage}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/John_D._Rockefeller_1885.jpg',
                }}
              />
              <Text style={styles.textStyle}>John D. Rockefeller</Text>
            </View>
        {/**********************************************************************************************************/}
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
