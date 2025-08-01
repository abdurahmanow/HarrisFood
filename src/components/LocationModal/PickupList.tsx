import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import PickupSelect from './PickupSelect';

type Pickup = {
  id: string;
  name: string;
  city: string;
  region: string;
  street: string;
  phone?: string;
  work_time?: string;
};

type Props = {
  data: Pickup[];
  selectedId: string;
  onSelect: (id: string) => void;
  itemStyle?: any;
  radioOuterStyle?: any;
  radioInnerStyle?: any;
  textBlockStyle?: any;
  cityTextStyle?: any;
  addressTextStyle?: any;
  listContentStyle?: any;
  bottomSpacerStyle?: any;
};

export default function PickupList({
  data,
  selectedId,
  onSelect,
  itemStyle,
  radioOuterStyle,
  radioInnerStyle,
  textBlockStyle,
  cityTextStyle,
  addressTextStyle,
  listContentStyle,
  bottomSpacerStyle,
}: Props) {
  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={item => item.id}
      style={{}}
      contentContainerStyle={listContentStyle}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <PickupSelect
          name={item.name}
          city={item.city}
          region={item.region}
          street={item.street}
          work_time={item.work_time}
          selected={selectedId === item.id}
          onPress={() => onSelect(item.id)}
          style={itemStyle}
          radioOuterStyle={radioOuterStyle}
          radioInnerStyle={radioInnerStyle}
          textBlockStyle={textBlockStyle}
          cityTextStyle={cityTextStyle}
          addressTextStyle={addressTextStyle}
        />
      )}
      ListFooterComponent={<View style={bottomSpacerStyle} />}
    />
  );
}
