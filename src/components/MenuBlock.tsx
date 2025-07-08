// MenuBlock.tsx
import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import styles from '../styles/MenuBlockStyles';
import { getCategoryImage } from '../utils/getCategoryImage';

export type RawMenuCategory = {
  id: string;
  title: string;
  image: string;
  showOnHome?: boolean;
  [key: string]: any;
};

export type MenuItem = {
  id: string;
  title: string;
  image: string;
};

export function toMenuItem(raw: RawMenuCategory | undefined): MenuItem | null {
  return raw && raw.id && raw.title && raw.image
    ? { id: raw.id, title: raw.title, image: raw.image }
    : null;
}

type Props = {
  items: MenuItem[];
  columns?: number;
};

const MenuBlock: React.FC<Props> = ({ items, columns = 4 }) => {
  const sidePadding = 20;
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - sidePadding * 1.8) / columns;

  // Добавляем пустые элементы, если последний ряд не полный
  const fullItems = React.useMemo(() => {
    const copy = [...items];
    const lastRowCount = items.length % columns;
    if (lastRowCount !== 0) {
      for (let i = 0; i < columns - lastRowCount; i++) {
        copy.push({ id: `empty-${i}`, title: '', image: '' });
      }
    }
    return copy;
  }, [items, columns]);

  const renderItem = ({ item }: { item: MenuItem }) =>
    item.title ? (
      <View style={[styles.menuItem, { width: itemSize }]}>
        <Image source={getCategoryImage(item.image)} style={styles.menuImage} />
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
    ) : (
      <View style={[styles.menuItem, { width: itemSize }]} />
    );

  return (
    <FlatList
      data={fullItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={columns}
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.columnWrapper}
      scrollEnabled={false}
    />
  );
};

export default MenuBlock;
