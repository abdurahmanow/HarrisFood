import ProductScreen from '../screens/Menu/ProductScreen'; // проверь путь!
import AllMenuScreen from '../screens/Menu/MenuScreen';
import OrderScreen from '../screens/Order/OrderScreen';
import CategoryProductsScreen from '../screens/Menu/CategoryProductsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AllMenu: undefined;
  CategoryProducts: { categoryId: string; categoryTitle: string };
  Product: {
    productId: string;
    qty?: number;
    size?: string | null;
    variant?: string | null;
  };
  Order: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllMenu"
        component={AllMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle,
          headerBackTitle: 'Назад',
        })}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />{' '}
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
