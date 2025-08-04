import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { productCardStyles as styles } from '../styles/ProductCard/productCardStyles';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext'; // ✅ добавили

function formatWeight(value: number, unit: string = 'г'): string {
  if (unit === 'г' || unit === 'гр' || unit === 'грамм' || unit === 'граммов') {
    if (value < 1000) {
      return `${value} г`;
    } else {
      const kg = value / 1000;
      return `${kg % 1 === 0 ? kg.toFixed(0) : kg.toFixed(2).replace(/\.?0+$/, '')} кг`;
    }
  }
  return `${value} ${unit}`;
}

type Props = {
  product: Product;
  width: number;
  onPress?: () => void;
};

export default function ProductCard({ product, width, onPress }: Props) {
  const {
    id,
    title,
    image,
    currency = '₽',
    price,
    price_per,
    per_unit,
    qtyUnitLabel = 'г',
    qtyStep = 1,
    minQty = 1,
    maxQty = 9999,
  } = product;

  const [qty, setQty] = useState(minQty);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart(); // ✅

  const isWeight = !!price_per && !!per_unit;
  let displayPrice: number;
  let qtyDisplay: string;

  if (isWeight) {
    displayPrice = Math.round(((qty / per_unit) * price_per) * 100) / 100;
    qtyDisplay = formatWeight(qty, qtyUnitLabel);
  } else {
    displayPrice = Number(price) * qty;
    qtyDisplay = qty.toString();
  }

  const showPrice = isNaN(displayPrice) ? '—' : displayPrice;
  const qtyBlockMinWidth = isWeight ? 56 : 40;

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: isWeight ? (displayPrice / qty) : price, // Цена за единицу
      qty,
      image,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.card, { width }]}>
        {imgError || !image ? (
          <View style={[styles.noImage, { width }]}>
            <Text style={styles.noImageText}>Нет фото</Text>
          </View>
        ) : (
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={[styles.image, { width }]}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        )}

        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {showPrice} {currency}
          </Text>

          <View style={[styles.qtyBlock, { minWidth: qtyBlockMinWidth }]}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.max(qty - qtyStep, minQty))}
              disabled={qty <= minQty}
              activeOpacity={0.7}
            >
              <Text style={[styles.qtyBtnText, qty <= minQty && styles.qtyBtnDisabled]}>–</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText} numberOfLines={1} adjustsFontSizeToFit>
              {qtyDisplay}
            </Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.min(qty + qtyStep, maxQty))}
              disabled={qty + qtyStep > maxQty}
              activeOpacity={0.7}
            >
              <Text style={[styles.qtyBtnText, qty + qtyStep > maxQty && styles.qtyBtnDisabled]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={handleAddToCart}>
          <Text style={styles.addBtnText} numberOfLines={1} adjustsFontSizeToFit>
            Добавить в заказ
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
