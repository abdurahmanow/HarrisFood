import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useCity } from '../../context/CityContext';
import AppText from '../AppText';
import { tabsStyles } from '../../styles/LocationModal/tabsStyles';

export default function DeliveryTabs() {
  const { mode, setMode } = useCity();

  return (
    <View style={tabsStyles.tabsContainer}>
      <View style={tabsStyles.tabWrapper}>
        <TouchableOpacity
          style={[tabsStyles.tab, mode === 'delivery' && tabsStyles.tabActive]}
          onPress={() => setMode('delivery')}
        >
          <AppText style={[tabsStyles.tabText, mode === 'delivery' && tabsStyles.tabTextActive]}>
            Доставка
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={tabsStyles.tabWrapper}>
        <TouchableOpacity
          style={[tabsStyles.tab, mode === 'pickup' && tabsStyles.tabActive]}
          onPress={() => setMode('pickup')}
        >
          <AppText style={[tabsStyles.tabText, mode === 'pickup' && tabsStyles.tabTextActive]}>
            Самовывоз
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
