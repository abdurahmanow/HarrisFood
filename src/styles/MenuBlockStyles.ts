import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter28Bold',
    fontSize: 28,
    color: '#000',
  },
  viewAll: {
    fontFamily: 'Inter18Regular',
    fontSize: 18,
    color: '#FF8600',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  menuText: {
    marginTop: 12,
    fontFamily: 'Inter18Bold',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});
