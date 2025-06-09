/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCity } from '../../context/CityContext';
import { cityListStyles } from '../../styles/LocationModal/cityList';
import locations from '../../data/locations.json';
import regions from '../../data/regions.json';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const MAX_HEIGHT = 280;

export default function CityList() {
  const { regionId, locationId, setLocationId } = useCity();
  const cities = locations.filter(city => city.region_id === regionId);
  const regionName = regions.find(r => r.id === regionId)?.name || '';

  if (!regionId) {return null;}

  return (
    <View style={[
      cityListStyles.container,
      cities.length > 6 && { maxHeight: MAX_HEIGHT },
    ]}>
      <Text style={cityListStyles.regionTitle}>{regionName}</Text>
      <BottomSheetFlatList
        data={cities}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const selected = locationId === item.id;
          return (
            <TouchableOpacity
              style={[
                cityListStyles.item,
                index !== cities.length - 1 && { marginBottom: 11 },
              ]}
              onPress={() => setLocationId(item.id)}
              activeOpacity={0.85}
            >
              <View style={cityListStyles.radio}>
                {selected && (
                  <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={cityListStyles.radioDot}
                  />
                )}
              </View>
              <Text style={cityListStyles.label}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={cityListStyles.flatListContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
