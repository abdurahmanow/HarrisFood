import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/MenuBlockStyles';
import { getCategoryImage } from '../utils/getCategoryImage';

export type RawMenuCategory = {
  id: string;
  title: string;
  description?: string;
};

export type MenuItem = {
  id: string;
  title: string;
};

export function toMenuItem(raw: RawMenuCategory | undefined): MenuItem | null {
  return raw && raw.id && raw.title
    ? { id: raw.id, title: raw.title }
    : null;
}

type Props = {
  items: MenuItem[];
  columns?: number;
  onPressItem?: (item: MenuItem) => void;
};

const MenuBlock: React.FC<Props> = ({ items, columns = 4, onPressItem }) => {
  const sidePadding = 20;
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - sidePadding * 1.8) / columns;

  const fullItems = React.useMemo(() => {
    const copy = [...items];
    const lastRowCount = items.length % columns;
    if (lastRowCount !== 0) {
      for (let i = 0; i < columns - lastRowCount; i++) {
        copy.push({ id: `empty-${i}`, title: '__empty__' }); // безопасный placeholder
      }
    }
    return copy;
  }, [items, columns]);

  const renderItem = ({ item }: { item: MenuItem }) => {
    const isPlaceholder = item.title === '__empty__';

    if (isPlaceholder) {
      return (
        <View
          style={[styles.menuItem, { width: itemSize, opacity: 0 }]} // невидимый
          pointerEvents="none"
        />
      );
    }

    return (
      <TouchableOpacity
        style={[styles.menuItem, { width: itemSize }]}
        activeOpacity={0.7}
        onPress={() => onPressItem?.(item)}
      >
        <Image source={getCategoryImage(item.id)} style={styles.menuImage} />
        <Text style={styles.menuText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={fullItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.columnWrapper}
      scrollEnabled={false}
    />
  );
};

export default MenuBlock;
