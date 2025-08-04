import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  imageWrap: {
    width: width,
    backgroundColor: '#333',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    fontFamily: 'Inter18Bold',
    fontSize: 19,
    fontWeight: '600',
    marginTop: 6,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter18Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    marginBottom: 30,
    width: 326,
    alignSelf: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#FFE0B3',
  },
  button: {

    height: 45,
    backgroundColor: '#FF9900',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    alignSelf: 'stretch', // чтобы занять всё доступное по горизонтали
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter18Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skip: {
    color: '#A8A8A8',
    fontFamily: 'Inter18Regular',
    fontSize: 16,
    marginTop: 8,
    alignSelf: 'center', // по центру!
  },
});
