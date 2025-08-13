import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { useCity } from '../../context/CityContext';
import { useCart } from '../../context/CartContext';
import { useSavedAddresses } from '../../context/SavedAddressesContext';

import MaskInput from 'react-native-mask-input';
import { sendOrder } from '../../utils/sendOrder';

import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import TimePickerBottomSheet, {
  TimePickerBottomSheetRef,
} from '../../components/TimePickerBottomSheet';
import LabeledField from '../../components/ui/LabeledField';

import TopToast, { TopToastHandle } from '../../components/ui/TopToast';

import { orderScreenStyles as s } from '../../styles/Order/orderScreenStyles';

/* ===== helpers ===== */

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const roundToStepUp = (min: number, step: 1 | 5 | 10 | 15) =>
  Math.ceil(min / step) * step;

/** минимум: now + 30 мин */
const computeMinTime = (step: 1 | 5 | 10 | 15) => {
  const now = new Date();
  const plus = new Date(now.getTime() + 30 * 60 * 1000);
  let h = plus.getHours();
  let m = roundToStepUp(plus.getMinutes(), step);
  if (m >= 60) {
    m = 0;
    h = Math.min(23, h + 1);
  }
  return `${pad2(h)}:${pad2(m)}`;
};

const parseTime = (t: string): [number, number] => {
  const [hh = '00', mm = '00'] = (t || '').split(':');
  return [Number(hh), Number(mm)];
};

const isEarlier = (a: string, b: string) => {
  const [ah, am] = parseTime(a);
  const [bh, bm] = parseTime(b);
  if (ah !== bh) return ah < bh;
  return am < bm;
};

/** безопасный pick */
const pick = (obj: any, keys: string[], def = '') => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v);
  }
  return def;
};

/** Адрес для отображения */
function getAddressViewData(
  mode: 'delivery' | 'pickup',
  ctx: ReturnType<typeof useCity>,
  selectedAddress: any,
) {
  const isDelivery = mode === 'delivery';

  if (isDelivery) {
    const region =
      pick(selectedAddress, ['regionName', 'region']) ||
      pick(ctx.region, ['name']);

    const city =
      pick(selectedAddress, ['cityName', 'city']) ||
      pick(ctx.location, ['name']);

    const street =
      pick(selectedAddress, ['street', 'streetName']) ||
      ''; // если улица отдельно отсутствует — не показываем (ниже будет address строкой)

    const house =
      pick(selectedAddress, ['house', 'houseNumber', 'building']) || '';

    const streetHouse = [street, house].filter(Boolean).join(', ');
    const full = pick(selectedAddress, ['address']) || pick(ctx, ['address']);

    return {
      metaLine: ['Дост.', region].filter(Boolean).join(' | '),
      cityStreetLine:
        [city, streetHouse].filter(Boolean).join(', ') || [city, full].filter(Boolean).join(', '),
      hours: '',
    };
  }

  // pickup — из place
  const region = pick(ctx.place, ['region']);
  const city   = pick(ctx.place, ['city']);
  const street = pick(ctx.place, ['street']);
  const hours  = pick(ctx.place, ['work_time']);

  return {
    metaLine: ['Сам.', region].filter(Boolean).join(' | '),
    cityStreetLine: [city, street].filter(Boolean).join(', '),
    hours,
  };
}

/* ===== component ===== */

export default function OrderScreen() {
  const navigation = useNavigation();
  const cityCtx = useCity();
  const { mode, placeId } = cityCtx;
  const { selectedAddress } = useSavedAddresses();
  const { cartItems } = useCart();

  const minuteStep: 1 | 5 | 10 | 15 = 5;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // выбор времени
  const [time, setTime] = useState(''); // "HH:MM"
  const [asap, setAsap] = useState(false);
  const [dayOffsetLabel, setDayOffsetLabel] = useState<0 | 1>(0); // 0 — сегодня, 1 — завтра

  // прочее
  const [payment, setPayment] = useState<'card' | 'terminal' | null>(null);
  const [comment, setComment] = useState(''); // до 300 символов

  // UI фокусы
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const timeSheetRef = useRef<TimePickerBottomSheetRef>(null);
  const toastRef = useRef<TopToastHandle>(null);

  // стартовый минимум
  useEffect(() => {
    setTime(computeMinTime(minuteStep));
    setDayOffsetLabel(0);
  }, [minuteStep]);

  // авто-подтягивание минимума (только «сегодня» и не ASAP)
  useEffect(() => {
    const id = setInterval(() => {
      if (asap || dayOffsetLabel === 1) return;
      const minNow = computeMinTime(minuteStep);
      setTime(prev => (!prev || isEarlier(prev, minNow) ? minNow : prev));
    }, 15000);
    return () => clearInterval(id);
  }, [asap, minuteStep, dayOffsetLabel]);

  const isTimeValid = () => {
    if (asap) return true;
    if (!/^\d{2}:\d{2}$/.test(time)) return false;
    const [h, m] = time.split(':').map(Number);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const openTimePicker = () => {
    if (asap) return;
    timeSheetRef.current?.present();
  };

  // превью — только время
  const handleWheelPreview = (h: number, m: number) => {
    setTime(`${pad2(h)}:${pad2(m)}`);
    setAsap(false);
  };

  // коммит — время + день
  const handleTimeConfirm = (h: number, m: number, d?: 0 | 1) => {
    setTime(`${pad2(h)}:${pad2(m)}`);
    setAsap(false);
    if (typeof d === 'number') setDayOffsetLabel(d);
  };

  // суммы
  const subtotal = useMemo(
    () =>
      (cartItems || []).reduce((sum: number, it: any) => {
        const price = Number(it?.price ?? 0);
        const qty = Number(it?.qty ?? 1);
        return sum + price * qty;
      }, 0),
    [cartItems],
  );

  const deliveryFee = useMemo(() => {
    if (mode !== 'delivery') return 0;
    const price = Number(cityCtx.location?.price ?? 0);
    const freeFrom = Number(cityCtx.location?.free_from ?? 0);
    return subtotal >= freeFrom ? 0 : price;
  }, [mode, cityCtx.location, subtotal]);

  const total = subtotal + deliveryFee;
  const fmt = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;

  // если появятся отдельные поля улицы/дома — подставятся
  const getStreet = () =>
    pick(selectedAddress, ['street', 'streetName']) ||
    (mode === 'pickup' ? pick(cityCtx.place, ['street']) : '');

  const getHouse = () =>
    pick(selectedAddress, ['house', 'houseNumber', 'building']) || '';

  const handleSubmit = async () => {
    if (!name.trim() || !/^[А-Яа-яЁёІіЇїЄє\s'-]+$/.test(name)) {
      Alert.alert('Ошибка', 'Введите корректное имя (кириллица).');
      return;
    }
    if (phone.replace(/\D/g, '').length < 11) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона.');
      return;
    }
    if (!isTimeValid()) {
      Alert.alert('Ошибка', 'Введите корректное время в формате ЧЧ:ММ.');
      return;
    }
    if (!payment) {
      Alert.alert('Ошибка', 'Выберите способ оплаты.');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('Ошибка', 'Корзина пуста.');
      return;
    }

    if (mode === 'delivery') {
      const hasRegion = !!cityCtx.region?.name || !!selectedAddress?.regionName;
      const hasCity   = !!cityCtx.location?.name || !!selectedAddress?.cityName;
      const hasAnyAddress =
        !!selectedAddress?.address || !!cityCtx.address || !!getStreet();
      if (!hasRegion || !hasCity || !hasAnyAddress) {
        Alert.alert('Ошибка', 'Выберите регион, город и укажите адрес доставки.');
        return;
      }
    }
    if (mode === 'pickup' && !placeId) {
      Alert.alert('Ошибка', 'Выберите заведение для самовывоза.');
      return;
    }

    const [hh = '00', mm = '00'] = (time || '').split(':');
    const apiPayment: 'card' | 'cash' = payment === 'terminal' ? 'cash' : 'card';

    // Время: структурировано (asap / scheduled)
    const deliveryTime =
      asap
        ? { type: 'asap' as const }
        : { type: 'scheduled' as const, hhmm: `${hh}:${mm}`, dayOffset: dayOffsetLabel };

    // Адрес — важный момент: region = ID (для доставки)
    const addressPayload =
      mode === 'delivery'
        ? {
            region: cityCtx.regionId || selectedAddress?.regionId || undefined, // ID региона
            city:   selectedAddress?.cityName || cityCtx.location?.name || undefined,
            street: getStreet() || undefined,
            house:  getHouse() || undefined,
            full:   selectedAddress?.address || cityCtx.address || undefined,
          }
        : {
            region: cityCtx.place?.region || undefined,
            city:   cityCtx.place?.city || undefined,
            street: cityCtx.place?.street || undefined,
            placeId,
          };

    const orderData = {
      name: name.trim(),
      phone,
      payment: apiPayment,
      mode,
      deliveryTime,
      comment: comment.trim() || undefined,
      address: addressPayload,
      cart: cartItems.map(item => ({
        title: item.title,
        qty: item.qty,
        price: item.price,
        additions: item.additions || [],
      })),
      totals: { subtotal, delivery: deliveryFee, total },
    };

    // отправка
    const ok = await sendOrder(orderData as any);

    if (ok) {
      toastRef.current?.show('Заказ успешно отправлен', 'success');
      // опционально: очистить комментарий / переключить asap
      // setComment('');
      // setAsap(false);
    } else {
      // У нас нет кода ошибки из sendOrder (он логгируется внутри).
      // Если начнёшь возвращать { ok, status, message } — можно подставить код:
      // toastRef.current?.show(`Не удалось отправить заказ (код ${status})`, 'error');
      toastRef.current?.show('Не удалось отправить заказ', 'error');
    }
  };

  const [initHour, initMinute] = useMemo(() => {
    const [h = '12', m = '00'] = (time || '').split(':');
    return [Number(h), Number(m)] as [number, number];
  }, [time]);

  // адрес — отображение
  const { metaLine, cityStreetLine, hours } = getAddressViewData(
    mode as 'delivery' | 'pickup',
    cityCtx,
    selectedAddress,
  );

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={s.container}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <Header />
        <SectionHeader
          title="Оформление заказа"
          rightText="Назад"
          onPressRight={() => navigation.goBack()}
        />

        {/* Тост — правый верхний угол, над контентом */}
        <TopToast ref={toastRef} topOffset={12} />

        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          {/* Имя */}
          <LabeledField label="Имя" required highlighted={nameFocused} style={s.block}>
            <TextInput
              value={name}
              onChangeText={text =>
                setName(text.replace(/[^А-Яа-яЁёІіЇїЄє\s'-]/g, '').slice(0, 25))
              }
              placeholder="Введите имя"
              placeholderTextColor="#9E9E9E"
              style={s.input}
              maxLength={25}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />
          </LabeledField>

          {/* Телефон */}
          <LabeledField label="Телефон" required highlighted={phoneFocused} style={s.block}>
            <MaskInput
              value={phone}
              onChangeText={setPhone}
              mask={[
                '+','7',' ','(', /\d/, /\d/, /\d/, ')',' ',
                /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,
              ]}
              keyboardType="phone-pad"
              style={s.input}
              placeholder="+7 (___) ___-__-__"
              placeholderTextColor="#808080"
              selectionColor="#FFA52F"
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
            />
          </LabeledField>

          {/* Адрес — чистый блок (без рамок/фонов) */}
          <LabeledField label="Адрес" required={mode === 'delivery'} compact style={s.block}>
            <View style={s.addressCard} pointerEvents="none">
              {!!metaLine && <Text style={s.addressMeta} numberOfLines={1}>{metaLine}</Text>}
              <Text style={s.addressCityStreet} numberOfLines={1}>
                {cityStreetLine || 'Выберите адрес'}
              </Text>
              {!!hours && (
                <Text style={s.addressHours} numberOfLines={1}>
                  Время работы: {hours}
                </Text>
              )}
            </View>
          </LabeledField>

          {/* К какому часу? */}
          <LabeledField label="К какому часу?" required compact style={s.block}>
            <View style={s.segmentRow}>
              <Pressable
                onPress={openTimePicker}
                disabled={asap}
                style={[s.segmentItem, s.segmentItemTime, asap && s.segmentItemDisabled]}
              >
                <View style={{ alignItems: 'center' }}>
                  {asap ? (
                    <Text style={[s.segmentText, s.segmentTextActive]}>
                      По готовности
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Inter18Bold',
                          color: dayOffsetLabel === 1 ? '#FF9900' : '#6B6B6B',
                          marginBottom: 2,
                        }}
                      >
                        {dayOffsetLabel === 1 ? 'Завтра' : 'Сегодня'}
                      </Text>
                      <Text style={[s.segmentText]}>
                        {time || '--:--'}
                      </Text>
                    </>
                  )}
                </View>
              </Pressable>

              <View style={s.segmentDivider} />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setAsap(prev => !prev)}
                style={[s.segmentItem, s.segmentItemAsap]}
              >
                <Text style={[s.segmentText, asap && s.segmentTextActive]}>
                  По готовности
                </Text>
              </TouchableOpacity>
            </View>
          </LabeledField>

          {/* Способ оплаты */}
          <LabeledField label="Способ оплаты" required compact style={s.block}>
            <View style={s.segmentRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setPayment('card')}
                style={s.segmentItem}
              >
                <Text style={[s.segmentText, payment === 'card' && s.segmentTextActive]}>
                  Карта
                </Text>
              </TouchableOpacity>

              <View style={s.segmentDivider} />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setPayment('terminal')}
                style={s.segmentItem}
              >
                <Text style={[s.segmentText, payment === 'terminal' && s.segmentTextActive]}>
                  Терминал
                </Text>
              </TouchableOpacity>
            </View>
          </LabeledField>

          {/* Комментарий к заказу (до 300 символов) */}
          <LabeledField label="Комментарий к заказу" compact style={s.block}>
            <View>
              <TextInput
                value={comment}
                onChangeText={setComment}
                maxLength={300}
                multiline
                numberOfLines={4}
                placeholder="Например: позвонить за 5 минут…"
                placeholderTextColor="#9E9E9E"
                style={[s.input, { minHeight: 84, textAlignVertical: 'top' }]}
              />
              <Text style={{ alignSelf: 'flex-end', color: '#9E9E9E', fontSize: 12, marginTop: 4 }}>
                {comment.length}/300
              </Text>
            </View>
          </LabeledField>

          {/* Итоги заказа */}
          <LabeledField label="Итоги" compact style={s.block}>
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Inter18Regular' }}>
                  Сумма заказа
                </Text>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Inter18Bold' }}>
                  {fmt(subtotal)}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Inter18Regular' }}>
                  Доставка
                </Text>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Inter18Bold' }}>
                  {mode === 'delivery' ? (deliveryFee === 0 ? 'бесплатно' : fmt(deliveryFee)) : '—'}
                </Text>
              </View>

              <View style={{ height: 1, backgroundColor: '#E6E6E6', marginVertical: 6 }} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Inter18Bold' }}>
                  Итого
                </Text>
                <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Inter18Bold' }}>
                  {fmt(total)}
                </Text>
              </View>
            </View>
          </LabeledField>

          {/* Отправить */}
          <TouchableOpacity style={s.submitButton} onPress={handleSubmit} activeOpacity={0.95}>
            <Text style={s.submitText}>Отправить</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* модалка времени */}
        <TimePickerBottomSheet
          ref={timeSheetRef}
          initialHour={initHour}
          initialMinute={initMinute}
          minuteStep={minuteStep}
          onChange={handleWheelPreview}
          onConfirm={handleTimeConfirm}
        />
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
}
