import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { SliderBanner } from '../../components/SliderBanner';
import MenuBlock, { MenuItem, RawMenuCategory, toMenuItem } from '../../components/MenuBlock';
import SectionHeader from '../../components/SectionHeader';
import CategoryBlock from '../../components/CategoryBlock';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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

// Описываем родительский TabNavigator
type RootTabParamList = {
  Home: undefined;
  Menu: {
    screen?: string;
    params?: any;
  };
  Cart: undefined;
  Profile: undefined;
};

export default function HomeScreen() {
  const { mode, regionId, placeId } = useCity();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const currentRegion = regions.find(r => r.id === regionId);
  const currentPlace = places.find(p => p.id === placeId);

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

  const goToMenuMain = () => {
    navigation.getParent()?.navigate('Menu', { screen: 'MenuMain' });
  };

  const goToMenuCategory = (item: MenuItem) => {
    navigation.getParent()?.navigate('Menu', {
      screen: 'CategoryProducts',
      params: { categoryId: item.id, categoryTitle: item.title },
    });
  };

  const goToMenuProduct = (product: { id: string }) => {
    navigation.getParent()?.navigate('Menu', {
      screen: 'Product',
      params: { productId: product.id, qty: 1 },
    });
  };

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
          onPressRight={goToMenuMain}
        />

        <MenuBlock
          items={homeMenuItems}
          columns={4}
          onPressItem={goToMenuCategory}
        />

        <CategoryBlock
          title="Новинки"
          category="new"
          count={4}
          onPressProduct={goToMenuProduct}
        />

        <CategoryBlock
          title="Рекомендуем"
          category="recommended"
          count={4}
          onPressProduct={goToMenuProduct}
        />

        <CategoryBlock
          title="Сеты"
          category="sets"
          count={4}
          onPressProduct={goToMenuProduct}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingBottom: 16 },
});
