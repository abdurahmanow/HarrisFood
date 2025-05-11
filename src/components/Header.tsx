import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/ico/harrislogo.svg';
import LocationIcon from '../assets/ico/Notif.svg';
import Svg, { Path } from 'react-native-svg';
import citiesJson from '../data/cities.json';
import { useCity } from '../context/CityContext';
import { styles } from '../styles/HeaderStyles';
import AppText from './AppText';

type City = {
  id: string;
  name: string;
};

const cities: City[] = citiesJson;

export default function Header() {
  const insets = useSafeAreaInsets();
  const { city, setCity } = useCity();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCityObj = cities.find((c) => c.id === city);
  const cityName = selectedCityObj ? selectedCityObj.name : 'Выберите город';

  useEffect(() => {
    const loadCity = async () => {
      const storedCity = await AsyncStorage.getItem('selectedCity');
      if (storedCity) {
        setCity(storedCity);
      }
    };

    loadCity();
  }, [setCity]);

  const selectCity = async (cityId: string) => {
    setCity(cityId);
    await AsyncStorage.setItem('selectedCity', cityId);
    setModalVisible(false);
  };

  const openModal = () => setModalVisible(true);

  return (
    <>
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
        <Logo width={95} height={29} />

        <TouchableOpacity style={styles.rightContainer} onPress={openModal}>
          <View style={styles.cityInfo}>
            <AppText variant="small" style={styles.cityLabel}>
              Город
            </AppText>

            <View style={styles.cityRow}>
              <Svg width="12" height="8" viewBox="0 0 10 6" fill="none">
                <Path d="M1 1L5 5L9 1" stroke="#101010" strokeWidth="2" />
              </Svg>
              <AppText variant="small" style={styles.cityName} numberOfLines={1}>
                {cityName}
              </AppText>
            </View>
          </View>

          <View style={styles.locationIconWrapper}>
            <LocationIcon width={34} height={34} />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <AppText variant="h2" style={styles.modalTitle}>
              Выберите город
            </AppText>
            <FlatList
              data={cities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectCity(item.id)} style={styles.cityOption}>
                  <AppText variant="body" style={styles.cityOptionText}>
                    {item.name}
                  </AppText>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
