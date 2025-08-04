// MenuBlockStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const sidePadding = 16;
const columns = 4;
const screenWidth = Dimensions.get('window').width;
const itemSize = (screenWidth - sidePadding * 2) / columns;

const styles = StyleSheet.create({
  flatListContent: {

    paddingHorizontal: sidePadding,
  },
  columnWrapper: {
    marginBottom: 10,
  },
  menuItem: {
    width: itemSize,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuImage: {
    width: 64,
    height: 64,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 20,
  },
  menuText: {
    marginTop: 4,
    fontFamily: 'Inter18Bold',
    fontSize: 11,
    lineHeight: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});

export default styles;
