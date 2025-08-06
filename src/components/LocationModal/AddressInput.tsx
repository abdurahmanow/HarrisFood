import React, { useRef } from 'react';
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
  const prevStreetRef = useRef(street);

  const handleStreetChange = (input: string) => {
    const prev = prevStreetRef.current;
    const diff = input.length - prev.length;
    const isAddition = diff > 0;
    const addedChar = isAddition ? input.slice(-diff) : '';

    // Разрешаем только кириллицу, пробел и дефис
    const isValidChar = /^[А-Яа-яЁё \-]$/.test(addedChar);
    if (!isAddition || isValidChar) {
      let cleaned = input
        .replace(/\s{2,}/g, ' ') // двойные пробелы
        .replace(/-{2,}/g, '-') // двойные дефисы
        .replace(/^[\s\-]+|[\s\-]+$/g, ''); // пробелы и дефисы по краям

      // Проверки на мусор
      const isTooLong = cleaned.length > 56;
      const isTripleLetters = /([А-Яа-яЁё])\1\1+/i.test(cleaned);
      if (isTooLong || isTripleLetters) return;

      // Приведение к формату: каждое слово и часть после дефиса — с заглавной буквы
      const formatted = cleaned
        .split(' ')
        .map(word =>
          word
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join('-')
        )
        .join(' ');

      prevStreetRef.current = formatted;
      setStreet(formatted);
    }
  };

  const handleHouseChange = (text: string) => {
    const numbers = text.replace(/[^0-9]/g, '').slice(0, 3);
    setHouse(numbers);
  };

  return (
    <View>
      <Text style={styles.label}>
        Улица <Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        ref={streetRef}
        style={styles.input}
        value={street}
        onChangeText={handleStreetChange}
        placeholder="Введите улицу"
        placeholderTextColor="#A9A9A9"
        keyboardType="default"
        returnKeyType="next"
        autoCorrect={false}
        autoCapitalize="sentences"
        importantForAutofill="no"
        textContentType="addressCityAndState"
        autoComplete="street-address"
      />

      <Text style={[styles.label, { marginTop: 14 }]}>
        Дом <Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        ref={houseRef}
        style={styles.input}
        value={house}
        onChangeText={handleHouseChange}
        placeholder="№"
        placeholderTextColor="#A9A9A9"
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={3}
      />
    </View>
  );
}
