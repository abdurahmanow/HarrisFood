import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter24Bold',
    fontSize: 18,
    color: '#101010',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#9E9E9E',
    lineHeight: 20,
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    color: '#101010',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF8800',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#FFD9A1',
  },
  buttonText: {
    fontFamily: 'Inter18Bold',
    fontSize: 16,
    color: '#fff',
  },
});
