import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { productCardStyles as styles } from '../styles/ProductCard/productCardStyles';
import { additivesImages } from '../types/additivesImagesMap';

type Additive = {
  id: string;
  title: string;
  price: number;
  minQty?: number;
  maxQty?: number;
};

type Props = {
  additive: Additive;
  width: number;
};

export default function AdditiveCard({ additive, width }: Props) {
  const {
    id,
    title,
    price,
    minQty = 1,
    maxQty = 20,
  } = additive;

  const [qty, setQty] = useState(minQty);

  // Проверяем: есть ли картинка в map
  const imageSource = additivesImages[id];

  // Итоговая цена
  const totalPrice = price * qty;

  return (
    <View style={[styles.card, { width }]}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={[styles.image, { width }]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              width,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEE',
            },
          ]}
        >
          <Text style={{ color: '#BBB', fontSize: 13 }}>Нет фото</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{totalPrice} ₽</Text>
        <View style={styles.qtyBlock}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(qty - 1, minQty))}
            disabled={qty <= minQty}
          >
            <Text style={[styles.qtyBtnText, qty <= minQty && styles.qtyBtnDisabled]}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.min(qty + 1, maxQty))}
            disabled={qty >= maxQty}
          >
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
