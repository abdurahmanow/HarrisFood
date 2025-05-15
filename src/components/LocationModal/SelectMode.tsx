import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/SelectMode';
import { useCity } from '../../context/CityContext';

export default function SelectMode() {
  const { mode, setMode } = useCity();

  return (
    <View style={styles.selectModeWrapper}>
      <View style={styles.selectModeHeader}>
        <AppText style={styles.selectTitle}>Выберите город</AppText>
        <AppText style={styles.selectSubtitle}>
          Доставим по адресу или будем ждать вас лично в трёх городах Крыма
        </AppText>
      </View>

      <View style={styles.modeTabs}>
        <TouchableOpacity
          style={[styles.tab, mode === 'delivery' && styles.tabActive]}
          onPress={() => setMode('delivery')}
        >
          <AppText style={[styles.tabText, mode === 'delivery' && styles.tabTextActive]}>
            Выбрать адрес
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, mode === 'pickup' && styles.tabActive]}
          onPress={() => setMode('pickup')}
        >
          <AppText style={[styles.tabText, mode === 'pickup' && styles.tabTextActive]}>
            Самовывоз
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
