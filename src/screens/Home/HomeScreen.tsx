import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { SliderBanner } from '../../components/SliderBanner';
import MenuBlock, { MenuItem, RawMenuCategory, toMenuItem } from '../../components/MenuBlock';
import SectionHeader from '../../components/SectionHeader';
import CategoryBlock from '../../components/CategoryBlock';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootStack';

import { useCity } from '../../context/CityContext';

import rawRegions from '../../data/regions.json';
import rawPlaces from '../../data/places.json';
import rawMenuCategories from '../../data/categories.json';

const regions = rawRegions as any[];
const places = rawPlaces as any[];
const menuCategories: MenuItem[] = (rawMenuCategories as RawMenuCategory[])
  .map(toMenuItem)
  .filter((item): item is MenuItem => Boolean(item));

function getRandomCategories<T>(all: T[], count: number): T[] {
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function HomeScreen() {
  const { mode, regionId, placeId } = useCity(); // <-- заменили pickupId на placeId
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentRegion = regions.find(r => r.id === regionId);
  const currentPlace = places.find(p => p.id === placeId); // <-- placeId

  const showOnHome =
    mode === 'pickup'
      ? currentPlace?.showOnHome
      : currentRegion?.showOnHome;

  let homeMenuItems: MenuItem[] = [];

  if (showOnHome && Array.isArray(showOnHome)) {
    homeMenuItems = showOnHome
      .map((catId: string) => menuCategories.find((c: MenuItem) => c.id === catId))
      .filter((cat): cat is MenuItem => Boolean(cat));
  } else {
    homeMenuItems = getRandomCategories(menuCategories, 4);
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <SliderBanner />
        <View style={{ height: 8 }} />

        <SectionHeader
          title="Меню"
          rightText="Смотреть все"
          onPressRight={() => navigation.navigate('AllMenu')}
        />
        <MenuBlock
          items={homeMenuItems}
          columns={4}
          onPressItem={item => {
            navigation.navigate('CategoryProducts', {
              categoryId: item.id,
              categoryTitle: item.title,
            });
          }}
        />

        {/* --- Спецблоки товаров --- */}
        <CategoryBlock
          title="Новинки"
          category="new"
          count={4}
          onPressProduct={product =>
            navigation.navigate('Product', { productId: product.id, qty: 1 })
          }
        />

        <CategoryBlock
          title="Рекомендуем"
          category="recommended"
          count={4}
          onPressProduct={product =>
            navigation.navigate('Product', { productId: product.id, qty: 1 })
          }
        />

        <CategoryBlock
          title="Сеты"
          category="sets"
          count={4}
          onPressProduct={product =>
            navigation.navigate('Product', { productId: product.id, qty: 1 })
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingBottom: 16 },
});
