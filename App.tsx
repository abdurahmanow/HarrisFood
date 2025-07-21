import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';

import { CityProvider } from './src/context/CityContext';
import LocationBottomSheetProvider from './src/context/LocationBottomSheetProvider';
import { SavedAddressesProvider } from './src/context/SavedAddressesContext';
import TabNavigator from './src/navigation/TabNavigator';
import AllMenuScreen from './src/screens/Menu/MenuScreen';
import CategoryProductsScreen from './src/screens/Menu/CategoryProductsScreen';
import ProductScreen from './src/screens/Menu/ProductScreen';

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
        <SavedAddressesProvider>
          <CityProvider>
            <LocationBottomSheetProvider>
              <PortalProvider>
                <BottomSheetModalProvider>
                  <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Tabs" component={TabNavigator} />
                      <Stack.Screen name="AllMenu" component={AllMenuScreen} />
                      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
                      <Stack.Screen name="Product" component={ProductScreen} />
                    </Stack.Navigator>
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </PortalProvider>
            </LocationBottomSheetProvider>
          </CityProvider>
        </SavedAddressesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
