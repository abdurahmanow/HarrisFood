import React from 'react';
import { Text, TextProps } from 'react-native';
import { Typography } from '../styles/Typography';

type Variant = keyof typeof Typography;

type Props = TextProps & {
  variant?: Variant;
};

export default function AppText({ variant = 'body', style, ...props }: Props) {
  return (
    <Text {...props} style={[Typography[variant], style]}>
      {props.children}
    </Text>
  );
}
