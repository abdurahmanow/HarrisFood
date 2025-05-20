import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Product } from '../types/product';

interface Props {
  dish: Product;
  onPress?: () => void; // можно использовать в будущем для перехода на страницу товара
}

export default function DishCard({ dish, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{dish.title}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.price}>{dish.price} ₴</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4e94f3',
  },
});
