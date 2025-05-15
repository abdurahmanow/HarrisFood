import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  selectModeWrapper: {
    marginBottom: 16,
  },
  selectModeHeader: {
    marginBottom: 12,
  },
  selectTitle: {
    fontFamily: 'Inter24Bold',
    fontSize: 20,
    color: '#101010',
    marginBottom: 4,
  },
  selectSubtitle: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#9E9E9E',
    lineHeight: 20,
  },
  modeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FF8800',
  },
  tabText: {
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    color: '#9E9E9E',
  },
  tabTextActive: {
    fontFamily: 'Inter18Bold',
    color: '#fff',
  },
});
