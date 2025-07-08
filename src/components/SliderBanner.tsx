import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Animated,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { styles } from '../styles/SliderBannerStyles';

const screenWidth = Dimensions.get('window').width;
const SLIDE_WIDTH = screenWidth - 48;
const SLIDE_HEIGHT = 142;

type Slide = {
  id: string;
  image: any;
};

const slidesOriginal: Slide[] = [
  { id: '1', image: require('../assets/img/Banner.png') },
  { id: '2', image: require('../assets/img/Banner.png') },
  { id: '3', image: require('../assets/img/Banner.png') },
];

// Добавляем копию первого в конец для бесшовного цикла
const slides = [...slidesOriginal, slidesOriginal[0]];

export const SliderBanner = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      scrollViewRef.current?.scrollTo({
        x: nextIndex * SLIDE_WIDTH,
        animated: true,
      });

      if (nextIndex === slides.length - 1) {
        // Последний (дубликат 1-го)
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: 0,
            animated: false,
          });
        }, 400); // Подождать пока анимация закончится
        nextIndex = 0;
      }

      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
        setCurrentIndex(index >= slidesOriginal.length ? 0 : index);
      },
    }
  );

  const handlePress = () => {
    console.log('Слайд нажат:', slidesOriginal[currentIndex % slidesOriginal.length].id);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sliderWrapper, { width: SLIDE_WIDTH, height: SLIDE_HEIGHT }]}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {slides.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={handlePress}>
              <View style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>

        <View style={styles.paginationInside}>
          {slidesOriginal.map((_, index) => {
            const inputRange = [
              (index - 1) * SLIDE_WIDTH,
              index * SLIDE_WIDTH,
              (index + 1) * SLIDE_WIDTH,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { width: dotWidth, backgroundColor: currentIndex % slidesOriginal.length === index ? '#FF8100' : '#D9D9D9' },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};
