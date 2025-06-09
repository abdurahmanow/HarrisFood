import React from 'react';
import { View } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PickupSelect from './PickupSelect';
import { pickupListStyles } from '../../styles/LocationModal/pickupList';
import pickupLocations from '../../data/pickup_locations.json';
import { useCity } from '../../context/CityContext';

export default function PickupList() {
  const { pickupId, setPickupId } = useCity();

  return (
    <BottomSheetFlatList
      data={pickupLocations}
      keyExtractor={(item) => item.id}
      style={pickupListStyles.regionScrollContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={pickupListStyles.regionScrollContent}
      renderItem={({ item }) => (
        <PickupSelect
          id={item.id}
          city={item.city}
          region={item.region}
          street={item.street}
          selected={pickupId === item.id}
          onPress={() => setPickupId(item.id)}
        />
      )}
      ListFooterComponent={<View style={pickupListStyles.regionScrollContent} />}
    />
  );
}
