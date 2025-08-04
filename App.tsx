import React, { useEffect } from 'react';
import { Platform, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';

// Контексты
import { CityProvider } from './src/context/CityContext';
import LocationBottomSheetProvider from './src/context/LocationBottomSheetProvider';
import { SavedAddressesProvider } from './src/context/SavedAddressesContext';
import { CartProvider } from './src/context/CartContext';

// Экраны
import TabNavigator from './src/navigation/TabNavigator';
import AllMenuScreen from './src/screens/Menu/MenuScreen';
import CategoryProductsScreen from './src/screens/Menu/CategoryProductsScreen';
import ProductScreen from './src/screens/Menu/ProductScreen';

// Убираем предупреждение (временно закомментируй при отладке!)
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

const Stack = createStackNavigator();
const gestureRootStyle = { flex: 1 };

export default function MainApp() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      import('react-native-bootsplash').then(RNBootSplash => {
        RNBootSplash.default.hide({ fade: true });
      });
    }
  }, []);

  return (
    <GestureHandlerRootView style={gestureRootStyle}>
      <SafeAreaProvider>
        <CartProvider>
          <SavedAddressesProvider>
            <CityProvider>
              <LocationBottomSheetProvider>
                <PortalProvider>
                  <BottomSheetModalProvider>
                    <NavigationContainer>
                      <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Tabs" component={TabNavigator} />
                        <Stack.Screen
                          name="AllMenu"
                          component={AllMenuScreen}
                        />
                        <Stack.Screen
                          name="CategoryProducts"
                          component={CategoryProductsScreen}
                        />
                        <Stack.Screen
                          name="Product"
                          component={ProductScreen}
                        />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </BottomSheetModalProvider>
                </PortalProvider>
              </LocationBottomSheetProvider>
            </CityProvider>
          </SavedAddressesProvider>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
