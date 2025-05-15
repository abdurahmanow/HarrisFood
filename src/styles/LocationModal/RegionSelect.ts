import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E8',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  regionItemActive: {
    backgroundColor: '#FFEAD2',
  },
  regionText: {
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    marginLeft: 10,
    color: '#FF8800',
  },
});
