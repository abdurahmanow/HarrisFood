import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DishCard from '../../components/DishCard';
import menuData from '../../data/menu.json';
import type { Product } from '../../types/product';

export default function MenuScreen() {
  const [menu, setMenu] = useState<Product[]>([]);

  useEffect(() => {
    setMenu(menuData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishCard dish={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  list: { gap: 12 },
});
