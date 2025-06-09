// components/LocationModal/TitleBlock.tsx
import React from 'react';
import { View } from 'react-native';
import AppText from '../AppText';
import { commonStyles } from '../../styles/LocationModal/stylesmodal';

export default function TitleBlock() {
  return (
    <View style={commonStyles.titleBlock}>
      <AppText style={commonStyles.title}>Выберите город</AppText>
      <AppText style={commonStyles.description}>
        Доставим по адресу или будем ждать вас лично в трёх городах Крыма
      </AppText>
    </View>
  );
}
