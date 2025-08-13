import React, { PropsWithChildren } from 'react';
import { View, Text, ViewStyle, StyleProp, Pressable } from 'react-native';
import { labeledFieldStyles as s } from '../../styles/shared/labeledFieldStyles';

type Props = {
  label: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  pressable?: boolean;
  onPress?: () => void;
  highlighted?: boolean;
  /** Компактный режим — убирает внутренние отступы контейнера */
  compact?: boolean;
};

export default function LabeledField({
  label,
  required,
  style,
  pressable,
  onPress,
  highlighted,
  compact,
  children,
}: PropsWithChildren<Props>) {
  const Wrapper = pressable ? Pressable : View;

  return (
    <View
      style={[
        s.container,
        compact && s.containerCompact,
        highlighted && s.containerHighlighted,
        style,
      ]}
    >
      <View style={s.legendWrap} pointerEvents="none">
        <Text style={s.legendText}>
          {label}
          {required ? <Text style={s.required}> *</Text> : null}
        </Text>
      </View>

      <Wrapper onPress={onPress} style={s.inner}>
        {children}
      </Wrapper>
    </View>
  );
}
