import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import HomeIcon from '../assets/ico/home.svg';
import HomeIconActive from '../assets/ico/home.activ.svg';

import MenuIcon from '../assets/ico/menu.svg';
import MenuIconActive from '../assets/ico/menu.activ.svg';

import CartIcon from '../assets/ico/cart.svg';
import CartIconActive from '../assets/ico/cart.activ.svg';

import ProfileIcon from '../assets/ico/profile.svg';
import ProfileIconActive from '../assets/ico/profile.activ.svg';

const icons: any = {
  Home: { default: HomeIcon, active: HomeIconActive },
  Menu: { default: MenuIcon, active: MenuIconActive },
  Cart: { default: CartIcon, active: CartIconActive },
  Profile: { default: ProfileIcon, active: ProfileIconActive },
};

export default function CustomTabBar({ state, navigation }: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const iconSet = icons[route.name];
        const IconComponent = isFocused ? iconSet.active : iconSet.default;
        const onPress = () => { if (!isFocused) { navigation.navigate(route.name); } };
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.75}
          >
            {IconComponent && (
              <IconComponent width={26} height={26} />
            )}
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
    paddingBottom: Platform.OS === 'ios' ? 12 : 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 3, // Не нужен, если нет текста
  },
});
