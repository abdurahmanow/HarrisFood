import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cityListStyles } from '../../styles/LocationModal/cityList';

type Location = {
  id: string;
  name: string;
  region_id: string;
};

type Props = {
  regionId: string;
  selectedId: string;
  onSelect: (id: string) => void;
  locations: Location[];
  regionName: string;
  address: string;
  setAddress: (v: string) => void;
};

export default function CityList({
  regionId,
  selectedId,
  onSelect,
  locations,
  regionName,
  address,
  setAddress,
}: Props) {
  const cities = useMemo(() => locations.filter(city => city.region_id === regionId), [regionId, locations]);
  const needMaxHeight = cities.length > 5;

  if (!regionId) return null;

  return (
    <View style={cityListStyles.container}>
      <Text style={cityListStyles.regionTitle}>{regionName}</Text>

      {/* Список городов */}
      <View style={needMaxHeight ? cityListStyles.flatListWrap : undefined}>
        <FlatList
          data={cities}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            const selected = selectedId === item.id;
            return (
              <TouchableOpacity
                style={[
                  cityListStyles.item,
                  index !== cities.length - 1 && cityListStyles.itemMargin,
                ]}
                onPress={() => onSelect(item.id)}
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

      {/* Поле ввода адреса с KAV */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      >
        <View style={cityListStyles.inputWrapper}>
          <Text style={cityListStyles.inputLabel}>
            Улица, дом <Text style={cityListStyles.inputStar}>*</Text>
          </Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={cityListStyles.input}
            placeholder="Например: Ленина, 10"
            placeholderTextColor="#A9A9A9"
            returnKeyType="done"
            autoCapitalize="sentences"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
