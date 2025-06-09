import { StyleSheet } from 'react-native';

export const cityListStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  regionTitle: {
    fontFamily: 'Inter18Bold',
    fontSize: 18,
    color: '#1D1D21',
    marginBottom: 16,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 33,
    borderRadius: 7, // по макету чуть меньше чем 8, если хочешь ровно
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    // Не указываем здесь marginBottom!
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FF9900',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9900',
  },
  label: {
    fontFamily: 'Inter18Regular',
    fontSize: 16,
    color: '#1D1D21',
    lineHeight: 20,
    fontWeight: '400',
  },
  flatListContent: {
    paddingBottom: 0, // если нужно, можно добавить паддинг
  },
});
