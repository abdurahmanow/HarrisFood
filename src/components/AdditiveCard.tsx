import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { productCardStyles as styles } from '../styles/ProductCard/productCardStyles';

type Additive = {
  id: string;
  title: string;
  price: number;
  image?: any;
  minQty?: number;
  maxQty?: number;
};

type Props = {
  additive: Additive;
  width: number;
};

export default function AdditiveCard({ additive, width }: Props) {
  const {
    title,
    price,
    image,
    minQty = 1,
    maxQty = 20,
  } = additive;
  const [qty, setQty] = useState(minQty);

  // Итоговая цена (динамически)
  const totalPrice = price * qty;

  return (
    <View style={[styles.card, { width }]}>
      {image ? (
        <Image source={image} style={[styles.image, { width }]} resizeMode="cover" />
      ) : (
        <View style={[styles.image, { width, backgroundColor: '#EEE', alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ color: '#BBB' }}>Нет фото</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{totalPrice} ₽</Text>
        <View style={styles.qtyBlock}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty - 1)} disabled={qty <= minQty}>
            <Text style={[styles.qtyBtnText, qty <= minQty && styles.qtyBtnDisabled]}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)} disabled={qty >= maxQty}>
            <Text style={[styles.qtyBtnText, qty >= maxQty && styles.qtyBtnDisabled]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
        <Text style={styles.addBtnText}>Добавить в заказ</Text>
      </TouchableOpacity>
    </View>
  );
}
