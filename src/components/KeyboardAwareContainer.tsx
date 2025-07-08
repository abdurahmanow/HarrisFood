import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function KeyboardAwareContainer({
  children,
  style,
  contentContainerStyle,
}: Props) {
  return (
    <KeyboardAwareScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      enableOnAndroid
      keyboardOpeningTime={0}
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 80}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
// Этот файл надо проверить на надобность
// и удалить, если он не используется в проекте.
// Он предназначен для обертки контента, чтобы корректно обрабатывать клавиатуру
// и предотвращать перекрытие полей ввода клавиатурой.
