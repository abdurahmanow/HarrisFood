import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeBottomSpacerProps = {
  extra?: number; // если хочешь добавить внутренний отступ помимо safe area
};

export default function SafeBottomSpacer({ extra = 0 }: SafeBottomSpacerProps) {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.bottom + extra }} />;
}
