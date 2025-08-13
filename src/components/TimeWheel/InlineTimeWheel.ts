import { Platform } from 'react-native';
import InlineTimeWheelIOS from './InlineTimeWheel.ios';
import InlineTimeWheelAndroid from './InlineTimeWheel.android';

const InlineTimeWheel = Platform.OS === 'ios'
  ? InlineTimeWheelIOS
  : InlineTimeWheelAndroid;

export default InlineTimeWheel;
