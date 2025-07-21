import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  title?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function ProductNotFoundBlock({
  title = 'Товар не найден',
  buttonText = 'Назад',
  onPress,
}: Props) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
      <Text style={{ fontFamily: 'Inter18Bold', fontSize: 18 }}>{title}</Text>
      <TouchableOpacity style={{ marginTop: 24 }} onPress={onPress}>
        <Text style={{ color: '#FF9900', fontSize: 16 }}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
