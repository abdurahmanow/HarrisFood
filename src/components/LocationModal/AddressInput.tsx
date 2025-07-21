import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { addressInputStyles as styles } from '../../styles/LocationModal/addressInput';

type Props = {
  street: string;
  setStreet: (v: string) => void;
  house: string;
  setHouse: (v: string) => void;
  streetRef?: React.RefObject<TextInput>;
  houseRef?: React.RefObject<TextInput>;
};

export default function AddressInputs({
  street,
  setStreet,
  house,
  setHouse,
  streetRef,
  houseRef,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>
        Улица <Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        ref={streetRef}
        style={styles.input}
        value={street}
        onChangeText={setStreet}
        placeholder="Введите улицу"
        placeholderTextColor="#A9A9A9"
        returnKeyType="next"
        autoCapitalize="sentences"
      />

      <Text style={[styles.label, { marginTop: 14 }]}>
        Дом <Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        ref={houseRef}
        style={styles.input}
        value={house}
        onChangeText={text => {
          // Оставляем только цифры и максимум 3 символа
          const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, 3);
          setHouse(onlyNumbers);
        }}
        placeholder="№"
        placeholderTextColor="#A9A9A9"
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={3}
      />
    </View>
  );
}
