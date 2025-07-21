import React, { useMemo } from 'react';
import { View, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

import productsDataRaw from '../../data/product.json';
import additivesDataRaw from '../../data/additives.json';
import { parseProducts } from '../../adapters/productsAdapter';
import type { RootStackParamList } from '../../navigation/RootStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product as ProductType } from '../../types/product';

import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import AdditiveCard from '../../components/AdditiveCard';
import ProductInfoBlock from '../../components/ProductInfoBlock';
import ProductNotFoundBlock from '../../components/ProductNotFoundBlock';

const CARD_GAP = 16;
const CARD_WIDTH = (Dimensions.get('window').width - CARD_GAP * 3) / 2;

export default function ProductScreen() {
  // Используем только RootStackParamList
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { productId, qty: routeQty } = route.params;

  const allProducts: ProductType[] = useMemo(
    () => parseProducts(productsDataRaw),
    []
  );
  const product = allProducts.find((p) => p.id === productId);

  // sizes
  const sizeOptions = product?.sizes
    ? product.sizes.map((opt) => ({
        id: opt.id,
        label: opt.title,
        price: opt.price,
      }))
    : [];

  // variants
  const variantOptions = product?.variants
    ? product.variants.map((opt) => ({
        id: opt.id,
        label: opt.title,
        price: opt.price,
      }))
    : [];

  const allAdditives = useMemo(() => additivesDataRaw, []);
  const additivesList = Array.isArray(product?.addons)
    ? allAdditives.filter((a) => product.addons!.includes(a.id))
    : [];

  const handleGesture = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
    if (
      nativeEvent.state === State.END &&
      (nativeEvent.translationX > 50 || nativeEvent.translationY > 50)
    ) {
      navigation.goBack();
    }
  };

  if (!product) {
    return <ProductNotFoundBlock onPress={() => navigation.goBack()} />;
  }

  return (
    <PanGestureHandler onHandlerStateChange={handleGesture}>
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
          />

          {additivesList.length > 0 && (
            <View style={{ marginTop: 28, marginBottom: 16 }}>
              <SectionHeader
                title="Добавки"
                style={{
                  marginTop: 0,
                  marginBottom: 8,
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              />
              <FlatList
                data={additivesList}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{
                  gap: CARD_GAP,
                  marginBottom: CARD_GAP,
                }}
                contentContainerStyle={{ paddingHorizontal: CARD_GAP }}
                renderItem={({ item }) => (
                  <AdditiveCard additive={item} width={CARD_WIDTH} />
                )}
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
}
