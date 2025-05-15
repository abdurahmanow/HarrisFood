import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/PickupList.styles';

const mockCafes = [
  { id: 'cafe1', name: 'Кафе "Северный"', address: 'г. Симферополь, ул. Кирова 15' },
  { id: 'cafe2', name: 'Кафе "Южный"', address: 'г. Ялта, Набережная 22' },
];

export default function PickupList() {
  const [selected, setSelected] = useState('cafe1');

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const renderItem = ({ item }: { item: typeof mockCafes[0] }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected === item.id && styles.cardActive,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={styles.textBlock}>
        <AppText style={styles.name}>{item.name}</AppText>
        <AppText style={styles.address}>{item.address}</AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={mockCafes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
