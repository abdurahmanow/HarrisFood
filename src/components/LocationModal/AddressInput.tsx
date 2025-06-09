import React from 'react';
import { View, TextInput, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addressInputStyles as styles } from '../../styles/LocationModal/addressInput';
import { useCity } from '../../context/CityContext';

type Props = {
  inputRef?: React.RefObject<TextInput>;
  onFocus?: () => void;
};

export default function AddressInput({ inputRef, onFocus }: Props) {
  const { address, setAddress } = useCity();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Увеличь offset если поле не видно
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={['bottom', 'left', 'right']}>
          <View style={styles.container}>
            <Text style={styles.label}>
              Адрес доставки <Text style={styles.star}>*</Text>
            </Text>
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
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
