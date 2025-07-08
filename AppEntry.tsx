import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from './src/components/OnboardingScreen';
import MainApp from './App';

export default function AppEntry() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.full} edges={['top', 'bottom', 'left', 'right']}>
        <MainApp />
        {showOnboarding && (
          <SafeAreaView style={styles.overlay} edges={['top', 'bottom', 'left', 'right']}>
            <Onboarding onFinish={() => setShowOnboarding(false)} />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fff', // ← ОБЯЗАТЕЛЬНО!
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
});
