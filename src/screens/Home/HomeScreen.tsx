import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { SliderBanner } from '../../components/SliderBanner';
import MenuBlock from '../../components/MenuBlock';
import { useLocationBottomSheet } from '../../context/LocationBottomSheetProvider';
import { Portal } from '@gorhom/portal';
import LocationBottomSheet from '../../components/LocationModal/indexmodal';

export default function HomeScreen() {
  const { ref } = useLocationBottomSheet();

  useEffect(() => {
    ref.current?.expand(); // Автоматическое открытие при старте
  }, [ref]);

  const menuItems = [
    { id: 1, title: 'Сеты', image: require('../../assets/img/sets.png') },
    { id: 2, title: 'Роллы', image: require('../../assets/img/rolls.png') },
    { id: 3, title: 'Бургеры', image: require('../../assets/img/burgers.png') },
    { id: 4, title: 'Пицца', image: require('../../assets/img/pizza.png') },
  ];

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
        <MenuBlock
          items={menuItems}
          showViewAll={true}
          onViewAllPress={() => console.log('Переход на страницу меню')}
        />
      </ScrollView>

      {/* Модальное окно поверх всего */}
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
