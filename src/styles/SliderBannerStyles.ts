import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  sliderWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFA500',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationInside: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    height: 3,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});
