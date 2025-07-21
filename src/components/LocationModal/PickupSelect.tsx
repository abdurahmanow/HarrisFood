import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import AppText from '../AppText';

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
  let workTimeDisplay = '';
  if (work_time) {
    workTimeDisplay = work_time === '24/7'
      ? 'Круглосуточно'
      : work_time;
  }

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.85}>
      <View style={radioOuterStyle}>
        {selected && <View style={radioInnerStyle} />}
      </View>
      <View style={textBlockStyle}>
        <AppText style={cityTextStyle}>{name || city}</AppText>
        <AppText style={addressTextStyle}>{`${region}, ${street}`}</AppText>
        {work_time ? (
          <AppText style={{
            color: '#A9A9A9',
            fontFamily: 'Inter18Regular',
            fontSize: 13,
          }}>
            {`График: ${workTimeDisplay}`}
          </AppText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
