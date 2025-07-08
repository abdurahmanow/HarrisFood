import { StyleSheet } from 'react-native';

export const cityListStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  scrollContainer: {
  paddingBottom: 160, // чтобы поле ввода не прилипало к клавиатуре
},
  regionTitle: {
    fontFamily: 'Inter18Bold',
    fontSize: 18,
    color: '#1D1D21',
    marginBottom: 16,
    marginTop: 8,
  },
  flatListWrap: {
    maxHeight: 295, // ограничение по высоте для скролла
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 33,
    borderRadius: 7,
    backgroundColor: 'transparent',
  },
  itemMargin: {
    marginBottom: 11,
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
    paddingBottom: 0,
  },
  inputWrapper: {
    marginTop: 20,
  },
  inputLabel: {
    fontFamily: 'Inter18Regular',
    fontSize: 13,
    color: '#A9A9A9',
    marginBottom: 7,
    lineHeight: 15,
  },
  inputStar: {
    color: '#FF3B30',
    fontFamily: 'Inter18Bold',
    fontSize: 13,
  },
  input: {
    width: '100%',
    height: 46,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
    fontFamily: 'Inter18Regular',
  },
});
