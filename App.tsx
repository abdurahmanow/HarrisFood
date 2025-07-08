import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';

// Проверь пути!
import { CityProvider } from './src/context/CityContext';
import LocationBottomSheetProvider from './src/context/LocationBottomSheetProvider';
import { SavedAddressesProvider } from './src/context/SavedAddressesContext';
import TabNavigator from './src/navigation/TabNavigator';
import AllMenuScreen from './src/screens/Menu/MenuScreen'; // обязательно default export!

const Stack = createStackNavigator();
const gestureRootStyle = { flex: 1 };

export default function MainApp(_props: { style?: any }) {
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
                      {/* сюда добавляй ещё экраны, если надо */}
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
