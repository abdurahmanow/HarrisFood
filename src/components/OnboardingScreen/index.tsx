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
    title: 'Добро пожаловать в Harris Food',
    description: 'Мы всегда на связи и готовим для вас 24/7. Просто закажите и наслаждайтесь вкусной едой тогда, когда хочется.',
    image: require('../../assets/img/onboarding4.png'),
  },
  {
    key: 'slide2',
    title: 'То, что вы любите',
    description: 'Суши, пицца, мангал, плов, десерты, напитки и многое другое. Еда, которая делает день вкуснее.',
    image: require('../../assets/img/onboarding2.png'),
  },
  {
    key: 'slide3',
    title: 'Доставка — быстро и удобно',
    description: 'Привезём быстро и вовремя — в любое время суток. Оформите заказ в пару нажатий и отдыхайте, остальное мы возьмём на себя.',
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
