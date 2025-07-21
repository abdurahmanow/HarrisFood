import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header onLocationPress={() => {}} />
      <View style={styles.content}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.title}>Профиль</Text>
        <Text style={styles.subtitle}>Тут скоро появится ваш личный кабинет.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 54, marginBottom: 12 },
  title: {
    fontFamily: 'Inter24Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    color: '#A9A9A9',
    textAlign: 'center',
    marginHorizontal: 24,
  },
});
