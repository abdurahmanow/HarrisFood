import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { styles } from '../styles/ProductScreen.styles';
import { formatWeight } from '../utils/formatWeight';

type SizeOption = { id: string; label: string; price: number };
type VariantOption = { id: string; label: string; price?: number };
type AdditiveOption = { id: string; count: number };

type Props = {
  image: any; // require(...) уже подставлен через адаптер
  title: string;
  description?: string;
  sizes?: SizeOption[];
  variants?: VariantOption[];
  minQty: number;
  maxQty: number;
  price: number;
  currency: string;
  onBack?: () => void;
  price_per?: number;
  per_unit?: number;
  qtyUnitLabel?: string;
  qtyStep?: number;
  initialQty?: number;
  onAddToCart?: (
    qty: number,
    sizeId?: string,
    variantId?: string,
    selectedAdditives?: AdditiveOption[]
  ) => void;
};

const QTY_TEXT_WIDTH_WEIGHT = 50;
const QTY_TEXT_WIDTH_PCS = 28;
const GAP_BETWEEN = 10;

export default function ProductInfoBlock({
  image,
  title,
  description,
  sizes = [],
  variants = [],
  minQty,
  maxQty,
  price,
  currency,
  onBack,
  price_per,
  per_unit,
  qtyUnitLabel = 'г',
  qtyStep = 1,
  initialQty,
  onAddToCart,
}: Props) {
  const [qty, setQty] = useState(
    initialQty && initialQty >= minQty && initialQty <= maxQty ? initialQty : minQty
  );
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length ? variants[0].id : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    sizes.length ? sizes[0].id : undefined
  );

  const { width: screenWidth } = useWindowDimensions();

  let totalPrice = 0;
  let baseUnitPrice = price ?? 0;
  if (variants.length) {
    const currentVariant = variants.find(v => v.id === selectedVariant);
    baseUnitPrice = currentVariant?.price ?? price ?? 0;
  }
  if (sizes.length) {
    const currentSize = sizes.find(s => s.id === selectedSize);
    baseUnitPrice = currentSize?.price ?? baseUnitPrice;
  }
  if (!!price_per && !!per_unit) {
    totalPrice = Math.round((qty / per_unit!) * price_per!);
  } else {
    totalPrice = baseUnitPrice * qty;
  }

  const isWeight = !!price_per && !!per_unit;
  const qtyBlockWidth = isWeight ? QTY_TEXT_WIDTH_WEIGHT + 44 : QTY_TEXT_WIDTH_PCS + 44;
  const actionRowWidth = screenWidth - 24 * 2;
  const addBtnWidth = Math.max(isWeight ? 100 : 120, actionRowWidth - qtyBlockWidth - GAP_BETWEEN);

  const displayQtyStr = isWeight ? formatWeight(qty, qtyUnitLabel) : qty;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(qty, selectedSize, selectedVariant, []);
    }
  };

  return (
    <View style={styles.inner}>
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Вернуться назад</Text>
        </TouchableOpacity>
      )}

      <View style={styles.imageWrap}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}

      {variants.length > 0 && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Вариант:</Text>
          <View style={styles.sizeRow}>
            {variants.map(opt => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.sizeBtn,
                  selectedVariant === opt.id && styles.sizeBtnActive,
                ]}
                onPress={() => setSelectedVariant(opt.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.sizeBtnText,
                    selectedVariant === opt.id && styles.sizeBtnTextActive,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {sizes.length > 0 && (
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Размер:</Text>
          <View style={styles.sizeRow}>
            {sizes.map(opt => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.sizeBtn,
                  selectedSize === opt.id && styles.sizeBtnActive,
                ]}
                onPress={() => setSelectedSize(opt.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.sizeBtnText,
                    selectedSize === opt.id && styles.sizeBtnTextActive,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.price}>
        {totalPrice} <Text style={styles.rub}>{currency}</Text>
      </Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.addBtn,
            { minWidth: isWeight ? 100 : 120, maxWidth: addBtnWidth, width: addBtnWidth }
          ]}
          activeOpacity={0.85}
          onPress={handleAdd}
        >
          <Text
            style={[
              styles.addBtnText,
              addBtnWidth < 110 && { fontSize: 14 }
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Добавить в заказ
          </Text>
        </TouchableOpacity>

        <View style={[
          styles.qtyBlock,
          {
            minWidth: qtyBlockWidth,
            maxWidth: qtyBlockWidth,
            width: qtyBlockWidth,
            marginLeft: GAP_BETWEEN,
          },
        ]}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(qty - (qtyStep || 1), minQty))}
            disabled={qty === minQty}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.qtyBtnText,
                qty === minQty && styles.qtyBtnDisabled,
              ]}
            >
              –
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.qtyText,
              isWeight
                ? { minWidth: QTY_TEXT_WIDTH_WEIGHT, maxWidth: QTY_TEXT_WIDTH_WEIGHT }
                : { minWidth: QTY_TEXT_WIDTH_PCS, maxWidth: QTY_TEXT_WIDTH_PCS },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {displayQtyStr}
          </Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.min(qty + (qtyStep || 1), maxQty))}
            disabled={qty === maxQty}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.qtyBtnText,
                qty === maxQty && styles.qtyBtnDisabled,
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
