import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
listContainer: {
    flex: 1,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF4E8',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  addressCardActive: {
    backgroundColor: '#FFEAD2',
  },
  radioWrapper: {
    marginRight: 12,
  },
  addressTextBlock: {
    flex: 1,
  },
  addressRegion: {
    fontFamily: 'Inter18Bold',
    fontSize: 16,
    color: '#FF8800',
    marginBottom: 2,
  },
  addressLine: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    backgroundColor: '#FF8800',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter18Bold',
    color: '#fff',
    fontSize: 16,
  },
});
