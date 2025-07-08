import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/Notif.svg';
import { useCity } from '../context/CityContext';
import { useSavedAddresses } from '../context/SavedAddressesContext';
import AppText from './AppText';
import { styles } from '../styles/HeaderStyles';

type Props = {
  onLocationPress: () => void;
};

export default function Header({ onLocationPress }: Props) {
  const insets = useSafeAreaInsets();
  const { mode, pickup } = useCity();
  const { selectedAddress } = useSavedAddresses();

  let city = '';
  let street = '';

  if (mode === 'delivery') {
    city = selectedAddress?.cityName || 'Город';
    street = selectedAddress?.address || 'Выберите адрес';
  } else {
    city = pickup?.city || 'Город';
    street = pickup?.street || 'Выберите заведение';
  }

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      <Logo width={95} height={29} style={styles.logo} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addressContainer}
        onPress={onLocationPress}
      >
        <View style={styles.deliveryTextBlock}>
          <AppText style={styles.deliveryTypeText} numberOfLines={1}>
            {mode === 'delivery'
              ? `Доставка | ${city}`
              : `Самовывоз | ${city}`}
          </AppText>
          <AppText style={styles.addressText} numberOfLines={1}>
            {street}
          </AppText>
        </View>
        <LocationIcon width={35} height={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
