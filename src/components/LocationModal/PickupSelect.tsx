import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../AppText';
import { pickupListStyles } from '../../styles/LocationModal/pickupList';
import AnimatedDot from './AnimatedDot';

interface Props {
  id: string;
  city: string;
  region: string;
  street: string;
  selected: boolean;
  onPress: () => void;
}

export default function PickupSelect({ city, region, street, selected, onPress }: Props) {
  return (
    <TouchableOpacity style={pickupListStyles.pickupItem} onPress={onPress} activeOpacity={0.85}>
      <View style={pickupListStyles.pickupRadioOuter}>
        {/* Вставляем AnimatedDot для красивой анимации выбора */}
        <AnimatedDot show={selected} />
      </View>
      <View style={pickupListStyles.pickupTextBlock}>
        <AppText style={pickupListStyles.pickupCity}>{city}</AppText>
        <AppText style={pickupListStyles.pickupAddress}>{`${region}, ${street}`}</AppText>
      </View>
    </TouchableOpacity>
  );
}
