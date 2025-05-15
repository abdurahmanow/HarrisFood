import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../styles/LocationModal/stylesmodal';
import SelectMode from '../LocationModal/SelectMode';
import AddressList from '../LocationModal/AddressList';
import PickupList from '../LocationModal/PickupList';
import RegionSelect from '../LocationModal/RegionSelect';
import CitySelect from '../LocationModal/CitySelect';
import AddressInput from '../LocationModal/AddressInput';
import BottomAction from '../LocationModal/BottomAction';
import { useCity } from '../../context/CityContext';

type Props = {
  visible: boolean;
  onClose: () => void;
};

type Screen = 'list' | 'region' | 'city' | 'input';

export default function LocationModal({ visible, onClose }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const { mode } = useCity();
  const [currentScreen, setCurrentScreen] = useState<Screen>('list');

  const snapPoints = useMemo(() => ['85%'], []);
  const [index, setIndex] = useState(-1); // hidden initially

  useEffect(() => {
    if (visible) {
      setIndex(0);
    } else {
      setIndex(-1);
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    setIndex(-1);
    setTimeout(onClose, 250);
  }, [onClose]);

  const renderContent = () => {
    if (mode === 'pickup') return <PickupList />;
    switch (currentScreen) {
      case 'region':
        return <RegionSelect onNext={() => setCurrentScreen('city')} />;
      case 'city':
        return <CitySelect onNext={() => setCurrentScreen('input')} />;
      case 'input':
        return <AddressInput onSave={handleClose} />;
      default:
        return <AddressList onAdd={() => setCurrentScreen('region')} />;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onClose={handleClose}
      enablePanDownToClose
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handle}
      style={styles.sheetContainer}
    >
      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <SelectMode />
        {renderContent()}
        <BottomAction screen={currentScreen} onNext={() => {
          if (currentScreen === 'region') setCurrentScreen('city');
          else if (currentScreen === 'city') setCurrentScreen('input');
        }} />
      </View>
    </BottomSheet>
  );
}
