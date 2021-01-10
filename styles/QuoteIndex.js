/* eslint-disable prettier/prettier */
import phone from './QuotePhoneStyle';
import tablet from './QuoteTabletStyle';
import Device from 'react-native-device-detection';

export default (Device.isTablet ? tablet : phone);
