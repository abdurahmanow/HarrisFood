import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import AppText from '../AppText';
import { pickupSelectStyles as styles } from '../../styles/LocationModal/pickupSelectStyles';

type Props = {
  name: string;
  city: string;
  region: string;
  street: string;
  work_time?: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  radioOuterStyle?: StyleProp<ViewStyle>;
  radioInnerStyle?: StyleProp<ViewStyle>;
  textBlockStyle?: StyleProp<ViewStyle>;
  cityTextStyle?: StyleProp<TextStyle>;
  addressTextStyle?: StyleProp<TextStyle>;
};

export default function PickupSelect({
  name,
  city,
  region,
  street,
  work_time,
  selected,
  onPress,
  style,
  radioOuterStyle,
  radioInnerStyle,
  textBlockStyle,
  cityTextStyle,
  addressTextStyle,
}: Props) {
  const workTimeDisplay =
    work_time === '24/7' ? 'Круглосуточно' : work_time || '';

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.85}>
      <View style={radioOuterStyle}>
        {selected && <View style={radioInnerStyle} />}
      </View>
      <View style={textBlockStyle}>
        <AppText style={cityTextStyle}>{name || city}</AppText>

        {/* ✅ объединённая строка, а не вложенные Text */}
        <AppText style={addressTextStyle}>
          {`${region}, ${street}`}
        </AppText>

        {/* ✅ одно выражение внутри одного AppText */}
        {work_time && (
          <AppText style={styles.workTimeText}>
            {`График: ${workTimeDisplay}`}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
}
