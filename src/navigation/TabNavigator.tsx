import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import ProfileScreen from '../screens/Profile/ProfileScreen';

// Импортируем MenuStack вместо MenuScreen!
import MenuStack from './MenuStack';
import CartStack from './CartStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Главная' }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{ tabBarLabel: 'Меню' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{ tabBarLabel: 'Корзина' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Профиль' }}
      />
    </Tab.Navigator>
  );
}
