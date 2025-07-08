import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { productCardStyles as styles } from '../styles/ProductCard/productCardStyles';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  unit: string;
  unit_size: string;
  minQty?: number;
  maxQty?: number;
};

type Props = {
  product: Product;
  width: number;
};

export default function ProductCard({ product, width }: Props) {
  const {
    title,
    price,
    image,
    unit,
    unit_size,
    minQty = 1,
    maxQty = 99,
  } = product;
  const [qty, setQty] = useState(minQty);

  const onInc = () => setQty(qty < maxQty ? qty + 1 : qty);
  const onDec = () => setQty(qty > minQty ? qty - 1 : qty);

  const totalPrice = price * qty;

  return (
    <View style={[styles.card, { width }]}>
      <Image source={image} style={[styles.image, { width }]} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Цена за {unit_size}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{totalPrice} {unit}</Text>
        <View style={styles.qtyBlock}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDec} disabled={qty === minQty}>
            <Text style={[styles.qtyBtnText, qty === minQty && styles.qtyBtnDisabled]}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={onInc} disabled={qty === maxQty}>
            <Text style={[styles.qtyBtnText, qty === maxQty && styles.qtyBtnDisabled]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
        <Text style={styles.addBtnText}>Добавить в заказ</Text>
      </TouchableOpacity>
    </View>
  );
}
