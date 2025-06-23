import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import AppText from '../AppText';

type Props = {
  city: string;
  region: string;
  street: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  radioOuterStyle?: StyleProp<ViewStyle>;
  radioInnerStyle?: StyleProp<ViewStyle>;
  textBlockStyle?: StyleProp<ViewStyle>;
  cityTextStyle?: StyleProp<TextStyle>;
  addressTextStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export default function PickupSelect({
  city,
  region,
  street,
  selected,
  onPress,
  style,
  radioOuterStyle,
  radioInnerStyle,
  textBlockStyle,
  cityTextStyle,
  addressTextStyle,
  children,
}: Props) {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.85}>
      <View style={radioOuterStyle}>
        {selected && <View style={radioInnerStyle} />}
      </View>
      <View style={textBlockStyle}>
        <AppText style={cityTextStyle}>{city}</AppText>
        <AppText style={addressTextStyle}>{`${region}, ${street}`}</AppText>
      </View>
      {children}
    </TouchableOpacity>
  );
}
