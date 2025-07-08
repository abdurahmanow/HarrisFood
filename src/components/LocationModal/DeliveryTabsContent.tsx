import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  value: 'delivery' | 'pickup';
  delivery: React.ReactNode;
  pickup: React.ReactNode;
};

export default function DeliveryTabsContent({ value, delivery, pickup }: Props) {
  return (
    <View style={styles.content}>
      {value === 'delivery' ? (
        <Animated.View
          key="delivery"
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(180)}
          style={styles.inner}
        >
          {delivery}
        </Animated.View>
      ) : (
        <Animated.View
          key="pickup"
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(180)}
          style={styles.inner}
        >
          {pickup}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    minHeight: 120, // если надо, чтобы анимация не схлопывалась
  },
  inner: {
    flex: 1,
  },
});
