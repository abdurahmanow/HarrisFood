import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import MenuBlock from '../../components/MenuBlock';
import CategoryBlock from '../../components/CategoryBlock';

import { useCity } from '../../context/CityContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';

import menuCategories from '../../data/categories.json';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootStack';

export default function AllMenuScreen() {
  const {
    categoriesOrder,
    mode,
    regionId,
    region,
    placeId,
    place,
    setRegionId,
    setLocationId,
    setAddress,
  } = useCity();

  const { selectedAddress } = useSavedAddresses();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // --- DEBUG OUTPUT ---
  console.log('===========================');
  console.log('📦 mode:', mode);
  console.log('📦 regionId:', regionId);
  console.log('📦 placeId:', placeId);
  console.log('📦 region:', region);
  console.log('📦 place:', place);
  console.log('📦 categoriesOrder:', categoriesOrder);
  console.log('📦 selectedAddress:', selectedAddress);
  console.log('===========================');

  // 👉 Автоматическая синхронизация при смене сохранённого адреса
  useEffect(() => {
    if (mode === 'delivery' && selectedAddress) {
      console.log('🔄 Синхронизируем адрес с CityContext');
      setRegionId(selectedAddress.regionId);
      setLocationId(selectedAddress.cityId);
      setAddress(selectedAddress.address);
    }
  }, [mode, selectedAddress, setRegionId, setLocationId, setAddress]);

  const menuItems = React.useMemo(() => {
    if (categoriesOrder && Array.isArray(categoriesOrder)) {
      const items = categoriesOrder
        .map(catId => menuCategories.find(cat => cat.id === catId))
        .filter(Boolean)
        .map(cat => ({
          id: cat!.id,
          title: cat!.title,
          image: cat!.id,
          description: cat!.description,
        }));

      console.log('🧩 Final rendered menuItems:', items.map(i => i.title));
      return items;
    }

    // fallback: все категории
    const allItems = menuCategories.map(cat => ({
      id: cat.id,
      title: cat.title,
      image: cat.id,
      description: cat.description,
    }));
    console.log('🧩 Using fallback menuItems (all categories)');
    return allItems;
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
});
