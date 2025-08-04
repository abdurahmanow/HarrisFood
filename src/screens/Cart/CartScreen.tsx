import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import CartSummaryBlock from '../../components/CartSummaryBlock';
import { useCart } from '../../context/CartContext';
import { useCity } from '../../context/CityContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';
import { CartItem } from '../../types/cart';

const getItemTotal = (item: CartItem) => {
  const additionsTotal =
    item.additions?.reduce((sum, a) => sum + a.price * a.count, 0) || 0;
  return (item.price + additionsTotal) * item.qty;
};

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();
  const { mode, location, setLocationId } = useCity();
  const { selectedAddress } = useSavedAddresses();

  const isCartEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + getItemTotal(item),
    0
  );

  // 🔁 Синхронизация выбранного адреса с CityContext
  useEffect(() => {
    if (mode === 'delivery' && selectedAddress?.cityId) {
      setLocationId(selectedAddress.cityId);
    }
 }, [mode, selectedAddress?.cityId, setLocationId]);

  // 📦 Расчёт стоимости доставки
  let deliveryPrice = 0;
  if (mode === 'delivery' && location) {
    deliveryPrice =
      location.free_from > 0 && subtotal >= location.free_from
        ? 0
        : location.price;
  }

  const handleSubmitOrder = () => {
    console.log('Оформляем заказ...');
  };

  return (
    <View style={styles.container}>
      <Header />

      {isCartEmpty ? (
        <View style={styles.content}>
          <Text style={styles.emoji}>🛒</Text>
          <Text style={styles.title}>Корзина пуста</Text>
          <Text style={styles.subtitle}>
            Добавьте товары из меню, чтобы оформить заказ.
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SectionHeader
            title="Ваш заказ"
            subtitleDescription="Проверьте перед оформлением"
          />

          <CartSummaryBlock
            cartItems={cartItems}
            deliveryPrice={deliveryPrice}
            onSubmit={handleSubmitOrder}
            onRemoveItem={removeFromCart}
          />

          {mode === 'delivery' && location && (
            <View style={styles.deliveryNote}>
              <Text style={styles.deliveryNoteText}>
                Доставка в {location.name} —{' '}
                {deliveryPrice === 0 ? 'бесплатно' : `${location.price} ₽`}
                {location.free_from > 0 &&
                  ` (бесплатно от ${location.free_from} ₽)`}
              </Text>
            </View>
          )}

          {mode === 'pickup' && (
            <View style={styles.deliveryNote}>
              <Text style={styles.deliveryNoteText}>
                Самовывоз — бесплатно
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter24Bold',
    fontSize: 22,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#A9A9A9',
    textAlign: 'center',
    marginHorizontal: 24,
  },
  deliveryNote: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  deliveryNoteText: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#A9A9A9',
  },
});
