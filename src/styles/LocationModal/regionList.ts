import { StyleSheet } from 'react-native';

export const regionListStyles = StyleSheet.create({
  flatListWrapper: {
    maxHeight: 490,
    marginTop: 4,
    marginHorizontal: 24,
  },
  regionScrollContent: {
    paddingBottom: 100,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    height: 50,
  },
  regionItemSelected: {
    backgroundColor: '#FFF2DC',
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FF9900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9900',
  },
  regionText: {
    fontSize: 14,
    fontFamily: 'Inter18Regular',
    color: '#FF9900',
  },
  regionTextSelected: {
    color: '#151515',
    fontFamily: 'Inter18Bold',
  },
  regionBottomSpacer: {
    height: 100,
    backgroundColor: '#fff',
  },
});
