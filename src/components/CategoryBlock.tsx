import React, { useMemo } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';
import productsDataRaw from '../data/product.json';
import { parseProducts } from '../adapters/productsAdapter';
import { Product } from '../types/product';

type Props = {
  title: string;             // Заголовок блока ("Новинки", "Популярное" и т.д.)
  category: string;          // id категории или метки ('new', 'popular' и т.д.)
  count?: number;            // Сколько карточек выводить (по умолчанию 4)
  onPressProduct?: (product: Product) => void;
};

const CARD_GAP = 16;
const CARD_WIDTH = (Dimensions.get('window').width - CARD_GAP * 3) / 2;

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// <--- ДОБАВЬ ЭТУ ФУНКЦИЮ
function productHasCategory(product: Product, category: string): boolean {
  if (Array.isArray(product.category)) {
    return product.category.includes(category);
  }
  return product.category === category;
}

export default function CategoryBlock({
  title,
  category,
  count = 4,
  onPressProduct,
}: Props) {
  const allProducts: Product[] = useMemo(
    () => parseProducts(productsDataRaw),
    []
  );

  const filteredProducts = useMemo(() => {
    // спецметки вида isNew/isPopular и т.д.
    if (['new', 'popular', 'sets', 'offers', 'season', 'recommended'].includes(category)) {
      const key = {
        new: 'isNew',
        popular: 'isPopular',
        sets: 'isSet',
        offers: 'isOffer',
        season: 'isSeason',
        recommended: 'isRecommended',
      }[category] as keyof Product;

      return shuffleArray(allProducts.filter(p => !!p[key])).slice(0, count);
    }
    // Обычная категория — с поддержкой массива
    return shuffleArray(
      allProducts.filter(p => productHasCategory(p, category))
    ).slice(0, count);
  }, [allProducts, category, count]);

  return (
    <View style={{ marginBottom: 24 }}>
      <SectionHeader title={title} />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: CARD_GAP,
        }}
        columnWrapperStyle={{
          gap: CARD_GAP,
          marginBottom: CARD_GAP,
        }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            width={CARD_WIDTH}
            onPress={() => onPressProduct?.(item)}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
