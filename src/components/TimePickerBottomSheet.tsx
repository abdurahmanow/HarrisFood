import React, {
  forwardRef,
  useMemo,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import InlineTimeWheel from './TimeWheel/InlineTimeWheel';
import { styles, HANDLE_ESTIMATE } from '../styles/Order/TimePickerBottomSheet.styles';

type MinuteStep = 1 | 5 | 10 | 15;

type Props = {
  initialHour?: number;
  initialMinute?: number;
  minuteStep?: MinuteStep;
  /** Превью прокрутки — (h, m). День приходит отдельным колбэком при коммите. */
  onChange?: (h: number, m: number) => void;
  /** Финальный выбор — (h, m, dayOffset) */
  onConfirm?: (h: number, m: number, dayOffset: 0 | 1) => void;
};

export type TimePickerBottomSheetRef = {
  present: () => void;
  close: () => void;
};

const ceilToStep = (min: number, step: MinuteStep) => {
  const r = Math.ceil(min / step) * step;
  if (r >= 60) {return { hourCarry: 1, minute: 0 };}
  return { hourCarry: 0, minute: r };
};

const TimePickerBottomSheet = forwardRef<TimePickerBottomSheetRef, Props>(
  function TimePicker({ initialHour, initialMinute, minuteStep = 5, onChange, onConfirm }, ref) {
    const sheetRef = useRef<BottomSheetModal>(null);

    const computeMinDate = useCallback(() => {
      const now = new Date();
      const plus = new Date(now.getTime() + 30 * 60 * 1000);
      const { hourCarry, minute } = ceilToStep(plus.getMinutes(), minuteStep);
      plus.setMinutes(minute);
      plus.setHours(plus.getHours() + hourCarry);
      plus.setSeconds(0, 0);
      return plus;
    }, [minuteStep]);

    const [wheelMinDate, setWheelMinDate] = useState<Date>(() => computeMinDate());
    const [hintMinDate, setHintMinDate] = useState<Date>(() => computeMinDate());

    const [h, setH] = useState<number>(initialHour ?? wheelMinDate.getHours());
    const [m, setM] = useState<number>(initialMinute ?? wheelMinDate.getMinutes());
    const [dayOffset, setDayOffset] = useState<0 | 1>(0);

    useEffect(() => {
      const base = computeMinDate();
      let hh = initialHour ?? base.getHours();
      let mm = initialMinute ?? base.getMinutes();
      const tooEarly = hh < base.getHours() || (hh === base.getHours() && mm < base.getMinutes());
      if (tooEarly) {
        hh = base.getHours();
        mm = base.getMinutes();
      }
      setH(hh);
      setM(mm);
      setDayOffset(0);
    }, [initialHour, initialMinute, computeMinDate]);

    useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.present(),
      close: () => sheetRef.current?.close(),
    }));

    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const onContentLayout = (e: LayoutChangeEvent) => {
      const hgt = Math.ceil(e.nativeEvent.layout.height + HANDLE_ESTIMATE);
      if (!contentHeight || Math.abs(contentHeight - hgt) > 1) {setContentHeight(hgt);}
    };
    const snapPoints = useMemo(() => [contentHeight ?? 360], [contentHeight]);

    // === тикер подсказки ===
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTicker = useCallback(() => {
      if (intervalRef.current) {return;}
      intervalRef.current = setInterval(() => {
        setHintMinDate(prev => {
          const next = computeMinDate();
          if (next.getHours() !== prev.getHours() || next.getMinutes() !== prev.getMinutes()) {
            return next;
          }
          return prev;
        });
      }, 15000);
    }, [computeMinDate]);

    const stopTicker = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    const handleSheetChange = useCallback(
      (index: number) => {
        const open = index >= 0;
        if (open) {
          const nowMin = computeMinDate();
          setWheelMinDate(nowMin);
          setHintMinDate(nowMin);

          const nH = nowMin.getHours();
          const nM = nowMin.getMinutes();
          if (dayOffset === 0 && (h < nH || (h === nH && m < nM))) {
            setH(nH);
            setM(nM);
            onChange?.(nH, nM);
          }
          startTicker();
        } else {
          stopTicker();
        }
      },
      [computeMinDate, dayOffset, h, m, onChange, startTicker, stopTicker],
    );

    useEffect(() => () => stopTicker(), [stopTicker]);

    // превью из колеса
    const handleWheelChange = useCallback(
      (hh: number, mm: number) => {
        setH(hh);
        setM(mm);
        onChange?.(hh, mm);
      },
      [onChange],
    );

    // dayOffset приходит только при коммите в колесе
    const handleDayOffsetChange = useCallback((d: 0 | 1) => {
      setDayOffset(d);
    }, []);

    const handleConfirm = useCallback(() => {
      onConfirm?.(h, m, dayOffset);
      sheetRef.current?.close();
    }, [h, m, dayOffset, onConfirm]);

    const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const minHStr = pad2(hintMinDate.getHours());
    const minMStr = pad2(hintMinDate.getMinutes());

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.sheetBackground}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.content} onLayout={onContentLayout}>
          <View style={styles.header}>
            <Text style={styles.title}>Выберите время</Text>
            <TouchableOpacity style={styles.doneBtn} onPress={handleConfirm} activeOpacity={0.9}>
              <Text style={styles.doneText}>Выбрать</Text>
            </TouchableOpacity>
          </View>

          <InlineTimeWheel
            hour={h}
            minute={m}
            minuteStep={minuteStep}
            minDate={wheelMinDate}
            onChange={handleWheelChange}
            onDayOffsetChange={handleDayOffsetChange}
            {...(Platform.OS === 'android'
              ? ({ simultaneousHandlers: sheetRef } as const)
              : {})}
          />

          <View style={styles.footerRow}>
            <Text style={styles.hint}>Ближайшее время доставки: {minHStr}:{minMStr}</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default TimePickerBottomSheet;
