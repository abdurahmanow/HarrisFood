import { StyleSheet } from 'react-native';

export const titleBlockStyles = StyleSheet.create({
  block: {
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 24,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter24Bold',
    fontWeight: 'semibold',
    color: '#101010',
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    fontFamily: 'Inter18Regular',
    fontWeight: 'regular',
    color: '#A9A9A9',
    lineHeight: 16,
    maxWidth: 253,
  },
});
