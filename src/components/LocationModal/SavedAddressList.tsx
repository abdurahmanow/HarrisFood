/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Text, Animated as RNAnimated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useSavedAddresses } from '../../context/SavedAddressesContext';
import { savedAddressListStyles as styles } from '../../styles/LocationModal/SavedAddressList';
import AnimatedDot from './AnimatedDot';
import SafeBottomSpacer from '../SafeBottomSpacer';

const DELETE_BTN_WIDTH = 50;

function RenderRightActions({
  itemId,
  isSelected,
  removeAddress,
}: {
  itemId: string;
  isSelected: boolean;
  removeAddress: (id: string) => void;
}) {
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

export default function SavedAddressList() {
  const { addresses, selectedId, selectAddress, removeAddress } = useSavedAddresses();

  return (
    <RNAnimated.FlatList
      data={addresses}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.id;
        return (
          <Swipeable
            enabled={!isSelected}
            friction={2}
            rightThreshold={DELETE_BTN_WIDTH / 2}
            overshootRight={false}
            renderRightActions={() => (
              <RenderRightActions
                itemId={item.id}
                isSelected={isSelected}
                removeAddress={removeAddress}
              />
            )}
            containerStyle={{ backgroundColor: 'transparent' }}
          >
            <View style={styles.addressItem}>
              <TouchableOpacity
                style={styles.touchBlock}
                onPress={() => selectAddress(item.id)}
                activeOpacity={0.85}
                disabled={isSelected}
              >
                <View style={styles.radioOuter}>
                  <AnimatedDot show={isSelected} />
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
        <Text style={styles.emptyText}>Пока нет добавленных адресов</Text>
      }
      ListFooterComponent={<SafeBottomSpacer extra={80} />} // ← увеличил extra до 80 для 100% видимости последнего элемента
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
}
