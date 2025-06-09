import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { TouchableOpacity, View, Text } from 'react-native';
import { regionListStyles } from '../../styles/LocationModal/regionList';
import regions from '../../data/regions.json';
import { useCity } from '../../context/CityContext';

export default function RegionList() {
  const { regionId, setRegionId } = useCity();

  return (
    <BottomSheetFlatList
      data={regions}
      keyExtractor={item => item.id}
      style={regionListStyles.flatListWrapper}
      contentContainerStyle={regionListStyles.regionScrollContent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const selected = regionId === item.id;
        return (
          <TouchableOpacity
            onPress={() => setRegionId(item.id)}
            style={[
              regionListStyles.regionItem,
              selected && regionListStyles.regionItemSelected,
            ]}
          >
            <View style={regionListStyles.radioOuter}>
              {selected && <View style={regionListStyles.radioInner} />}
            </View>
            <Text
              style={[
                regionListStyles.regionText,
                selected && regionListStyles.regionTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
      ListFooterComponent={<View style={regionListStyles.regionBottomSpacer} />}
    />
  );
}
