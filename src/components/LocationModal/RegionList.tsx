import React from 'react';
import { View, FlatList } from 'react-native';
import regions from '../../data/regions.json';
import RegionSelect from './RegionSelect';
import { regionListStyles } from '../../styles/LocationModal/regionList';

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function RegionList({ selectedId, onSelect }: Props) {
  return (
    <FlatList
      data={regions}
      keyExtractor={item => item.id}
      style={regionListStyles.flatListWrapper}
      contentContainerStyle={regionListStyles.regionScrollContent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <RegionSelect
          name={item.name}
          selected={selectedId === item.id}
          onPress={() => onSelect(item.id)}
        />
      )}
      ListFooterComponent={<View style={regionListStyles.regionBottomSpacer} />}
    />
  );
}
