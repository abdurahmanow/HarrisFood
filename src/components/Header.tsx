import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/location.svg';
import { useCity } from '../context/CityContext';
import { useSavedAddresses } from '../context/SavedAddressesContext';
import { useLocationBottomSheet } from '../context/LocationBottomSheetProvider';
import AppText from './AppText';
import { styles } from '../styles/HeaderStyles';

type Props = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  onLocationPress?: () => void; // ← ДОБАВЬ ЭТО
  hideLogo?: boolean;
  hideLocation?: boolean;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
};


export default function Header({
  title,
  subtitle,
  onPress,
  hideLogo = false,
  hideLocation = false,
  icon,
  containerStyle,
}: Props) {
  const insets = useSafeAreaInsets();
  const { mode, place } = useCity();
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
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }, containerStyle]}>
      {!hideLogo && <Logo width={95} height={29} style={styles.logo} />}

      {!hideLocation ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addressContainer}
          onPress={onPress || openLocationBottomSheet}
        >
          <View style={styles.deliveryTextBlock}>
            <AppText style={styles.deliveryTypeText} numberOfLines={1}>
              {mode === 'delivery' ? `Доставка | ${city}` : `Самовывоз | ${city}`}
            </AppText>
            <AppText style={styles.addressText} numberOfLines={1}>
              {street}
            </AppText>
          </View>
          <View style={styles.iconContainer}>
            {icon || <LocationIcon width={18} height={18} />}
          </View>
        </TouchableOpacity>
      ) : (
        title && (
          <View style={styles.addressContainer}>
            <View style={styles.deliveryTextBlock}>
              <AppText style={styles.deliveryTypeText} numberOfLines={1}>
                {title}
              </AppText>
              {subtitle && (
                <AppText style={styles.addressText} numberOfLines={1}>
                  {subtitle}
                </AppText>
              )}
            </View>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
          </View>
        )
      )}
    </View>
  );
}
