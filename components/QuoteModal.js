/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, {useState} from 'react';
import {View, Modal, Text, Pressable, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Divider from './Divider';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    //height: 100,
  },
  modalView: {
    margin: 20,
    marginTop: '-20%',
    height: 550,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-2%',
  },
  scrollView: {
    marginHorizontal: 20,
    width: 325,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 13,
  },
  modalHeaderDesc: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalDesc: {
    width: 300,
    marginTop: 10,
  },
  fullView: {
    width: '100%',
    height: '100%',
  },
});

export default function QuoteModal(props) {
  const [setModalVisible] = useState(false);

  return (
    
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            setModalVisible(!props.modalVisible);
          }}>
          <TouchableOpacity style={{flex: 1}} onPress={() => props.setModalVisible(!props.modalVisible)}>
           
                  <View style={styles.centeredView}>
                  <TouchableWithoutFeedback>
                  <View style={styles.modalView}>
                  <ScrollView style={styles.scrollView}>

                      <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderDesc}>
                          <Text style={styles.modalText}>{props.author}</Text>
                          <Text>{props.bio.life}</Text>
                        </View>
                          <Image
                              style={styles.imageStyle}
                              source={{
                                uri: props.imageUrl,
                              }}
                          />
                      </View>
                      <Divider/>
                          <View>
                            <Text style={{ marginTop: 5 }}>Short Bio</Text>
                            <Text style={styles.modalDesc}>{props.bio.desc}</Text>
                          </View>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => props.setModalVisible(!props.modalVisible)}>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                  </ScrollView>
                  </View>
                  </TouchableWithoutFeedback>
                </View>
          </TouchableOpacity>
        </Modal>
      </View>
  );
}
