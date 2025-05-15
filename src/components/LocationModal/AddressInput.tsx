import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { useCity } from '../../context/CityContext';
import { styles } from '../../styles/LocationModal/AddressInput.styles';

type Props = {
  onSave: () => void;
};

export default function AddressInput({ onSave }: Props) {
  const { setAddress } = useCity();
  const [value, setValue] = useState('');

  const handleSave = () => {
    setAddress(value.trim());
    onSave();
  };

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.title}>Введите адрес доставки</AppText>
      <AppText style={styles.subtitle}>
        Улица, дом, подъезд (если нужно). Мы сохраним этот адрес.
      </AppText>

      <TextInput
        style={styles.input}
        placeholder="Например, ул. Гагарина 55"
        placeholderTextColor="#C0C0C0"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity
        style={[styles.button, !value && styles.buttonDisabled]}
        disabled={!value}
        onPress={handleSave}
      >
        <AppText style={styles.buttonText}>Сохранить адрес</AppText>
      </TouchableOpacity>
    </View>
  );
}
