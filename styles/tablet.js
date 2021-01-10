/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';

export default {
    authorImage: {
        width: '100%',
        height: 310,
        borderRadius: 5,
      },
      cardStyle:{
       flexDirection: 'column',
       width : '30%',
       height : 100,
       backgroundColor: 'rgb(75,77,75)',
       borderRadius: 5,
       marginTop: '7%',
       marginLeft: '3%',
      },
      textStyle:{
       color: 'white',
       textAlign: 'center',
       fontWeight: 'bold',
       fontSize: 21,
       fontFamily: 'monospace',
       marginTop: '5%',
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
        fontFamily: 'monospace',
        color: 'white',
        paddingBottom: '3%',
        fontSize: 25,
     },
      infoText: {
       fontFamily: 'monospace',
       color: 'white',
       fontSize: 25,
     },
     modalFooter: {
        flexDirection: 'row',
        marginTop: '4%',
        alignContent: 'center',
        marginLeft: '-5%',
     },
     footerText: {
        color: 'orange',
        fontFamily: 'monospace',
        fontSize: 25,
      },
};
