import React from 'react';
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
  qty: number;
  onChange: (qty: number) => void;
};

export default function AdditiveCard({ additive, width, qty, onChange }: Props) {
  const {
    id,
    title,
    price,
    maxQty = 20,
  } = additive;

  // Проверяем: есть ли картинка в map
  const imageSource = additivesImages[id];
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
            onPress={() => onChange(Math.max(qty - 1, 0))}
            disabled={qty <= 0}
          >
            <Text style={[styles.qtyBtnText, qty <= 0 && styles.qtyBtnDisabled]}>–</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onChange(Math.min(qty + 1, maxQty))}
            disabled={qty >= maxQty}
          >
            <Text style={[styles.qtyBtnText, qty >= maxQty && styles.qtyBtnDisabled]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
