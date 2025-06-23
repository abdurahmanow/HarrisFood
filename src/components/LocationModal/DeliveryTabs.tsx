import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

type DeliveryTabsProps = {
  value: 'delivery' | 'pickup';
  onChange: (mode: 'delivery' | 'pickup') => void;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  tabActiveStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  tabTextActiveStyle?: StyleProp<TextStyle>;
};

export default function DeliveryTabs({
  value,
  onChange,
  style,
  tabStyle,
  tabTextStyle,
  tabTextActiveStyle,
}: DeliveryTabsProps) {
  // Общий прогресс для анимации: 0 = delivery, 1 = pickup
  const progress = useSharedValue(value === 'delivery' ? 0 : 1);

  useEffect(() => {
    progress.value = withTiming(value === 'pickup' ? 1 : 0, { duration: 220 });
  }, [progress, value]);

  // Анимация фона и текста для delivery
  const deliveryTabStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#FF9900', '#FAFAFA']
    ),
  }));
  const deliveryTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#fff', '#FFA52F']
    ),
  }));

  // Анимация фона и текста для pickup
  const pickupTabStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#FAFAFA', '#FF9900']
    ),
  }));
  const pickupTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#FFA52F', '#fff']
    ),
  }));

  return (
    <View style={style}>
      <Animated.View style={[tabStyle, deliveryTabStyle, { marginRight: 9 }]}>
        <TouchableOpacity
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => onChange('delivery')}
          activeOpacity={0.88}
        >
          <Animated.Text style={[tabTextStyle, deliveryTextStyle, value === 'delivery' && tabTextActiveStyle]}>
            Доставка
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[tabStyle, pickupTabStyle]}>
        <TouchableOpacity
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => onChange('pickup')}
          activeOpacity={0.88}
        >
          <Animated.Text style={[tabTextStyle, pickupTextStyle, value === 'pickup' && tabTextActiveStyle]}>
            Самовывоз
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
