import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/BottomAction.styles';

type Props = {
  screen: 'list' | 'region' | 'city' | 'input';
  onNext: () => void;
};

export default function BottomAction({ screen, onNext }: Props) {
  if (screen === 'list') return null;

  let title = 'Продолжить';

  if (screen === 'input') {
    return null; // кнопка "Сохранить адрес" уже есть в AddressInput
  }

  if (screen === 'region') title = 'Выбрать город';
  if (screen === 'city') title = 'Указать улицу';

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <AppText style={styles.buttonText}>{title}</AppText>
      </TouchableOpacity>
    </View>
  );
}
