import React, { useState, useMemo } from 'react';
import { View, Modal } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import TitleBlock from './TitleBlock';
import DeliveryTabsAnimated from './DeliveryTabs';
import AddAddressButton from './AddAddressButton';
import PickupList from './PickupList';
import SavedAddressList from './SavedAddressList';
import RegionAndCityPage from './RegionAndCityPage';
import BottomActionContainer from './BottomActionContainer';

import { useSavedAddresses } from '../../context/SavedAddressesContext';
import { useCity } from '../../context/CityContext';

import { commonStyles } from '../../styles/LocationModal/stylesmodal';
import { titleBlockStyles } from '../../styles/LocationModal/titleBlockStyles';
import { deliveryTabsStyles } from '../../styles/LocationModal/tabsStyles';
import { pickupListStyles } from '../../styles/LocationModal/pickupList';
import { savedAddressListStyles } from '../../styles/LocationModal/SavedAddressList';

import pickupLocations from '../../data/pickup_locations.json';
import regions from '../../data/regions.json';
import locations from '../../data/locations.json';

const LocationBottomSheet = React.forwardRef<BottomSheetMethods>((props, ref) => {
  const snapPoints = useMemo(() => ['85%'], []);
  const {
    mode,
    setMode,
    pickupId,
    setPickupId,
  } = useCity();

  const [regionModalVisible, setRegionModalVisible] = useState(false);

  const {
    addresses,
    selectedId,
    selectAddress,
    removeAddress,
    addAddress,
  } = useSavedAddresses();

  const handleOpenRegion = () => {
    setRegionModalVisible(true);
  };

  const handleCloseRegion = () => {
    setRegionModalVisible(false);
  };

  const handleRegionCitySubmit = (
    regionId: string,
    cityId: string,
    address: string,
  ) => {
    setRegionModalVisible(false);
    const regionName = regions.find(r => r.id === regionId)?.name || '';
    const cityName = locations.find(c => c.id === cityId)?.name || '';
    addAddress({
      id: `${regionId}-${cityId}-${Date.now()}`,
      regionId,
      regionName,
      cityId,
      cityName,
      address,
    });
  };

  return (
    <>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={commonStyles.sheetBackground}
        handleIndicatorStyle={commonStyles.handle}
      >
        <View style={commonStyles.contentWrapper}>
          <TitleBlock
            title="Выберите город"
            description="Доставим по адресу или будем ждать вас лично в трёх городах Крыма"
            style={titleBlockStyles.block}
            titleStyle={titleBlockStyles.title}
            descriptionStyle={titleBlockStyles.description}
          />
          <DeliveryTabsAnimated
            value={mode}
            onChange={setMode}
            style={deliveryTabsStyles.tabsContainer}
            tabStyle={deliveryTabsStyles.tab}
            tabTextStyle={deliveryTabsStyles.tabText}
          />

          {mode === 'delivery' ? (
            <>
              <SavedAddressList
                addresses={addresses}
                selectedId={selectedId ?? ''}
                selectAddress={selectAddress}
                removeAddress={removeAddress}
                styles={savedAddressListStyles}
                ListFooterComponent={<View style={{ height: 140 }} />}
              />

              <BottomActionContainer>
                <AddAddressButton
                  onPress={handleOpenRegion}
                  isActive
                  buttonLabel="Добавить адрес"
                />
              </BottomActionContainer>
            </>
          ) : (
            <View style={commonStyles.pickupContent}>
              <PickupList
                data={pickupLocations}
                selectedId={pickupId}
                onSelect={setPickupId}
                itemStyle={pickupListStyles.pickupItem}
                radioOuterStyle={pickupListStyles.pickupRadioOuter}
                radioInnerStyle={pickupListStyles.pickupRadioInner}
                textBlockStyle={pickupListStyles.pickupTextBlock}
                cityTextStyle={pickupListStyles.pickupCity}
                addressTextStyle={pickupListStyles.pickupAddress}
                listContentStyle={pickupListStyles.regionScrollContent}
                bottomSpacerStyle={{ height: 130 }}
              />
            </View>
          )}
        </View>
      </BottomSheet>

      <Modal
        visible={regionModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseRegion}
      >
        <RegionAndCityPage
          onClose={handleCloseRegion}
          onSubmit={handleRegionCitySubmit}
        />
      </Modal>
    </>
  );
});

export default LocationBottomSheet;
