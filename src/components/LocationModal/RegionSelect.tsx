import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/RegionSelect';
import { useCity } from '../../context/CityContext';
import regions from '../../data/regions.json';

type Region = {
  id: string;
  name: string;
};

type Props = {
  onNext: () => void;
};

export default function RegionSelect({ onNext }: Props) {
  const { regionId, setRegionId } = useCity();
  const [selected, setSelected] = useState(regionId);

  const handleSelect = (id: string) => {
    setSelected(id);
    setRegionId(id);
    onNext();
  };

  const renderItem = ({ item }: { item: Region }) => (
    <TouchableOpacity
      style={[
        styles.regionItem,
        selected === item.id && styles.regionItemActive,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <AppText style={styles.regionText}>{item.name}</AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={regions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}
