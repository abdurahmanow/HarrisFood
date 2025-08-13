import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, type ListRenderItem, type ListRenderItemInfo } from 'react-native';
import { FlatList as GHFlatList } from 'react-native-gesture-handler';
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
  styles,
  ITEM_HEIGHT,
  SELECTION_PADDING,
  VISIBLE_COUNT,
} from '../../styles/Order/TimeWheelStyles/InlineTimeWheel.styles.android';

type MinuteStep = 1 | 5 | 10 | 15;
type Props = {
  hour?: number;   // старт
  minute?: number; // старт
  minuteStep?: MinuteStep;
  minDate?: Date;
  /** Превью прокрутки — (h, m), без dayOffset */
  onChange?: (h: number, m: number) => void;
  /** Явное уведомление о смене «Сегодня/Завтра» — ТОЛЬКО на коммите */
  onDayOffsetChange?: (dayOffset: 0 | 1) => void;
  simultaneousHandlers?: any;
};

const ACCENT = '#FF9900';
const DISABLED = '#C4C4C4';

const DEADZONE = 0.35; // гистерезис (доля высоты ячейки)
const EPS_PX = 0.5;    // порог ненужного докручивания

// GHFlatList + Reanimated
const AFlatList = Animated.createAnimatedComponent(
  GHFlatList as unknown as React.ComponentType<any>,
) as unknown as React.ComponentType<any>;

type ScrollableListRef = {
  scrollToOffset: (opts: { offset: number; animated?: boolean }) => void;
} | null;

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

/* ===== Элементы со «светотенью» ===== */

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
  /** стабильный индекс часа 0..47 (сегодня+завтра) */
  stableHourIdx: Animated.SharedValue<number>;
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
    <Animated.View
      style={[
        styles.item,
        { opacity: (both as any).opacity, transform: (both as any).transform },
      ]}>
      <Animated.Text style={[styles.itemText, { color: (both as any).color }]}>
        {pad2(value)}
      </Animated.Text>
    </Animated.View>
  );
});

/* ================= Компонент ================= */

export default memo(function InlineTimeWheelAndroid({
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
    const desiredH = typeof startHourProp.current === 'number'
      ? startHourProp.current!
      : startHourMin;
    const desiredMRaw = typeof startMinuteProp.current === 'number'
      ? startMinuteProp.current!
      : startMinMin;

    const desiredM = Math.min(59, Math.round(desiredMRaw / minuteStep) * minuteStep);

    let h = desiredH;
    let m = desiredM;

    const earlierToday = h < startHourMin || (h === startHourMin && desiredM < startMinMin);
    if (earlierToday) {
      h = startHourMin;
      m = startMinMin;
    }

    const hIndex = 0 * 24 + h; // «сегодня»
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
  const stableHourIdx = useSharedValue(initialSelection.hIndex); // 0..47

  const isSnapping = useRef(false);

  // ——— последние оффсеты + settle-таймер
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

  // ——— фиксируем «закоммиченный» день (для подписи под «:»)
  const committedDay = useSharedValue<0 | 1>(initialSelection.hIndex >= 24 ? 1 : 0);

  /** ——— НОРМАЛИЗАЦИЯ + КОММИТ ——— */
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

      // ограничение только для «сегодня»
      if (dayOffset === 0) {
        if (hVal < startHourMin) {
          hVal = startHourMin;
          mVal = Math.max(startMinMin, mVal);
        } else if (hVal === startHourMin && mVal < startMinMin) {
          mVal = startMinMin;
        }
      }

      // пересобрать индексы после нормализации
      hIdx = (dayOffset === 1 ? 24 : 0) + hVal;
      mIdx = minutesBase.indexOf(Math.min(59, Math.round(mVal / minuteStep) * minuteStep));
      if (mIdx < 0) {mIdx = 0;}

      const targetHOff = hIdx * ITEM_HEIGHT;
      const targetMOff = mIdx * ITEM_HEIGHT;

      const needH = Math.abs(targetHOff - lastHoursY.current) > EPS_PX;
      const needM = Math.abs(targetMOff - lastMinutesY.current) > EPS_PX;

      if (needH) {
        (hoursRef.current as any)?.scrollToOffset?.({ offset: targetHOff, animated: true });
      }
      if (needM) {
        (minutesRef.current as any)?.scrollToOffset?.({ offset: targetMOff, animated: true });
      }

      // синхронизация локальных значений
      lastHoursY.current = targetHOff;
      lastMinutesY.current = targetMOff;
      hoursOffset.value = targetHOff;
      minutesOffset.value = targetMOff;
      stableHourIdx.value = hIdx;

      // превью + смена дня (только тут)
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
      committedDay, // чтобы не ругался exhaustive-deps
    ],
  );

  /** ——— Планировщик «устаканивания» ——— */
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
      (hoursRef.current as any)?.scrollToOffset?.({ offset: hOff, animated: false });
      (minutesRef.current as any)?.scrollToOffset?.({ offset: mOff, animated: false });
      hoursOffset.value = hOff;
      minutesOffset.value = mOff;
      stableHourIdx.value = initialSelection.hIndex;
      lastHoursY.current = hOff;
      lastMinutesY.current = mOff;
      committedDay.value = initialSelection.hIndex >= 24 ? 1 : 0;
    });
  }, [initialSelection, hoursOffset, minutesOffset, stableHourIdx, committedDay]);

  /* === Превью времени (день не трогаем) === */
  const emitPreviewStable = useCallback(
    (stableHi: number, minutesY: number) => {
      const hi = clampIdx(stableHi, hoursData.length);
      const mi = getNearestMinuteIndex(minutesY);
      const hVal = hi % 24;
      const mVal = minutesBase[mi];
      onChange?.(hVal, mVal);
    },
    [getNearestMinuteIndex, minutesBase, onChange, hoursData.length],
  );

  /* === Worklet: часы === */
  const onHoursScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const y = e.contentOffset.y;
      hoursOffset.value = y;

      const raw = y / ITEM_HEIGHT;
      const nearest = Math.round(raw);

      // clamp 0..47
      let clamped = nearest;
      if (clamped < 0) {clamped = 0;}
      else if (clamped >= 48) {clamped = 47;}

      const delta = Math.abs(raw - clamped);
      if (Math.abs(stableHourIdx.value - clamped) > 0 || delta >= DEADZONE) {
        stableHourIdx.value = clamped;
      }

      runOnJS(emitPreviewStable)(stableHourIdx.value, minutesOffset.value);
      runOnJS(setLastY)('h', y);
      runOnJS(scheduleSettleCommit)();
    },
  });

  /* === Worklet: минуты === */
  const onMinutesScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const y = e.contentOffset.y;
      minutesOffset.value = y;
      runOnJS(emitPreviewStable)(stableHourIdx.value, y);
      runOnJS(setLastY)('m', y);
      runOnJS(scheduleSettleCommit)();
    },
  });

  /* —— Подпись «Сегодня/Завтра» под “:” на основании ЗАКОММИЧЕННОГО дня —— */
  const todayStyle = useAnimatedStyle(() => ({ opacity: committedDay.value === 0 ? 1 : 0.35 }));
  const tomorrowStyle = useAnimatedStyle(() => ({ opacity: committedDay.value === 1 ? 1 : 0.35 }));

  /* === Рендеры === */

  const renderHour: ListRenderItem<number> = useCallback(
    ({ item, index }: ListRenderItemInfo<number>) => {
      const disabled = index < 24 && item < startHourMin; // только для «сегодня»
      return (
        <HourItem
          index={index}
          value={item}
          hoursOffset={hoursOffset}
          disabled={disabled}
        />
      );
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

  const onScrollToIndexFailedHours = useCallback(() => {
    const off = initialSelection.hIndex * ITEM_HEIGHT;
    requestAnimationFrame(() =>
      (hoursRef.current as any)?.scrollToOffset?.({ offset: off, animated: false }),
    );
  }, [initialSelection.hIndex]);

  const onScrollToIndexFailedMinutes = useCallback(() => {
    const off = initialSelection.mIndex * ITEM_HEIGHT;
    requestAnimationFrame(() =>
      (minutesRef.current as any)?.scrollToOffset?.({ offset: off, animated: false }),
    );
  }, [initialSelection.mIndex]);

  return (
    <View style={styles.wrapper}>
      <View pointerEvents="none" style={styles.fadeTop} />
      <View pointerEvents="none" style={styles.fadeBottom} />
      <View pointerEvents="none" style={styles.selectionBox} />
      {/* для Android можно подсветить направляющие */}
      <View pointerEvents="none" style={styles.selectionTopLine} />
      <View pointerEvents="none" style={styles.selectionBottomLine} />
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
        <AFlatList
          ref={hoursRef as unknown as AnimatedRef<any>}
          data={hoursData}
          keyExtractor={(it: number, i: number) => `h-${it}-${i}`}
          renderItem={renderHour}
          disableIntervalMomentum
          decelerationRate={0.985}
          nestedScrollEnabled
          overScrollMode="never"
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          onScroll={onHoursScroll}
          scrollEventThrottle={16}
          getItemLayout={(_: unknown, i: number) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * i,
            index: i,
          })}
          contentContainerStyle={{
            paddingTop: SELECTION_PADDING,
            paddingBottom: SELECTION_PADDING,
          }}
          initialScrollIndex={initialSelection.hIndex}
          onScrollToIndexFailed={onScrollToIndexFailedHours}
          initialNumToRender={INITIAL_RENDER}
          maxToRenderPerBatch={INITIAL_RENDER}
          windowSize={9}
          removeClippedSubviews={false}
          style={styles.col}
          simultaneousHandlers={simultaneousHandlers}
        />

        <AFlatList
          ref={minutesRef as unknown as AnimatedRef<any>}
          data={minutesData}
          keyExtractor={(it: number, i: number) => `m-${it}-${i}`}
          renderItem={renderMinute}
          disableIntervalMomentum
          decelerationRate={0.985}
          nestedScrollEnabled
          overScrollMode="never"
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          onScroll={onMinutesScroll}
          scrollEventThrottle={16}
          getItemLayout={(_: unknown, i: number) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * i,
            index: i,
          })}
          contentContainerStyle={{
            paddingTop: SELECTION_PADDING,
            paddingBottom: SELECTION_PADDING,
          }}
          initialScrollIndex={initialSelection.mIndex}
          onScrollToIndexFailed={onScrollToIndexFailedMinutes}
          initialNumToRender={INITIAL_RENDER}
          maxToRenderPerBatch={INITIAL_RENDER}
          windowSize={9}
          removeClippedSubviews={false}
          style={styles.col}
          simultaneousHandlers={simultaneousHandlers}
        />
      </View>
    </View>
  );
});
