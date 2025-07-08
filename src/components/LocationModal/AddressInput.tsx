import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { addressInputStyles as styles } from '../../styles/LocationModal/addressInput';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
};

export default function AddressInput({
  label = 'Адрес доставки',
  placeholder = 'Улица, номер дома',
  value,
  onChangeText,
  inputRef,
}: Props) {
  return (
    <View >
      <Text style={styles.label}>
        {label} <Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        returnKeyType="done"
        autoCapitalize="sentences"
      />
    </View>
  );
}
