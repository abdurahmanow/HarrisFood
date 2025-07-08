import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import AdditiveCard from '../../components/AdditiveCard';
import { useProductCardWidth } from '../../helpers/useProductCardWidth';

import additivesJson from '../../data/additives.json';

export default function ProfileScreen() {
  const cardWidth = useProductCardWidth();

  return (
    <View style={styles.container}>
      <Header onLocationPress={() => {}} />
      <FlatList
        data={additivesJson}
        renderItem={({ item }) => <AdditiveCard additive={item} width={cardWidth} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flatListContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
