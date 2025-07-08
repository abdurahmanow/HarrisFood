import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import MenuBlock from '../../components/MenuBlock';
import menuCategories from '../../data/categories.json'; // Укажи правильный путь!


export default function AllMenuScreen() {
  // navigation нужен только для возврата, но "Назад" убираем
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Menu'>>();

  return (
    <View style={styles.container}>
      <Header onLocationPress={() => {}} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="Меню"
          // rightText и onPressRight убраны!
        />

        <MenuBlock
          items={menuCategories}
          columns={4}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingBottom: 16 },
});
