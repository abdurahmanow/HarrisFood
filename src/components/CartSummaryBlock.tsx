import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeOutRight } from 'react-native-reanimated';
import styles from '../styles/Cart/CartSummaryStyles';

type Addition = {
  title: string;
  count: number;
  price: number;
};

type CartItem = {
  cartItemId: string;
  id: string;
  title: string;
  price: number;
  qty: number;
  size?: string;
  variant?: string;
  image?: any;
  additions?: Addition[];
};

type Props = {
  cartItems: CartItem[];
  deliveryPrice: number;
  onSubmit: () => void;
  onRemoveItem: (cartItemId: string) => void;
};

const CartSummaryBlock: React.FC<Props> = ({
  cartItems,
  deliveryPrice,
  onSubmit,
  onRemoveItem,
}) => {
  const getItemTotal = (item: CartItem): number => {
    const additionsTotal = item.additions?.reduce(
      (sum, a) => sum + a.price * a.count,
      0
    ) || 0;
    return (item.price + additionsTotal) * item.qty;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + getItemTotal(item),
    0
  );
  const total = subtotal + deliveryPrice;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cartItems.map((item) => (
        <Animated.View
          key={item.cartItemId}
          exiting={FadeOutRight.duration(300)}
        >
          <View style={styles.itemRow}>
            <Image
              source={item.image}
              style={styles.itemImage}
              resizeMode="cover"
            />

            <View style={styles.itemContent}>
              <View style={styles.titleRow}>
                <Text style={styles.itemTitle}>
                  {item.title}
                  <Text style={styles.itemQty}> × {item.qty}</Text>
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onRemoveItem(item.cartItemId)}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>

              {!!(item.size || item.additions?.length) && (
                <Text style={styles.itemDescription}>
                  {item.size ? `${item.size}` : ''}
                  {item.size && item.additions?.length ? ' • ' : ''}
                  {item.additions
                    ?.map((a) => `${a.title} × ${a.count}`)
                    .join(', ')}
                </Text>
              )}

              <View style={styles.bottomPriceRow}>
                <Text style={styles.itemPrice}>{getItemTotal(item)} ₽</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />
        </Animated.View>
      ))}

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Сумма заказа</Text>
        <Text style={styles.summaryValue}>{subtotal} ₽</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Доставка</Text>
        <Text style={styles.summaryValue}>{deliveryPrice} ₽</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Итого к оплате</Text>
        <Text style={styles.totalValue}>{total} ₽</Text>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={onSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>Оформить заказ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartSummaryBlock;
