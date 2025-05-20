// components/LocationModal/AddAddressButton.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/stylesmodal';

export default function AddAddressButton() {
  const handlePress = () => {
    console.log('Добавить адрес');
    // TODO: перейти на экран ввода адреса
  };

  return (
    <View style={styles.addButtonWrapper}>
      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <AppText style={styles.addButtonText}>Добавить адрес</AppText>
      </TouchableOpacity>
    </View>
  );
}
