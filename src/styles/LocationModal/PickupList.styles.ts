import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E8',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardActive: {
    backgroundColor: '#FFEAD2',
  },
  textBlock: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontFamily: 'Inter18Bold',
    fontSize: 16,
    color: '#FF8800',
    marginBottom: 2,
  },
  address: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
});
