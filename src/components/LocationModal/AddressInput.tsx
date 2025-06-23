import React from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { addressInputStyles as styles } from '../../styles/LocationModal/addressInput';
import { useCity } from '../../context/CityContext';

type Props = {
  inputRef?: React.RefObject<TextInput>;
  onFocus?: () => void;
};

export default function AddressInput({ inputRef, onFocus }: Props) {
  const { address, setAddress } = useCity();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Адрес доставки <Text style={styles.star}>*</Text>
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : -5}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Улица, номер дома"
          placeholderTextColor="#A9A9A9"
          returnKeyType="done"
          onFocus={onFocus}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
