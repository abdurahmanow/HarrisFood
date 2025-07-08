import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

import HomeIcon from '../assets/ico/home.svg';
import MenuIcon from '../assets/ico/menu.svg';
import ProfileIcon from '../assets/ico/profile.svg';

const icons: any = { Home: HomeIcon, Menu: MenuIcon, Profile: ProfileIcon, Cart: ProfileIcon }; // Используем ProfileIcon для Cart, замените на нужный иконку

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const IconComponent = icons[route.name];
        const onPress = () => { if (!isFocused) {navigation.navigate(route.name);} };
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.75}
          >
            {IconComponent && (
              <IconComponent width={18} height={18} fill={isFocused ? '#FF9900' : '#A8A8A8'} />
            )}
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 6, // можно 0 если хочешь вообще без отступа
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontFamily: 'Inter18Bold',
    fontSize: 12,
    color: '#A8A8A8',
    marginTop: 5,
  },
  labelActive: {
    color: '#FF9900',
  },
});
