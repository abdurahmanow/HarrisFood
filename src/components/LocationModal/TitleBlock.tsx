// components/LocationModal/TitleBlock.tsx
import React from 'react';
import { View } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/stylesmodal';

export default function TitleBlock() {
  return (
    <View style={styles.titleBlock}>
      <AppText style={styles.title}>Выберите город</AppText>
      <AppText style={styles.description}>
        Доставим по адресу или будем ждать вас лично в трёх городах Крыма
      </AppText>
    </View>
  );
}
