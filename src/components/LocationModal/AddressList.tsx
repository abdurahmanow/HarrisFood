import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import AppText from '../AppText';
import { styles } from '../../styles/LocationModal/AddressList';

type Props = {
  onAdd: () => void;
};

const mockAddresses = [
  {
    id: '1',
    region: 'Старый Крым',
    city: 'Грушевка',
    address: 'ул. Гагарина 55',
  },
];

export default function AddressList({ onAdd }: Props) {
  const [selectedId, setSelectedId] = useState('1');

  const renderItem = ({ item }: { item: typeof mockAddresses[0] }) => (
    <TouchableOpacity
      style={[
        styles.addressCard,
        selectedId === item.id && styles.addressCardActive,
      ]}
      onPress={() => setSelectedId(item.id)}
    >
      <View style={styles.addressTextBlock}>
        <AppText style={styles.addressRegion}>{item.region}</AppText>
        <AppText style={styles.addressLine}>
          {item.city}, {item.address}
        </AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={mockAddresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <AppText style={styles.addButtonText}>Добавить адрес</AppText>
      </TouchableOpacity>
    </View>
  );
}
