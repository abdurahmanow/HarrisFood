// MenuBlockStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const sidePadding = 16;
const columns = 4;
const screenWidth = Dimensions.get('window').width;
const itemSize = (screenWidth - sidePadding * 2) / columns;

const styles = StyleSheet.create({
  flatListContent: {
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: sidePadding,
  },
  columnWrapper: {
    marginBottom: 16, // как в фигме между строками!
  },
  menuItem: {
    width: itemSize,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  menuText: {
    marginTop: 6,
    fontFamily: 'Inter18Bold',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});

export default styles;
