import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

import { useCart } from '../../context/CartContext';
import { categoryProductsMap } from '../../data/products/categoryFilesMap';
import additivesDataRaw from '../../data/additives.json';
import { parseProducts } from '../../adapters/productsAdapter';
import type { RootStackParamList } from '../../navigation/RootStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product as ProductType } from '../../types/product';
import type { Addition } from '../../types/cart';

import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import AdditiveCard from '../../components/AdditiveCard';
import ProductInfoBlock from '../../components/ProductInfoBlock';
import ProductNotFoundBlock from '../../components/ProductNotFoundBlock';
import uuid from 'react-native-uuid';

import { useToast } from '../../providers/ToastProvider'; // 👈

const CARD_GAP = 16;
const CARD_WIDTH = (Dimensions.get('window').width - CARD_GAP * 3) / 2;

export default function ProductScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { productId, qty: routeQty } = route.params;

  const { show } = useToast(); // 👈 глобальный тост
  const { addToCart } = useCart();

  const allProducts: ProductType[] = useMemo(() => {
    const rawProducts = Object.values(categoryProductsMap).flat();
    return parseProducts(rawProducts);
  }, []);

  const product = allProducts.find((p) => p.id === productId);

  const sizeOptions = product?.sizes?.map((opt) => ({
    id: opt.id,
    label: opt.title,
    price: opt.price,
  })) ?? [];

  const variantOptions = product?.variants?.map((opt) => ({
    id: opt.id,
    label: opt.title,
    price: opt.price,
  })) ?? [];

  const allAdditives = useMemo(() => additivesDataRaw, []);
  const additivesList = Array.isArray(product?.addons)
    ? allAdditives.filter((a) => product.addons!.includes(a.id))
    : [];

  const [selectedAdditives, setSelectedAdditives] = useState<{ [id: string]: number }>({});

  // ✅ только горизонтальный свайп-назад; вертикаль отдаём ScrollView
  const handleGesture = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.END && nativeEvent.translationX > 50) {
      // свайп вправо — назад
      navigation.goBack();
    }
  };

  const handleAddToCart = (
    qty: number,
    sizeId?: string,
    variantId?: string,
    _?: any
  ) => {
    if (!product) return;

    const selected: Addition[] = Object.entries(selectedAdditives)
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const found = allAdditives.find((a) => a.id === id);
        return found
          ? { id: found.id, title: found.title, count, price: found.price }
          : null;
      })
      .filter(Boolean) as Addition[];

    const cartItemId = uuid.v4() as string;

    addToCart({
      cartItemId,
      id: product.id,
      title: product.title,
      price: product.price,
      qty,
      size: sizeId,
      variant: variantId,
      additions: selected,
      image: product.image,
    });

    // ✅ Тост глобальный — отобразится даже после закрытия экрана
    show('Добавлено в корзину', 'success');

    navigation.goBack();
  };

  if (!product) {
    return <ProductNotFoundBlock onPress={() => navigation.goBack()} />;
  }

  return (
    // ⬇️ добавил параметры, чтобы ПанЖест активировался только при горизонтальном движении
    <PanGestureHandler
      onHandlerStateChange={handleGesture}
      activeOffsetX={[-30, 30]}  // активируемся, когда сдвиг по X > 30px в любую сторону
      failOffsetY={[-10, 10]}    // если палец ушёл по вертикали больше 10px — этот жест фейлится (скролл победит)
    >
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header onLocationPress={() => {}} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 36 }}
          showsVerticalScrollIndicator={false}
        >
          <ProductInfoBlock
            image={product.image}
            title={product.title}
            description={product.description}
            sizes={sizeOptions}
            variants={variantOptions}
            minQty={product.minQty ?? 1}
            maxQty={product.maxQty ?? 9999}
            price={product.price}
            price_per={product.price_per}
            per_unit={product.per_unit}
            qtyUnitLabel={product.qtyUnitLabel}
            qtyStep={product.qtyStep}
            currency={product.currency}
            onBack={() => navigation.goBack()}
            initialQty={routeQty}
            onAddToCart={handleAddToCart}
          />

          {additivesList.length > 0 && (
            <View style={{ marginTop: 28, marginBottom: 16 }}>
              <SectionHeader
                title="Добавки"
                style={{ marginTop: 0, marginBottom: 8, paddingLeft: 24, paddingRight: 24 }}
              />
              <FlatList
                data={additivesList}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ gap: CARD_GAP, marginBottom: CARD_GAP }}
                contentContainerStyle={{ paddingHorizontal: CARD_GAP }}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <AdditiveCard
                    additive={item}
                    width={CARD_WIDTH}
                    qty={selectedAdditives[item.id] || 0}
                    onChange={(newQty) =>
                      setSelectedAdditives((prev) => ({ ...prev, [item.id]: newQty }))
                    }
                  />
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
}
