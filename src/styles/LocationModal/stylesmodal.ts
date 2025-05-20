// styles/LocationModal/stylesmodal.ts
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
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

  // Вниз файла stylesmodal.ts
  addButtonWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  addButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 15,
    fontFamily: 'Inter18Regular',
    color: '#9E9E9E',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 20,
    gap: 25,
  },

  tab: {
    width: 159,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabActive: {
    backgroundColor: '#FFA52F',
  },

  tabText: {
    fontFamily: 'Inter18Bold',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFA52F',
  },

  tabTextActive: {
    color: '#fff',
  },
});
