import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalBackground: {
    backgroundColor: '#fff',
  },
  handle: {
    backgroundColor: '#E0E0E0',
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flex: 1,
  },
  
});
