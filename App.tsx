import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/Home/HomeScreen';
import { CityProvider } from './src/context/CityContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CityProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CityProvider>
    </SafeAreaProvider>
  );
}
