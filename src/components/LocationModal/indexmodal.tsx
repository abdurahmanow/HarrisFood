// components/LocationModal/indexmodal.tsx
import React, { useMemo, forwardRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { View } from 'react-native';
import TitleBlock from '../LocationModal/TitleBlock';
import DeliveryTabs from '../LocationModal/DeliveryTabs';
import AddAddressButton from '../LocationModal/AddAddressButton';
import { styles } from '../../styles/LocationModal/stylesmodal';

const LocationBottomSheet = forwardRef<BottomSheetMethods>((props, ref) => {
  const snapPoints = useMemo(() => ['85%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <View style={styles.contentWrapper}>
        <BottomSheetScrollView contentContainerStyle={styles.scroll}>
          <TitleBlock />
          <DeliveryTabs />
        </BottomSheetScrollView>

        <AddAddressButton />
      </View>
    </BottomSheet>
  );
});

export default LocationBottomSheet;
