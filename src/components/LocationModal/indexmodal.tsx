import React, { useState, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { View } from 'react-native';

import TitleBlock from './TitleBlock';
import DeliveryTabs from './DeliveryTabs';
import SavedAddressList from './SavedAddressList';
import BottomActionArea from './BottomActionArea';
import AddAddressFlow from './AddAddressFlow';
import PickupList from './PickupList';
import { commonStyles } from '../../styles/LocationModal/stylesmodal';
import { useCity } from '../../context/CityContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';

const LocationBottomSheet = React.forwardRef<BottomSheetMethods>((props, ref) => {
  const snapPoints = React.useMemo(() => ['85%'], []);
  const { mode } = useCity();
  const { addresses } = useSavedAddresses();

  const [addingNew, setAddingNew] = useState(true);

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      setAddingNew(true);
    } else {
      setAddingNew(false);
    }
  }, [addresses]);

  const renderDelivery = () => {
    if (addingNew) {
      return (
        <AddAddressFlow onSuccess={() => setAddingNew(false)} />
      );
    }
    return (
      <View style={commonStyles.flex1}>
        <SavedAddressList />
        <BottomActionArea
          onPress={() => setAddingNew(true)}
          isActive={true}
          buttonLabel="Добавить адрес"
        />
      </View>
    );
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={commonStyles.sheetBackground}
      handleIndicatorStyle={commonStyles.handle}
    >
      <View style={commonStyles.contentWrapper}>
        <View style={commonStyles.scroll}>
          <TitleBlock />
          <DeliveryTabs />
        </View>
        {mode === 'delivery' ? renderDelivery() : <PickupList />}
      </View>
    </BottomSheet>
  );
});

export default LocationBottomSheet;
