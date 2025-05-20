import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const columns = 4;
const gap = 16;
const totalGap = gap * (columns - 1);
const itemSize = (screenWidth - 48 - totalGap) / columns;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
    height: 19, // высота как по макету
  },
  title: {
    fontFamily: 'Inter28Bold',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    color: '#000',
  },
  viewAll: {
    fontFamily: 'Inter18Regular',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
    color: '#FF8600',
    textAlign: 'right',
  },
  flatListContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  menuItem: {
    width: itemSize,
    alignItems: 'center',
  },
  menuImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: 'cover',
  },
  menuText: {
    marginTop: 10,
    fontFamily: 'Inter18Bold',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default styles;
