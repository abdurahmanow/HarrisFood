import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/Notif.svg';
import { useCity } from '../context/CityContext';
import AppText from './AppText';
import { styles } from '../styles/HeaderStyles';

type Props = {
  onLocationPress: () => void;
};

export default function Header({ onLocationPress }: Props) {
  const insets = useSafeAreaInsets();
  const { mode, location, address } = useCity();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      {/* Логотип */}
      <Logo width={95} height={29} style={styles.logo} />

      {/* Адрес и режим + иконка */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addressContainer}
        onPress={onLocationPress}
      >
        <View style={styles.deliveryTextBlock}>
          <AppText style={styles.deliveryTypeText} numberOfLines={1}>
            {mode === 'delivery' ? 'Доставка' : 'Самовывоз'} | {location?.name ?? 'Город'}
          </AppText>

          <AppText style={styles.addressText} numberOfLines={1}>
            {address || 'Выберите адрес'}
          </AppText>
        </View>

        {/* Без подложки — чистая иконка */}
        <LocationIcon width={35} height={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
