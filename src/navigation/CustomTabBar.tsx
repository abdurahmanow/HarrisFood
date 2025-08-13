// components/CustomTabBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import HomeIcon from '../assets/ico/home.svg';
import HomeIconActive from '../assets/ico/home.activ.svg';

import MenuIcon from '../assets/ico/menu.svg';
import MenuIconActive from '../assets/ico/menu.activ.svg';

import CartIcon from '../assets/ico/cart.svg';
import CartIconActive from '../assets/ico/cart.activ.svg';

import ProfileIcon from '../assets/ico/profile.svg';
import ProfileIconActive from '../assets/ico/profile.activ.svg';

import { useCart } from '../context/CartContext';

const icons: Record<string, { default: React.ComponentType<any>, active: React.ComponentType<any> }> = {
  Home: { default: HomeIcon, active: HomeIconActive },
  Menu: { default: MenuIcon, active: MenuIconActive },
  Cart: { default: CartIcon, active: CartIconActive },
  Profile: { default: ProfileIcon, active: ProfileIconActive },
};

const labels: Record<string, string> = {
  Home: 'Главная',
  Menu: 'Меню',
  Cart: 'Корзина',
  Profile: 'Профиль',
};

const ACTIVE = '#FF9900';
const INACTIVE = '#9CA3AF';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { cartItems } = useCart();

  const totalQty = React.useMemo(
    () => cartItems.reduce((acc, it) => acc + (Number(it.qty) || 0), 0),
    [cartItems]
  );
  const cartBadgeText = totalQty > 99 ? '99+' : String(totalQty);

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 6) }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconSet = icons[route.name];
        const IconComponent = isFocused ? iconSet?.active : iconSet?.default;
        const color = isFocused ? ACTIVE : INACTIVE;
        const label = labels[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={descriptors[route.key]?.options.tabBarAccessibilityLabel}
            testID={`tab-${route.name}`} // ✅ задаём testID сами, не из options
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.75}
          >
            <View style={styles.iconWrapper}>
              {IconComponent ? <IconComponent width={26} height={26} /> : null}

              {route.name === 'Cart' && totalQty > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText} numberOfLines={1}>
                    {cartBadgeText}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.label, { color }]} numberOfLines={1}>
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Inter18Regular',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#FF9900',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Inter18Bold',
  },
});
