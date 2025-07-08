import React, { useRef, useEffect } from 'react';
import { View, LayoutChangeEvent, StyleProp, ViewStyle, Text } from 'react-native';

const COLORS = [
  '#ff2222', // красный
  '#22aa22', // зеленый
  '#2266ff', // синий
  '#ffbb00', // оранжевый
  '#8b00ff', // фиолетовый
  '#00bbaa', // бирюза
  '#e67e22', // морковь
];

// Используй вложенность — чем глубже, тем другой цвет
function getColorByDepth(depth: number) {
  return COLORS[depth % COLORS.length];
}

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  label?: string;
  depth?: number;
  showStyle?: boolean;
  [key: string]: any;
};

export default function DebugViewPro({
  children,
  style,
  label = 'DebugView',
  depth = 0,
  showStyle = true,
  ...rest
}: Props) {
  const viewRef = useRef(null);

  useEffect(() => {
    if (style && typeof style === 'object') {
      const stylesArray = Array.isArray(style) ? style : [style];
      stylesArray.forEach((st, i) => {
        const st2 = st as any;
        if (st2?.flex === 1) console.warn(`[${label}] FLEX:1 найден в стиле #${i}!`);
        if (st2?.minHeight) console.warn(`[${label}] minHeight: ${st2.minHeight} найден!`);
        if (st2?.height) console.warn(`[${label}] height: ${st2.height} найден!`);
        if (st2?.maxHeight) console.warn(`[${label}] maxHeight: ${st2.maxHeight} найден!`);
        if (st2?.alignSelf === 'stretch') console.warn(`[${label}] alignSelf: stretch найден!`);
      });
    }
  }, [style, label]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { height, width, x, y } = e.nativeEvent.layout;
    console.warn(
      `[${label}] LAYOUT | h:${height} w:${width} x:${x} y:${y}` +
        (height > 650 ? ' [>650px]' : '')
    );
    if (rest.onLayout) rest.onLayout(e);
  };

  const color = getColorByDepth(depth);

  return (
    <View
      ref={viewRef}
      style={[
        style,
        {
          borderWidth: 2,
          borderColor: color,
          borderStyle: 'dashed',
          position: 'relative',
        },
      ]}
      onLayout={onLayout}
      {...rest}
    >
      <Text
        style={{
          position: 'absolute',
          top: 1,
          left: 4,
          fontSize: 10,
          color,
          backgroundColor: '#fff',
          zIndex: 999,
          paddingHorizontal: 3,
        }}
        pointerEvents="none"
      >
        {label}
      </Text>
      {showStyle && (
        <Text
          style={{
            position: 'absolute',
            top: 16,
            left: 4,
            fontSize: 9,
            color: '#222',
            backgroundColor: '#fff8',
            zIndex: 999,
            paddingHorizontal: 2,
          }}
          pointerEvents="none"
        >
          {JSON.stringify(style)}
        </Text>
      )}
      {
        // Чтобы цвета border'ов были разными на каждом уровне вложенности
        React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child as any, { depth: (depth || 0) + 1 })
            : child
        )
      }
    </View>
  );
}
