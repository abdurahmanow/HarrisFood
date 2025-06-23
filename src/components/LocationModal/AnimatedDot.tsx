import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  show: boolean;
  style?: StyleProp<ViewStyle>; // <--- добавь этот проп!
};

export default function AnimatedDot({ show, style }: Props) {
  if (!show) {return null;}

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={style}
    />
  );
}
