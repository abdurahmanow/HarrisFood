import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/location.svg';
import { useCity } from '../context/CityContext';
import { useSavedAddresses } from '../context/SavedAddressesContext';
import { useLocationBottomSheet } from '../context/LocationBottomSheetProvider';
import AppText from './AppText';
import { styles } from '../styles/HeaderStyles';

export default function Header() {
  const insets = useSafeAreaInsets();
  const { mode, place } = useCity(); // <-- теперь берем place, а не placeId!
  const { selectedAddress } = useSavedAddresses();
  const { openLocationBottomSheet } = useLocationBottomSheet();

  let city = '';
  let street = '';

  if (mode === 'delivery') {
    city = selectedAddress?.cityName || 'Город';
    street = selectedAddress?.address || 'Выберите адрес';
  } else {
    city = place?.city || 'Город';
    street = place?.street || 'Выберите заведение';
  }

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      <Logo width={95} height={29} style={styles.logo} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addressContainer}
        onPress={openLocationBottomSheet}
      >
        <View style={styles.deliveryTextBlock}>
          <AppText style={styles.deliveryTypeText} numberOfLines={1}>
            {mode === 'delivery' ? `Доставка | ${city}` : `Самовывоз | ${city}`}
          </AppText>
          <AppText style={styles.addressText} numberOfLines={1}>
            {street}
          </AppText>
        </View>
        {/* !!! -- ОБЕРНИ SVG в контейнер -- */}
        <View style={styles.iconContainer}>
          <LocationIcon width={18} height={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
