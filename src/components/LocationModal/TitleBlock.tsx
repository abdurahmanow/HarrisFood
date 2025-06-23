import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import AppText from '../AppText';

type TitleBlockProps = {
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export default function TitleBlock({
  title,
  description,
  style,
  titleStyle,
  descriptionStyle,
}: TitleBlockProps) {
  return (
    <View style={style}>
      <AppText style={titleStyle}>{title}</AppText>
      <AppText style={descriptionStyle}>{description}</AppText>
    </View>
  );
}
