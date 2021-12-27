/* eslint-disable prettier/prettier */

import { Dimensions } from 'react-native';

export default {
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
       fontFamily: 'Mukta-Regular',
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
      scrollStyle: {
       height: '93%',
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
     lifeText: {
       textAlign: 'left',
       fontFamily: 'Mukta-Regular',
       color: 'white',
       paddingBottom: '3%',
       fontSize: 13,
     },
     infoText: {
      fontFamily: 'Mukta-Regular',
      color: 'white',
      fontSize: 13,
    },
    modalFooter: {
      flexDirection: 'row',
      marginTop: '6%',
      alignContent: 'center',
      marginLeft: '-5%',
      fontSize: '13',
    },
    footerText: {
      color: 'orange',
      fontFamily: 'Mukta-Regular',
      fontSize: 13,
    },
};
