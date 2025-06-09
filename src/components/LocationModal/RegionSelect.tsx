import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { regionListStyles } from '../../styles/LocationModal/regionList';

interface Props {
  name: string;
  selected: boolean;
  onPress: () => void;
}

export default function RegionSelect({ name, selected, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={regionListStyles.regionItem}>
      <View style={regionListStyles.radioOuter}>
        {selected && <View style={regionListStyles.radioInner} />}
      </View>
      <Text style={regionListStyles.regionText}>{name}</Text>
    </TouchableOpacity>
  );
}
