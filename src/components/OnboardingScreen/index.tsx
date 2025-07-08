import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles';
import BottomActionContainer from '../LocationModal/BottomActionContainer';

const { height } = Dimensions.get('window');
const getPhotoHeight = () => {
  if (height < 700) {return 300;}
  if (height < 780) {return 350;}
  return 406;
};
const PHOTO_HEIGHT = getPhotoHeight();

const slides = [
  {
    key: 'slide1',
    title: 'Только халяль еда',
    description: 'Всё мясо проходит нашу фирменную обжарку на мангале, что придаёт еде особый вкус',
    image: require('../../assets/img/onboarding1.png'),
  },
  {
    key: 'slide2',
    title: 'Доставка быстро и вовремя',
    description: 'Мы работаем без задержек и строго соблюдаем сроки приготовления и доставки ваших заказов.',
    image: require('../../assets/img/onboarding2.png'),
  },
  {
    key: 'slide3',
    title: 'Выгодные акции и бонусы',
    description: 'Постоянные скидки и специальные предложения для наших любимых клиентов!',
    image: require('../../assets/img/onboarding3.png'),
  },
];

export default function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < slides.length - 1) {setIndex(index + 1);}
    else {onFinish();}
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageWrap, { height: PHOTO_HEIGHT }]}>
        <Image
          source={slides[index].image}
          style={[styles.image, { height: PHOTO_HEIGHT }]}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.description}>{slides[index].description}</Text>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === index ? '#FFA52F' : '#FFE0B3' },
              ]}
            />
          ))}
        </View>
      </View>
      <BottomActionContainer>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {index < slides.length - 1 ? 'Далее' : 'Начать'}
            </Text>
          </TouchableOpacity>
          {index < slides.length - 1 && (
            <TouchableOpacity onPress={onFinish}>
              <Text style={styles.skip}>Пропустить</Text>
            </TouchableOpacity>
          )}
        </View>
      </BottomActionContainer>
    </View>
  );
}
