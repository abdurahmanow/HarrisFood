import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { SliderBanner } from '../../components/SliderBanner';
import MenuBlock from '../../components/MenuBlock'; // Импортируем MenuBlock

export default function HomeScreen() {
  // Пример данных для категорий
  const menuItems = [
    { id: 1, title: 'Сеты', image: require('../../assets/img/sets.png') },
    { id: 2, title: 'Роллы', image: require('../../assets/img/rolls.png') },
    { id: 3, title: 'Бургеры', image: require('../../assets/img/burgers.png') },
    { id: 4, title: 'Пицца', image: require('../../assets/img/pizza.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <SliderBanner />

      {/* Блок меню */}
      <MenuBlock
        items={menuItems}
        showViewAll={true}
        onViewAllPress={() => {
          // Здесь будет переход на страницу "Меню"
          console.log('Переход на страницу меню');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
