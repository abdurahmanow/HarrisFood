import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  View,
  type ListRenderItem,
  type ListRenderItemInfo,
  type FlatList as RNFlatListType,
  type FlatListProps as RNFlatListProps,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type AnimatedRef,
} from 'react-native-reanimated';
import {
  FlatList as GHFlatList,
  type NativeViewGestureHandlerProps,
} from 'react-native-gesture-handler';

import {
  styles,
  ITEM_HEIGHT,
  SELECTION_PADDING,
  VISIBLE_COUNT,
} from '../../styles/Order/TimeWheelStyles/InlineTimeWheel.styles.ios';

type MinuteStep = 1 | 5 | 10 | 15;

type Props = {
  hour?: number;
  minute?: number;
  minuteStep?: MinuteStep;
  minDate?: Date;
  onChange?: (h: number, m: number) => void;          // превью
  onDayOffsetChange?: (dayOffset: 0 | 1) => void;     // только на коммите
  simultaneousHandlers?: NativeViewGestureHandlerProps['simultaneousHandlers'];
};

const ACCENT = '#FF9900';
const DISABLED = '#C4C4C4';

type ScrollableListRef = RNFlatListType<number> | null;

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const clampIdx = (i: number, len: number) =>
  len <= 0 ? 0 : Math.max(0, Math.min(i, len - 1));

function ceilDateToMinuteStep(d0: Date, step: MinuteStep) {
  const d = new Date(d0);
  d.setSeconds(0, 0);
  const rem = d.getMinutes() % step;
  if (rem !== 0) {d.setMinutes(d.getMinutes() + (step - rem));}
  return d;
}

const DEADZONE = 0.35;
const EPS_PX = 0.5;
const HOURS_LEN = 48;

/** Типобезопасная анимированная GH FlatList<number> */
type GHFlatListNumProps = RNFlatListProps<number> & NativeViewGestureHandlerProps;
const GHFlatListTyped = React.forwardRef<RNFlatListType<number>, GHFlatListNumProps>(
  (props, ref) => <GHFlatList {...props} ref={ref as any} />
);
GHFlatListTyped.displayName = 'GHFlatListTyped';
const AnimatedGHFlatList = Animated.createAnimatedComponent(GHFlatListTyped);

/* === Элементы === */

const HourItem = memo(function HourItem({
  index,
  value,
  hoursOffset,
  disabled,
}: {
  index: number;
  value: number;
  hoursOffset: Animated.SharedValue<number>;
  disabled: boolean;
}) {
  const cont = useAnimatedStyle(() => {
    const center = hoursOffset.value + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const itemCenter = index * ITEM_HEIGHT + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const t = Math.abs(itemCenter - center) / ITEM_HEIGHT;
    const baseOpacity = interpolate(t, [0, 1, 2], [1, 0.6, 0.3], Extrapolation.CLAMP);
    const scale = interpolate(t, [0, 0.5, 1, 2], [1.08, 1.04, 1, 0.96], Extrapolation.CLAMP);
    return { transform: [{ scale }], opacity: disabled ? baseOpacity * 0.45 : baseOpacity };
  }, [index, disabled]);

  const txt = useAnimatedStyle(() => {
    const center = hoursOffset.value + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const itemCenter = index * ITEM_HEIGHT + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const t = Math.abs(itemCenter - center) / ITEM_HEIGHT;
    const activeCol = interpolateColor(t, [0, 1.2], [ACCENT, '#000']);
    return { color: disabled ? DISABLED : (activeCol as any) };
  }, [index, disabled]);

  return (
    <Animated.View style={[styles.item, cont]}>
      <Animated.Text style={[styles.itemText, txt]}>{pad2(value)}</Animated.Text>
    </Animated.View>
  );
});

const MinuteItem = memo(function MinuteItem({
  index,
  value,
  minutesOffset,
  stableHourIdx,
  startHour,
  startMin,
}: {
  index: number;
  value: number;
  minutesOffset: Animated.SharedValue<number>;
  stableHourIdx: Animated.SharedValue<number>; // 0..47
  startHour: number;
  startMin: number;
}) {
  const both = useAnimatedStyle(() => {
    const dayOffset = stableHourIdx.value >= 24 ? 1 : 0;
    const hVal = ((stableHourIdx.value % 24) + 24) % 24;

    const disabled =
      dayOffset === 0 &&
      (hVal < startHour || (hVal === startHour && value < startMin));

    const center = minutesOffset.value + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const itemCenter = index * ITEM_HEIGHT + SELECTION_PADDING + ITEM_HEIGHT / 2;
    const t = Math.abs(itemCenter - center) / ITEM_HEIGHT;

    const opacity =
      (disabled ? 0.45 : 1) *
      interpolate(t, [0, 1, 2], [1, 0.6, 0.3], Extrapolation.CLAMP);
    const scale = interpolate(t, [0, 0.5, 1, 2], [1.08, 1.04, 1, 0.96], Extrapolation.CLAMP);
    const color = disabled ? DISABLED : (interpolateColor(t, [0, 1.2], [ACCENT, '#000']) as any);

    return { opacity, transform: [{ scale }], color } as any;
  }, [index, startHour, startMin]);

  return (
    <Animated.View style={[styles.item, { opacity: (both as any).opacity, transform: (both as any).transform }]}>
      <Animated.Text style={[styles.itemText, { color: (both as any).color }]}>{pad2(value)}</Animated.Text>
    </Animated.View>
  );
});

/* === Компонент === */

export default memo(function InlineTimeWheelIOS({
  hour,
  minute,
  minuteStep = 5,
  minDate,
  onChange,
  onDayOffsetChange,
  simultaneousHandlers,
}: Props) {
  const startHourProp = useRef(hour);
  const startMinuteProp = useRef(minute);

  const minutesBase = useMemo(
    () => Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep),
    [minuteStep],
  );
  const hoursBase24 = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const hoursData = useMemo(() => [...hoursBase24, ...hoursBase24], [hoursBase24]);
  const minutesData = minutesBase;

  const start = useMemo(
    () => ceilDateToMinuteStep(minDate ?? new Date(), minuteStep),
    [minDate, minuteStep],
  );
  const startHourMin = start.getHours();
  const startMinMin = start.getMinutes();

  const initialSelection = useMemo(() => {
    const desiredH = typeof startHourProp.current === 'number' ? startHourProp.current! : startHourMin;
    const desiredMRaw = typeof startMinuteProp.current === 'number' ? startMinuteProp.current! : startMinMin;
    const desiredM = Math.min(59, Math.round(desiredMRaw / minuteStep) * minuteStep);

    let h = desiredH;
    let m = desiredM;

    const earlierToday = h < startHourMin || (h === startHourMin && desiredM < startMinMin);
    if (earlierToday) {
      h = startHourMin;
      m = startMinMin;
    }

    const hIndex = 0 * 24 + h;
    const mIndex = minutesBase.indexOf(Math.min(59, Math.round(m / minuteStep) * minuteStep));

    return {
      hIndex: clampIdx(hIndex, hoursData.length),
      mIndex: clampIdx(mIndex === -1 ? 0 : mIndex, minutesData.length),
    };
  }, [minuteStep, minutesBase, hoursData.length, minutesData.length, startHourMin, startMinMin]);

  const hoursRef = useRef<ScrollableListRef>(null);
  const minutesRef = useRef<ScrollableListRef>(null);
  const hoursOffset = useSharedValue(0);
  const minutesOffset = useSharedValue(0);
  const stableHourIdx = useSharedValue(initialSelection.hIndex);

  const isSnapping = useRef(false);

  // последние оффсеты + settle-таймер
  const lastHoursY = useRef(initialSelection.hIndex * ITEM_HEIGHT);
  const lastMinutesY = useRef(initialSelection.mIndex * ITEM_HEIGHT);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setLastY = useCallback((kind: 'h' | 'm', y: number) => {
    if (kind === 'h') {lastHoursY.current = y;}
    else {lastMinutesY.current = y;}
  }, []);

  const clearSettle = useCallback(() => {
    if (settleTimer.current) {
      clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
  }, []);

  const getNearestHourIndex = useCallback(
    (y: number) => clampIdx(Math.round(y / ITEM_HEIGHT), hoursData.length),
    [hoursData.length],
  );
  const getNearestMinuteIndex = useCallback(
    (y: number) => clampIdx(Math.round(y / ITEM_HEIGHT), minutesData.length),
    [minutesData.length],
  );

  // зафиксированный день (для подписи под «:»)
  const committedDay = useSharedValue<0 | 1>(initialSelection.hIndex >= 24 ? 1 : 0);

  /** НОРМАЛИЗАЦИЯ + КОММИТ */
  const normalizeAndCommit = useCallback(
    (rawHourIdx: number, rawMinIdx: number) => {
      if (isSnapping.current) {return;}
      isSnapping.current = true;
      clearSettle();

      let hIdx = clampIdx(rawHourIdx, hoursData.length);
      let mIdx = clampIdx(rawMinIdx, minutesData.length);

      let dayOffset: 0 | 1 = hIdx >= 24 ? 1 : 0;
      let hVal = hIdx % 24;
      let mVal = minutesBase[mIdx];

      // ограничения только для «сегодня»
      if (dayOffset === 0) {
        if (hVal < startHourMin) {
          hVal = startHourMin;
          mVal = Math.max(startMinMin, mVal);
        } else if (hVal === startHourMin && mVal < startMinMin) {
          mVal = startMinMin;
        }
      }

      // пересобираем индексы
      hIdx = (dayOffset === 1 ? 24 : 0) + hVal;
      mIdx = minutesBase.indexOf(Math.min(59, Math.round(mVal / minuteStep) * minuteStep));
      if (mIdx < 0) {mIdx = 0;}

      const targetHOff = hIdx * ITEM_HEIGHT;
      const targetMOff = mIdx * ITEM_HEIGHT;

      const needH = Math.abs(targetHOff - lastHoursY.current) > EPS_PX;
      const needM = Math.abs(targetMOff - lastMinutesY.current) > EPS_PX;

      if (needH) {
        hoursRef.current?.scrollToOffset?.({ offset: targetHOff, animated: true });
      }
      if (needM) {
        minutesRef.current?.scrollToOffset?.({ offset: targetMOff, animated: true });
      }

      // синхронизация локальных значений
      lastHoursY.current = targetHOff;
      lastMinutesY.current = targetMOff;
      hoursOffset.value = targetHOff;
      minutesOffset.value = targetMOff;
      stableHourIdx.value = hIdx;

      onChange?.(hVal, mVal);
      onDayOffsetChange?.(dayOffset);
      committedDay.value = dayOffset;

      setTimeout(() => { isSnapping.current = false; }, 180);
    },
    [
      hoursData.length,
      minutesData.length,
      minutesBase,
      minuteStep,
      startHourMin,
      startMinMin,
      onChange,
      onDayOffsetChange,
      hoursOffset,
      minutesOffset,
      stableHourIdx,
      clearSettle,
      committedDay, // ← добавлено: устраняет предупреждение eslint
    ],
  );

  /** Планировщик «устаканивания» */
  const scheduleSettleCommit = useCallback(() => {
    if (isSnapping.current) {return;}
    clearSettle();
    settleTimer.current = setTimeout(() => {
      const hi = getNearestHourIndex(lastHoursY.current);
      const mi = getNearestMinuteIndex(lastMinutesY.current);
      normalizeAndCommit(hi, mi);
    }, 120);
  }, [clearSettle, getNearestHourIndex, getNearestMinuteIndex, normalizeAndCommit]);

  useEffect(() => {
    const hOff = initialSelection.hIndex * ITEM_HEIGHT;
    const mOff = initialSelection.mIndex * ITEM_HEIGHT;
    requestAnimationFrame(() => {
      hoursRef.current?.scrollToOffset?.({ offset: hOff, animated: false });
      minutesRef.current?.scrollToOffset?.({ offset: mOff, animated: false });
      hoursOffset.value = hOff;
      minutesOffset.value = mOff;
      stableHourIdx.value = initialSelection.hIndex;
      lastHoursY.current = hOff;
      lastMinutesY.current = mOff;
      committedDay.value = initialSelection.hIndex >= 24 ? 1 : 0;
    });
  }, [initialSelection, hoursOffset, minutesOffset, stableHourIdx, committedDay]);

  // Превью времени (день не трогаем)
  const emitPreviewStable = useCallback(
    (stableHi: number, minutesY: number) => {
      const hi = clampIdx(stableHi, hoursData.length);
      const mi = getNearestMinuteIndex(minutesY);
      onChange?.(hi % 24, minutesBase[mi]);
    },
    [getNearestMinuteIndex, minutesBase, onChange, hoursData.length],
  );

  // === Worklet: часы ===
  const onHoursScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const y = e.contentOffset.y;
      hoursOffset.value = y;

      const raw = y / ITEM_HEIGHT;
      const nearest = Math.round(raw);
      let clamped = nearest;
      if (clamped < 0) {clamped = 0;}
      else if (clamped >= HOURS_LEN) {clamped = HOURS_LEN - 1;}

      const delta = Math.abs(raw - clamped);
      if (Math.abs(stableHourIdx.value - clamped) > 0 || delta >= DEADZONE) {
        stableHourIdx.value = clamped;
      }

      runOnJS(emitPreviewStable)(stableHourIdx.value, minutesOffset.value);
      runOnJS(setLastY)('h', y);
      runOnJS(scheduleSettleCommit)();
    },
  });

  // === Worklet: минуты ===
  const onMinutesScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const y = e.contentOffset.y;
      minutesOffset.value = y;
      runOnJS(emitPreviewStable)(stableHourIdx.value, y);
      runOnJS(setLastY)('m', y);
      runOnJS(scheduleSettleCommit)();
    },
  });

  /* Подпись «Сегодня/Завтра» под ":" — по ЗАКОММИЧЕННОМУ дню */
  const todayStyle = useAnimatedStyle(() => ({ opacity: committedDay.value === 0 ? 1 : 0.35 }));
  const tomorrowStyle = useAnimatedStyle(() => ({ opacity: committedDay.value === 1 ? 1 : 0.35 }));

  const renderHour: ListRenderItem<number> = useCallback(
    ({ item, index }: ListRenderItemInfo<number>) => {
      const disabled = index < 24 && item < startHourMin;
      return <HourItem index={index} value={item} hoursOffset={hoursOffset} disabled={disabled} />;
    },
    [hoursOffset, startHourMin],
  );

  const renderMinute: ListRenderItem<number> = useCallback(
    ({ item, index }: ListRenderItemInfo<number>) => (
      <MinuteItem
        index={index}
        value={item}
        minutesOffset={minutesOffset}
        stableHourIdx={stableHourIdx}
        startHour={startHourMin}
        startMin={startMinMin}
      />
    ),
    [minutesOffset, stableHourIdx, startHourMin, startMinMin],
  );

  const INITIAL_RENDER = VISIBLE_COUNT * 3;

  return (
    <View style={styles.wrapper}>
      <View pointerEvents="none" style={styles.fadeTop} />
      <View pointerEvents="none" style={styles.fadeBottom} />
      <View pointerEvents="none" style={styles.selectionBox} />
      <View pointerEvents="none" style={styles.colonOverlay}>
        <Animated.Text style={styles.colonText}>:</Animated.Text>
      </View>

      {/* подпись под «:» */}
      <View pointerEvents="none" style={styles.dayUnderColonBox}>
        <Animated.Text style={[styles.dayUnderColonText, todayStyle]}>Сегодня</Animated.Text>
        <Animated.Text style={[styles.dayUnderColonText, tomorrowStyle, { marginLeft: 8 }]}>
          Завтра
        </Animated.Text>
      </View>

      <View style={styles.container}>
        <AnimatedGHFlatList
          ref={hoursRef as unknown as AnimatedRef<any>}
          data={hoursData}
          keyExtractor={(it, i) => `h-${it}-${i}`}
          renderItem={renderHour}
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          onScroll={onHoursScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
          contentContainerStyle={{ paddingTop: SELECTION_PADDING, paddingBottom: SELECTION_PADDING }}
          initialScrollIndex={initialSelection.hIndex}
          onScrollToIndexFailed={({ index }: { index: number }) => {
            const off = index * ITEM_HEIGHT;
            requestAnimationFrame(() =>
              hoursRef.current?.scrollToOffset?.({ offset: off, animated: false }),
            );
          }}
          initialNumToRender={INITIAL_RENDER}
          maxToRenderPerBatch={INITIAL_RENDER}
          windowSize={9}
          removeClippedSubviews
          style={styles.col}
          simultaneousHandlers={simultaneousHandlers}
        />

        <AnimatedGHFlatList
          ref={minutesRef as unknown as AnimatedRef<any>}
          data={minutesData}
          keyExtractor={(it, i) => `m-${it}-${i}`}
          renderItem={renderMinute}
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          onScroll={onMinutesScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
          contentContainerStyle={{ paddingTop: SELECTION_PADDING, paddingBottom: SELECTION_PADDING }}
          initialScrollIndex={initialSelection.mIndex}
          onScrollToIndexFailed={({ index }: { index: number }) => {
            const off = index * ITEM_HEIGHT;
            requestAnimationFrame(() =>
              minutesRef.current?.scrollToOffset?.({ offset: off, animated: false }),
            );
          }}
          initialNumToRender={INITIAL_RENDER}
          maxToRenderPerBatch={INITIAL_RENDER}
          windowSize={9}
          removeClippedSubviews
          style={styles.col}
          simultaneousHandlers={simultaneousHandlers}
        />
      </View>
    </View>
  );
});
