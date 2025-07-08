import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { useProductCardWidth } from '../../helpers/useProductCardWidth';

const products = [
  {
    id: '1',
    title: 'Говяжья печенка',
    description: 'Цена за 100 г',
    price: 150,
    image: require('../../assets/img/products/liver.png'),
    unit: '₽',
    unit_size: '100 г',
    minQty: 1,
    maxQty: 99,
  },
  {
    id: '2',
    title: 'Перепелка',
    description: 'Цена за 100 г',
    price: 200,
    image: require('../../assets/img/products/liver.png'),
    unit: '₽',
    unit_size: '100 г',
    minQty: 1,
    maxQty: 99,
  },
  {
    id: '3',
    title: 'Люля-кебаб',
    description: 'Цена за 100 г',
    price: 150,
    image: require('../../assets/img/products/liver.png'),
    unit: '₽',
    unit_size: '100 г',
    minQty: 1,
    maxQty: 99,
  },
  {
    id: '4',
    title: 'Стейк лосося',
    description: 'Цена за 100 г',
    price: 275,
    image: require('../../assets/img/products/liver.png'),
    unit: '₽',
    unit_size: '100 г',
    minQty: 1,
    maxQty: 99,
  },
];

export default function CartScreen() {
  const cardWidth = useProductCardWidth();

  return (
    <View style={styles.container}>
      <Header onLocationPress={() => {}} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
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
