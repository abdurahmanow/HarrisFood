// components/AppLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  onLocationPress: () => void;
};

export default function AppLayout({ children, onLocationPress }: Props) {
  return (
    <View style={styles.container}>
      <Header onLocationPress={onLocationPress} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
});
