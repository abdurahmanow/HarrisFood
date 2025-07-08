import React from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AnimatedDot from './AnimatedDot';

type Address = {
  id: string;
  regionName: string;
  cityName: string;
  address?: string;
};

type Props = {
  addresses: Address[];
  selectedId: string;
  selectAddress: (id: string) => void;
  removeAddress: (id: string) => void;
  styles: { [key: string]: any };
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
};

type RenderRightActionsProps = {
  itemId: string;
  isSelected: boolean;
  removeAddress: (id: string) => void;
  styles: any;
};

function RenderRightActions({ itemId, isSelected, removeAddress, styles }: RenderRightActionsProps) {
  if (isSelected) {
    return <View style={styles.hidden} />;
  }
  return (
    <View style={styles.swipeDeleteWrapper}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeAddress(itemId)}
        activeOpacity={0.85}
      >
        <Text style={styles.deleteText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
}

const DefaultEmptyComponent = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <Text style={style}>Сохранённых адресов нету</Text>
);

export default function SavedAddressList({
  addresses,
  selectedId,
  selectAddress,
  removeAddress,
  styles,
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
}: Props) {
  return (
    <BottomSheetFlatList<Address>
      data={addresses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.id;
        return (
          <Swipeable
            enabled={!isSelected}
            friction={2}
            rightThreshold={50}
            overshootRight={false}
            renderRightActions={() => (
              <RenderRightActions
                itemId={item.id}
                isSelected={isSelected}
                removeAddress={removeAddress}
                styles={styles}
              />
            )}
          >
            <View style={styles.addressItem}>
              <TouchableOpacity
                style={styles.touchBlock}
                onPress={() => selectAddress(item.id)}
                activeOpacity={0.85}
                disabled={isSelected}
              >
                <View style={styles.radioOuter}>
                  <AnimatedDot show={isSelected} style={styles.radioDot} />
                </View>
                <View style={styles.textBlock}>
                  <Text style={styles.regionName}>{item.regionName}</Text>
                  <Text style={styles.cityAndAddress} numberOfLines={1} ellipsizeMode="tail">
                    {item.cityName}
                    {item.address ? `, ${item.address}` : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Swipeable>
        );
      }}
      ListEmptyComponent={
        ListEmptyComponent
          ? ListEmptyComponent
          : () => <DefaultEmptyComponent style={styles.emptyText} />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      showsVerticalScrollIndicator={false}
      bounces={false}
      extraData={selectedId}
    />
  );
}
