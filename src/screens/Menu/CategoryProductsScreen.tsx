import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStack';

import { categoryProductsMap } from '../../data/products/categoryFilesMap';
import categories from '../../data/categories.json';
import { parseProducts } from '../../adapters/productsAdapter';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/product';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import { useCart } from '../../context/CartContext';
import uuid from 'react-native-uuid';

import { useToast } from '../../providers/ToastProvider'; // 👈 добавили тост

const CARD_GAP = 16;
const CARD_WIDTH = (Dimensions.get('window').width - CARD_GAP * 3) / 2;

export default function CategoryProductsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryProducts'>>();
  const { categoryId } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();
  const { show } = useToast(); // 👈 хук тоста

  const rawProducts = React.useMemo(
    () => categoryProductsMap[categoryId] || [],
    [categoryId],
  );

  const products: Product[] = React.useMemo(
    () => parseProducts(rawProducts).filter(p => !!p.id),
    [rawProducts],
  );

  const currentCategoryTitle =
    categories.find((c: any) => c.id === categoryId)?.title || '';

  return (
    <View style={styles.container}>
      <Header onLocationPress={() => {}} />

      <SectionHeader
        title="Меню"
        category={currentCategoryTitle}
        rightText="Назад"
        onPressRight={() => navigation.goBack()}
      />

      <FlatList
        data={products}
        keyExtractor={item => `${item.id}|${item.size || ''}|${item.variant || ''}`}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const handleAddToCart = () => {
            const cartItemId = uuid.v4().toString();
            addToCart({
              cartItemId,
              id: item.id,
              title: item.title,
              image: item.image,
              size: item.size,
              variant: item.variant,
              price: item.price,
              qty: 1,
              additions: [],
            });

            // ✅ показать уведомление
            show('Добавлено в корзину', 'success');
          };

          return (
            <ProductCard
              product={item}
              width={CARD_WIDTH}
              onPress={() =>
                navigation.navigate('Product', {
                  productId: item.id,
                  size: item.size || null,
                  variant: item.variant || null,
                  qty: 1,
                })
              }
              onAddToCart={handleAddToCart} // показывает тост
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ padding: 32 }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Inter18Regular',
                fontSize: 16,
                color: '#888',
              }}
            >
              Нет товаров в этой категории
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flatListContent: {
    padding: CARD_GAP,
    paddingTop: 8,
    paddingBottom: 24,
  },
  row: { gap: CARD_GAP, marginBottom: CARD_GAP },
});
