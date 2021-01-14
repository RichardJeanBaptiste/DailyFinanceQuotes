/* eslint-disable prettier/prettier */
import phone from './BookPhoneStyle';
import tablet from './BookTabletStyle';
import Device from 'react-native-device-detection';

export default (Device.isTablet ? tablet : phone);
