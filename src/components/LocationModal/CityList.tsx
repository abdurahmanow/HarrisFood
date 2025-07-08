import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cityListStyles as styles } from '../../styles/LocationModal/cityList';

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

  if (!regionId) {return null;}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.regionTitle}>{regionName}</Text>

        <View style={styles.flatListWrap}>
          <FlatList
            data={cities}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              const selected = selectedId === item.id;
              return (
                <TouchableOpacity
                  style={[
                    styles.item,
                    index !== cities.length - 1 && styles.itemMargin,
                  ]}
                  onPress={() => onSelect(item.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.radio}>
                    {selected && (
                      <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={styles.radioDot}
                      />
                    )}
                  </View>
                  <Text style={styles.label}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        {/* Поле ввода адреса */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>
            Улица, дом <Text style={styles.inputStar}>*</Text>
          </Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="Например: Ленина, 10"
            placeholderTextColor="#A9A9A9"
            returnKeyType="done"
            autoCapitalize="sentences"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
