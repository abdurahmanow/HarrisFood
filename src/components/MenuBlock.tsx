import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import styles from '../styles/MenuBlockStyles';

const screenWidth = Dimensions.get('window').width;

type MenuItem = {
  id: number;
  title: string;
  image: any;
};

type Props = {
  items: MenuItem[];
  showViewAll?: boolean;
  onViewAllPress?: () => void;
  columns?: number;
};

const MenuBlock: React.FC<Props> = ({ items, showViewAll = false, onViewAllPress, columns = 4 }) => {
  const gap = 16;
  const totalGap = gap * (columns - 1);
  const itemSize = (screenWidth - 48 - totalGap) / columns;

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={[styles.menuItem, { width: itemSize }]}>
      <Image source={item.image} style={styles.menuImage} />
      <Text style={styles.menuText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Меню</Text>
        {showViewAll && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>смотреть все</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}
        contentContainerStyle={{ paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24 }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default MenuBlock;
