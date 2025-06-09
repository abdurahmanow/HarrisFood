import { StyleSheet } from 'react-native';

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
    justifyContent: 'flex-start',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 0,
    marginBottom: 15,
  },
  titleBlock: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter24Bold',
    color: '#101010',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    fontFamily: 'Inter18Regular',
    color: '#9E9E9E',
    lineHeight: 18,
  },
  flex1: {
    flex: 1,
  },
  buttonFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    zIndex: 20,
  },
});
