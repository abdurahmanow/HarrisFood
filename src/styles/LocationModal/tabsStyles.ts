import { StyleSheet } from 'react-native';

export const tabsStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 9,
    marginTop: 15,
    marginBottom: 0,
  },
  tabWrapper: {
    flex: 1,
  },
  tab: {
    width: '100%',
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
