import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCity } from '../../context/CityContext';
import { useCart } from '../../context/CartContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';
import MaskInput from 'react-native-mask-input';

export default function OrderScreen() {
  const { mode, location, placeId } = useCity();
  const { selectedAddress } = useSavedAddresses();
  const { cartItems } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [asap, setAsap] = useState(false);
  const [payment, setPayment] = useState<'cash' | 'card' | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !/^[А-Яа-яЁё\s]+$/.test(name)) {
      Alert.alert('Ошибка', 'Введите корректное имя (только кириллица)');
      return;
    }

    if (phone.replace(/\D/g, '').length !== 11) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона');
      return;
    }

    if (!asap && (time.length !== 4 || !/^\d{4}$/.test(time))) {
      Alert.alert('Ошибка', 'Введите корректное время в формате ЧЧММ');
      return;
    }

    if (!payment) {
      Alert.alert('Ошибка', 'Выберите способ оплаты');
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Ошибка', 'Корзина пуста');
      return;
    }

    if (mode === 'delivery') {
      if (!location || !selectedAddress) {
        Alert.alert('Ошибка', 'Выберите адрес доставки');
        return;
      }
    }

    if (mode === 'pickup') {
      if (!placeId) {
        Alert.alert('Ошибка', 'Выберите заведение для самовывоза');
        return;
      }
    }

    const orderData = {
      name,
      phone,
      time: asap ? 'asap' : time,
      payment,
      mode,
      address:
        mode === 'delivery'
          ? {
              city: selectedAddress?.cityName,
              region: selectedAddress?.regionName,
              full: selectedAddress?.address,
            }
          : {
              placeId,
            },
      cart: cartItems.map(item => ({
        title: item.title,
        qty: item.qty,
        price: item.price,
        additions: item.additions || [],
      })),
    };

    try {
      const response = await fetch('https://936c3206900c.ngrok-free.app/api/send-order/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {throw new Error('Server error');}

      console.log('Заказ отправлен:', JSON.stringify(orderData, null, 2));
      Alert.alert('Успех', 'Заказ успешно отправлен!');
    } catch (error) {
      console.error('Ошибка при отправке заказа:', JSON.stringify(orderData, null, 2));
      Alert.alert('Ошибка', 'Не удалось отправить заказ');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.label}>Имя</Text>
        <TextInput
          value={name}
          onChangeText={text => {
            const onlyLetters = text.replace(/[^А-Яа-яЁё\s]/g, '');
            setName(onlyLetters);
          }}
          placeholder="Введите имя"
          style={styles.input}
        />

        <Text style={styles.label}>Телефон</Text>
        <MaskInput
          value={phone}
          onChangeText={setPhone}
          mask={[
            '+',
            '7',
            ' ',
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
          ]}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>К какому часу?</Text>
        <TextInput
          value={time}
          onChangeText={text => {
            const filtered = text.replace(/[^0-9]/g, '').slice(0, 4);
            setTime(filtered);
          }}
          placeholder="Например 1830"
          keyboardType="numeric"
          style={styles.input}
          editable={!asap}
        />

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAsap(prev => !prev)}
        >
          <View style={[styles.checkbox, asap && styles.checked]} />
          <Text style={styles.checkboxLabel}>Как можно скорее</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Способ оплаты</Text>
        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              payment === 'cash' && styles.paymentSelected,
            ]}
            onPress={() => setPayment('cash')}
          >
            <Text style={styles.paymentText}>Наличные</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              payment === 'card' && styles.paymentSelected,
            ]}
            onPress={() => setPayment('card')}
          >
            <Text style={styles.paymentText}>Карта</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Отправить</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 24 },
  label: {
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    marginBottom: 16,
    color: '#000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFA52F',
    borderRadius: 4,
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#FFA52F',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    color: '#000',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  paymentOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  paymentSelected: {
    borderColor: '#FFA52F',
    backgroundColor: '#FFF2E5',
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#FFA52F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontFamily: 'Inter18Bold',
    color: '#fff',
  },
});
