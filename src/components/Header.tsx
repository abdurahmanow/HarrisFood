import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/Notif.svg';
import Svg, { Path } from 'react-native-svg';
import { useCity } from '../context/CityContext';
import LocationModal from './LocationModal/indexmodal';
import { styles } from '../styles/HeaderStyles';
import AppText from './AppText';

export default function Header() {
  const insets = useSafeAreaInsets();
  const { mode, location, address } = useCity();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
        <Logo width={95} height={29} style={styles.logo} />

        <TouchableOpacity
          style={styles.deliveryWrapper}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.deliveryTextBlock}>
            <AppText style={styles.deliveryTypeText} numberOfLines={1}>
              {mode === 'delivery' ? 'Доставка' : 'Самовывоз'} | {location?.name ?? 'Город'}
            </AppText>

            <View style={styles.addressRow}>
              <Svg width="12" height="8" viewBox="0 0 10 6" fill="none">
                <Path d="M1 1L5 5L9 1" stroke="#101010" strokeWidth="2" />
              </Svg>
              <AppText style={styles.addressText} numberOfLines={1}>
                {address || 'Выберите адрес'}
              </AppText>
            </View>
          </View>

          <View style={styles.iconWrapper}>
            <LocationIcon width={24} height={24} />
          </View>
        </TouchableOpacity>
      </View>

      <LocationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
