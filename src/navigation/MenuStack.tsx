import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/Menu/MenuScreen';
import CategoryProductsScreen from '../screens/Menu/CategoryProductsScreen';
// Если будет экран отдельного товара:
import ProductScreen from '../screens/Menu/ProductScreen';

export type MenuStackParamList = {
  MenuMain: undefined;
  CategoryProducts: { categoryId: string; categoryTitle: string };
  Product: { productId: string; qty?: number };
};

const Stack = createNativeStackNavigator<MenuStackParamList>();

export default function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuMain" component={MenuScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
