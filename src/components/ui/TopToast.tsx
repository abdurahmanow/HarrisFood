import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';

export type TopToastType = 'success' | 'error' | 'info';

export type TopToastHandle = {
  show: (message: string, type?: TopToastType) => void;
  hide: () => void;
};

type Props = {
  /** Отступ сверху; подгони под высоту хедера при желании */
  topOffset?: number;
  /** Сколько держать уведомление, мс */
  duration?: number;
};

const DEFAULT_TOP_OFFSET =
  (Platform.select<number>({ ios: 8, android: 8, default: 8 }) as number) ?? 8;

const TopToast = forwardRef<TopToastHandle, Props>(function TopToast(
  { topOffset = DEFAULT_TOP_OFFSET, duration = 3000 },
  ref
) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string>('');
  const [type, setType] = useState<TopToastType>('success');

  const progress = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const colors: Record<TopToastType, string> = {
    success: '#22C55E',
    error: '#EF4444',
    info: '#111827',
  };

  const animateTo = useCallback(
    (to: number, cb?: () => void) => {
      Animated.timing(progress, {
        toValue: to,
        duration: to === 1 ? 220 : 180,
        easing: to === 1 ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {cb?.();}
      });
    },
    [progress]
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    clearTimer();
    animateTo(0, () => setVisible(false));
  }, [animateTo, clearTimer]);

  const show = useCallback(
    (message: string, t: TopToastType = 'success') => {
      clearTimer();
      setText(message);
      setType(t);
      setVisible(true);
      // Сброс позиции и показ
      progress.setValue(0);
      animateTo(1);
      // Авто-скрытие
      timerRef.current = setTimeout(() => hide(), duration);
    },
    [animateTo, clearTimer, duration, hide, progress]
  );

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  if (!visible) {return null;}

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-16, 0],
  });
  const opacity = progress;

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { top: topOffset }]}>
      <Animated.View
        style={[
          styles.toast,
          {
            backgroundColor: colors[type],
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.text} numberOfLines={3}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 12,
    zIndex: 1000,
  },
  toast: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter18Bold',
  },
});

export default TopToast;
