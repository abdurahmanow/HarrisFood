import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import MenuBlock from '../../components/MenuBlock';
import CategoryBlock from '../../components/CategoryBlock';

import { useCity } from '../../context/CityContext';

import menuCategories from '../../data/categories.json';
import rawRegions from '../../data/regions.json';
import rawPlaces from '../../data/places.json';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootStack';

const regions = rawRegions as any[];
const places = rawPlaces as any[];

export default function AllMenuScreen() {
  const { mode, regionId, placeId } = useCity();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentRegion = React.useMemo(() => regions.find(r => r.id === regionId), [regionId]);
  const currentPlace = React.useMemo(() => places.find(p => p.id === placeId), [placeId]);

  const categoriesOrder = mode === 'pickup'
    ? currentPlace?.categoriesOrder
    : currentRegion?.categoriesOrder;

  const menuItems = React.useMemo(() => {
    if (categoriesOrder && Array.isArray(categoriesOrder)) {
      return categoriesOrder
        .map(catId => menuCategories.find(cat => cat.id === catId))
        .filter(cat => !!cat)
        .map(cat => ({
          id: cat!.id,
          title: cat!.title,
          image: cat!.id,
          description: cat!.description,
        }));
    } else {
      return menuCategories.map(cat => ({
        id: cat.id,
        title: cat.title,
        image: cat.id,
        description: cat.description,
      }));
    }
  }, [categoriesOrder]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Меню" />

        <MenuBlock
          items={menuItems}
          columns={4}
          onPressItem={item => {
            navigation.navigate('CategoryProducts', {
              categoryId: item.id,
              categoryTitle: item.title,
            });
          }}
        />

        {/* --- Сеты --- */}
        <CategoryBlock
          title="Сеты"
          category="sets"
          count={4}
          onPressProduct={product =>
            navigation.navigate('Product', { productId: product.id, qty: 1 })
          }
        />

        {/* --- Новинки --- */}
        <CategoryBlock
          title="Новинки"
          category="new"
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
