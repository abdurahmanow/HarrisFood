import { StyleSheet } from 'react-native';

export const addressInputStyles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // если хочешь — можешь убрать
    paddingBottom: 24,
  },

  label: {
    fontFamily: 'Inter18Regular',
    fontSize: 12,
    color: '#A9A9A9',
    marginBottom: 7,
    lineHeight: 15,
    fontWeight: '400',
  },
  star: {
    color: '#FF3B30',
    fontFamily: 'Inter18Bold',
    fontSize: 12,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#222',
    fontFamily: 'Inter18Regular',
  },
});

