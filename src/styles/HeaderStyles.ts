import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cityInfo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  cityLabel: {
    color: '#606060',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.16,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityName: {
    color: '#101010',
    marginLeft: 8,
    maxWidth: 140,
  },
  locationIconWrapper: {
    width: 34,
    height: 34,
    backgroundColor: '#FFF4E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%',
},
  modalTitle: {
    marginBottom: 20,
  },
  cityOption: {
    paddingVertical: 12,
  },
  cityOptionText: {
    color: '#101010',
  },
});
