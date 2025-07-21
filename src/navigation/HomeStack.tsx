import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoryProductsScreen from '../screens/Menu/CategoryProductsScreen';
import ProductScreen from '../screens/Menu/ProductScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  CategoryProducts: { categoryId: string; categoryTitle: string };
  Product: { productId: string; qty?: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
