import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    marginTop: 8,
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  deliveryContent: {
    minHeight: 80,
    borderRadius: 8,
    marginTop: 18,
  },
  pickupContent: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  // Стиль для paddingBottom внутри ScrollView
  scrollContentDelivery: {
    paddingBottom: 98, // 50 + 24 + 24 (кнопка, отступ, safeArea) — если хочешь динамику, вычисляй в компоненте!
  },
});
