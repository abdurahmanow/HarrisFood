import React from 'react';
import { Text, TextProps } from 'react-native';
import { Typography } from '../styles/Typography';

type Variant = keyof typeof Typography;

type Props = TextProps & {
  variant?: Variant;
  children: React.ReactNode;
};

export default function AppText({
  variant = 'body',
  style,
  children,
  ...props
}: Props) {
  return (
    <Text {...props} style={[Typography[variant], style]}>
      {React.Children.map(children, (child) => {
        if (
          typeof child === 'string' ||
          typeof child === 'number' ||
          React.isValidElement(child)
        ) {
          return child;
        }
        return null; // пропускаем всё, что нельзя рендерить в Text
      })}
    </Text>
  );
}
