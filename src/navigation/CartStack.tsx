import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/Cart/CartScreen';
import OrderScreen from '../screens/Order/OrderScreen';

export type CartStackParamList = {
  CartScreen: undefined;
  Order: undefined;
};

const Stack = createStackNavigator<CartStackParamList>();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
}
