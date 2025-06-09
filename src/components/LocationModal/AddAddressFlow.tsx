import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegionList from './RegionList';
import CityList from './CityList';
import AddressInput from './AddressInput';
import BottomActionArea from './BottomActionArea';
import { useCity } from '../../context/CityContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';
import regions from '../../data/regions.json';
import locations from '../../data/locations.json';
import { addAddressFlowStyles as styles } from '../../styles/LocationModal/AddAddressFlowStyles'; // Импортируй стили

type AddAddressFlowProps = {
  onSuccess: () => void;
  showAgreement?: boolean;
};

export default function AddAddressFlow({ onSuccess, showAgreement = true }: AddAddressFlowProps) {
  const { regionId, locationId, address, setRegionId, setLocationId, setAddress } = useCity();
  const { addAddress } = useSavedAddresses();

  // Для чекбокса соглашения
  const [agreement, setAgreement] = useState(false);

  const isActive =
    !!regionId &&
    !!locationId &&
    address.trim().length > 0 &&
    (!showAgreement || agreement);

  const handleAdd = () => {
    if (!isActive) {return;}
    const regionName = regions.find(r => r.id === regionId)?.name || '';
    const cityName = locations.find(l => l.id === locationId)?.name || '';
    addAddress({
      id: Date.now().toString(),
      regionId,
      regionName,
      cityId: locationId,
      cityName,
      address,
    });
    setRegionId('');
    setLocationId('');
    setAddress('');
    setAgreement(false);
    onSuccess();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.content}>
          {!regionId ? (
            <RegionList />
          ) : (
            <>
              <CityList />
              <AddressInput />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
      {/* Кнопка всегда внизу, чекбокс если нужно */}
      {regionId && (
        <BottomActionArea
          onPress={handleAdd}
          isActive={isActive}
          buttonLabel="Добавить адрес"
          showAgreement={showAgreement}
          agreementChecked={agreement}
          onAgreementToggle={() => setAgreement(a => !a)}
        />
      )}
    </SafeAreaView>
  );
}
