import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/CitySelect';
import { useCity } from '../../context/CityContext';
import locations from '../../data/locations.json';

type Location = {
  id: string;
  name: string;
  region_id: string;
  price: number;
  free_from: number;
};

type Props = {
  onNext: () => void;
};

export default function CitySelect({ onNext }: Props) {
  const { regionId, locationId, setLocationId } = useCity();
  const [selected, setSelected] = useState(locationId);

  const filteredLocations: Location[] = useMemo(
    () => locations.filter(loc => loc.region_id === regionId),
    [regionId]
  );

  const handleSelect = (id: string) => {
    setSelected(id);
    setLocationId(id);
    onNext();
  };

  const renderItem = ({ item }: { item: Location }) => (
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
        data={filteredLocations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}
