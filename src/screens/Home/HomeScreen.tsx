import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { SliderBanner } from '../../components/SliderBanner';
import MenuBlock, { MenuItem, RawMenuCategory, toMenuItem } from '../../components/MenuBlock';
import SectionHeader from '../../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../../types/navigation';

import { useLocationBottomSheet } from '../../context/LocationBottomSheetProvider';
import { Portal } from '@gorhom/portal';
import LocationBottomSheet from '../../components/LocationModal/indexmodal';

import rawRegions from '../../data/regions.json';
import rawMenuCategories from '../../data/categories.json';

// ---------- Типизируем
const regions: {
  id: string;
  name: string;
  showOnHome: string[];
  categoriesOrder: string[];
}[] = rawRegions;

const menuCategories: RawMenuCategory[] = rawMenuCategories;

function useSelectedRegionId(): string | null {
  // Тут должен быть твой контекст/Redux
  return null;
}

function getRandomCategories<T>(all: T[], count: number): T[] {
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function HomeScreen() {
  const { ref } = useLocationBottomSheet();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const selectedRegionId = useSelectedRegionId();

  let homeMenuItems: MenuItem[] = [];

  if (selectedRegionId) {
    const region = regions.find(r => String(r.id) === String(selectedRegionId));
    if (region && Array.isArray(region.showOnHome)) {
      homeMenuItems = region.showOnHome
        .map((catId: string) =>
          toMenuItem(menuCategories.find((c: RawMenuCategory) => c.id === catId))
        )
        .filter((cat): cat is MenuItem => Boolean(cat));
    } else {
      homeMenuItems = getRandomCategories(menuCategories, 4).map(toMenuItem).filter((cat): cat is MenuItem => Boolean(cat));
    }
  } else {
    homeMenuItems = getRandomCategories(menuCategories, 4).map(toMenuItem).filter((cat): cat is MenuItem => Boolean(cat));
  }

  return (
    <View style={styles.container}>
      <Header onLocationPress={() => ref.current?.expand()} />

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
          onPressRight={() => navigation.navigate('Menu')}
        />
        <MenuBlock
          items={homeMenuItems}
          columns={4}
        />
      </ScrollView>

      <Portal>
        <LocationBottomSheet ref={ref} />
      </Portal>
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
