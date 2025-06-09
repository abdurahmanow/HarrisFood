import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { savedAddressListStyles as styles } from '../../styles/LocationModal/SavedAddressList';

type Props = { show: boolean };

export default function AnimatedDot({ show }: Props) {
  if (!show) {return null;}
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.radioDot}
    />
  );
}
