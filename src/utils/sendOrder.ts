import { Alert } from 'react-native';

/** Позиция корзины */
export type OrderCartItem = {
  title: string;
  qty: number;
  price: number;
  additions?: any[];
};

/** Время доставки/самовывоза */
export type DeliveryTime =
  | { type: 'asap' }                                  // «По готовности»
  | { type: 'scheduled'; hhmm: string; dayOffset: 0 | 1 }; // Конкретное время + 0=Сегодня / 1=Завтра

/** Адрес */
export type OrderAddress = {
  region?: string; // теперь сюда приходит ID региона, если доставка
  city?: string;
  street?: string;
  house?: string;
  /** Полный адрес (если не передан — соберём из полей выше) */
  full?: string;
  /** Для самовывоза — id точки */
  placeId?: string;
};

export type OrderData = {
  name: string;
  phone: string;
  payment: 'cash' | 'card';
  mode: 'delivery' | 'pickup';
  deliveryTime: DeliveryTime;
  comment?: string;
  address: OrderAddress;
  cart: OrderCartItem[];
  totals?: {
    subtotal: number;
    delivery: number;
    total: number;
  };
};

/* ===== helpers ===== */

function buildFullAddress(addr: OrderAddress): string | undefined {
  const regionCity = [addr.region, addr.city].filter(Boolean).join(', ');
  const streetHouse = [addr.street, addr.house].filter(Boolean).join(', ');
  const parts = [regionCity, streetHouse].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
}

/** Принимаем 'HHMM' или 'HH:MM' — нормализуем к 'HHMM' */
function normalizeHHMM(v: string): string {
  const raw = (v || '').trim();
  if (!raw) {return '';}
  const cleaned = raw.includes(':') ? raw.replace(':', '') : raw;
  return cleaned.padStart(4, '0').slice(0, 4);
}

/* ===== main ===== */

export async function sendOrder(orderData: OrderData) {
  // нормализуем full + hhmm у scheduled
  const normalized: OrderData = {
    ...orderData,
    address: {
      ...orderData.address,
      full: orderData.address.full ?? buildFullAddress(orderData.address),
    },
    deliveryTime:
      orderData.deliveryTime.type === 'scheduled'
        ? {
            type: 'scheduled',
            dayOffset: orderData.deliveryTime.dayOffset,
            hhmm: normalizeHHMM(orderData.deliveryTime.hhmm),
          }
        : { type: 'asap' },
  };

  const requestBody = JSON.stringify(normalized);

  try {
    const response = await fetch('https://cb591396a43b.ngrok-free.app/api/send-order/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.toLowerCase().includes('application/json');
    const responseData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      console.error('❌ Ошибка при отправке заказа:', response.status, response.statusText);
      console.error('📝 Ответ сервера:', responseData);
      console.error('📤 Отправленные данные:', requestBody);
      throw new Error(
        (isJson && (responseData as any)?.error) || `Server error: ${response.status}`
      );
    }

    //console.log('✅ Заказ успешно отправлен:', responseData);
    //Alert.alert('Успех', 'Заказ успешно отправлен!');
    return true;
  } catch (error: any) {
    console.error('❌ Исключение при отправке заказа:', error?.message || error);
    console.error('📤 Отправленные данные:', requestBody);
    Alert.alert('Ошибка', 'Не удалось отправить заказ');
    return false;
  }
}
