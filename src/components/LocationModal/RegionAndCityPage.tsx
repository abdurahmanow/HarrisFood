import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import regions from '../../data/regions.json';
import locations from '../../data/locations.json';

import RegionSelect from './RegionSelect';
import AddAddressButton from './AddAddressButton';
import CityDropdown from './CityList';
import BottomActionContainer from './BottomActionContainer';
import { regionListPageStyles as styles } from '../../styles/LocationModal/regionListPageStyles';

type Props = {
  onClose: () => void;
  onSubmit: (regionId: string, cityId: string, address: string) => void;
};

export default function RegionAndCityPage({ onClose, onSubmit }: Props) {
  const [step, setStep] = useState<'region' | 'city'>('region');
  const [regionId, setRegionId] = useState('');
  const [cityId, setCityId] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [agreement, setAgreement] = useState(false);

  const regionName = regions.find(r => r.id === regionId)?.name || '';

  const handleNextFromRegion = () => {
    if (regionId) {
      setStep('city');
    }
  };

  const handleSubmit = () => {
    if (regionId && cityId && street && house && agreement && isStreetValid()) {
      const fullAddress = `${street}, ${house}`;
      onSubmit(regionId, cityId, fullAddress);
    }
  };

  const isStreetValid = () => {
    const isTooLong = street.length > 56;
    const isGarbage = street.length > 20 && !street.includes(' ') && !street.includes('-');
    const hasTripleRepeat = /([А-Яа-яЁё])\1{2,}/i.test(street);
    return !isTooLong && !isGarbage && !hasTripleRepeat;
  };

  const isActive =
    !!cityId && !!street && !!house && agreement && isStreetValid();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (step === 'region' ? onClose() : setStep('region'))}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === 'region' ? 'Выберите регион' : 'Выберите город'}
        </Text>
        <View style={styles.headerRightStub} />
      </View>

      {step === 'region' ? (
        <FlatList
          data={regions}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={[styles.listContent, styles.listContentRegion]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RegionSelect
              name={item.name}
              selected={regionId === item.id}
              onPress={() => setRegionId(item.id)}
            />
          )}
        />
      ) : (
        <CityDropdown
          regionId={regionId}
          selectedId={cityId}
          onSelect={setCityId}
          locations={locations}
          regionName={regionName}
          street={street}
          setStreet={setStreet}
          house={house}
          setHouse={setHouse}
        />
      )}

      {/* Нижняя кнопка */}
      {step === 'region' ? (
        <BottomActionContainer>
          <TouchableOpacity
            style={[styles.nextBtn, !regionId && styles.nextBtnDisabled]}
            onPress={handleNextFromRegion}
            disabled={!regionId}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.nextBtnText,
                !regionId && styles.nextBtnTextDisabled,
              ]}
            >
              Дальше
            </Text>
          </TouchableOpacity>
        </BottomActionContainer>
      ) : (
        <BottomActionContainer>
          <AddAddressButton
            onPress={handleSubmit}
            isActive={isActive}
            showAgreement
            agreementChecked={agreement}
            onAgreementToggle={() => setAgreement(!agreement)}
          />
        </BottomActionContainer>
      )}
    </SafeAreaView>
  );
}
