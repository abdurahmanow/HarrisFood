import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';

import HomeScreen from './src/screens/Home/HomeScreen';
import { CityProvider } from './src/context/CityContext';
import LocationBottomSheetProvider from './src/context/LocationBottomSheetProvider';

const Stack = createStackNavigator();
const gestureRootStyle = { flex: 1 };

export default function App() {
  return (
    <GestureHandlerRootView style={gestureRootStyle}>
      <SafeAreaProvider>
        <CityProvider>
          <LocationBottomSheetProvider>
            <PortalProvider>
              <BottomSheetModalProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </BottomSheetModalProvider>
            </PortalProvider>
          </LocationBottomSheetProvider>
        </CityProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
