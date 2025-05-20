// components/LocationModal/DeliveryTabs.tsx
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useCity} from '../../context/CityContext';
import AppText from '../AppText';
import {styles} from '../../styles/LocationModal/stylesmodal';

export default function DeliveryTabs() {
  const {mode, setMode} = useCity();

  return (
    <View style={styles.tabsContainer}>
      <View style={{marginRight: 9}}>
        <TouchableOpacity
          style={[styles.tab, mode === 'delivery' && styles.tabActive]}
          onPress={() => setMode('delivery')}>
          <AppText
            style={[
              styles.tabText,
              mode === 'delivery' && styles.tabTextActive,
            ]}>
            Выбрать адрес
          </AppText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.tab, mode === 'pickup' && styles.tabActive]}
        onPress={() => setMode('pickup')}>
        <AppText
          style={[styles.tabText, mode === 'pickup' && styles.tabTextActive]}>
          Самовывоз
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
