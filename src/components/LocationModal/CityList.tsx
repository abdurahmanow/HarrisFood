import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cityListStyles as styles } from '../../styles/LocationModal/cityList';
import AddressInputs from './AddressInput';

type Location = {
  id: string;
  name: string;
  region_id: string;
};

type Props = {
  regionId: string;
  selectedId: string;
  onSelect: (id: string) => void;
  locations: Location[];
  regionName: string;
  street: string;
  setStreet: (v: string) => void;
  house: string;
  setHouse: (v: string) => void;
};

export default function CityDropdown({
  regionId,
  selectedId,
  onSelect,
  locations,
  regionName,
  street,
  setStreet,
  house,
  setHouse,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const cities = useMemo(
    () => locations.filter(city => city.region_id === regionId),
    [regionId, locations]
  );
  const selectedCity = cities.find(city => city.id === selectedId);

  if (!regionId) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.regionTitle}>{regionName}</Text>

      {/* Кнопка выбора города */}
      <TouchableOpacity
        style={cityDropdownStyles.dropdownButton}
        activeOpacity={0.85}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            cityDropdownStyles.dropdownText,
            !selectedCity && { color: '#A9A9A9' },
          ]}
        >
          {selectedCity ? selectedCity.name : 'Выберите город'}
        </Text>
        <Text style={{ fontSize: 16, color: '#FFA52F', marginLeft: 8 }}>▼</Text>
      </TouchableOpacity>

      {/* Выпадающий список городов */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={cityDropdownStyles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(120)}
            style={cityDropdownStyles.modalContent}
          >
            <ScrollView
              style={{ maxHeight: 270 }}
              contentContainerStyle={{ paddingVertical: 2 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            >
              {cities.map(city => (
                <TouchableOpacity
                  key={city.id}
                  style={cityDropdownStyles.option}
                  onPress={() => {
                    onSelect(city.id);
                    setModalVisible(false);
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={cityDropdownStyles.optionText}>
                    {city.name}
                  </Text>
                  {selectedId === city.id && (
                    <Text
                      style={{
                        color: '#FFA52F',
                        fontSize: 18,
                        marginLeft: 8,
                      }}
                    >
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Поля адреса */}
      <AddressInputs
        street={street}
        setStreet={setStreet}
        house={house}
        setHouse={setHouse}
      />
    </View>
  );
}

const cityDropdownStyles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 7,
    borderWidth: 1.2,
    borderColor: '#FFA52F',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 18,
    marginTop: 2,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontFamily: 'Inter18Regular',
    fontSize: 18,
    color: '#222',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(22,22,22,0.20)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    minWidth: 250,
    maxWidth: 360,
    paddingVertical: 6,
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F4',
  },
  optionText: {
    flex: 1,
    fontFamily: 'Inter18Regular',
    fontSize: 18,
    color: '#222',
  },
});
