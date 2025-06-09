import { StyleSheet } from 'react-native';

export const bottomActionAreaStyles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    zIndex: 10,
  },
  agreementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FF9900',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fff', // не закрашиваем при активе, только бордер
    borderColor: '#FF9900',
  },
  checkmarkIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
  },
  agreementText: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#151515',
  },
  agreementLink: {
    textDecorationLine: 'underline',
    color: '#FF9900',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9900',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  buttonDisabled: {
    backgroundColor: '#FAFAFA',
  },
  buttonText: {
    fontFamily: 'Inter18Bold',
    fontSize: 18,
    color: '#FFF',
  },
  buttonTextDisabled: {
    color: '#A1A1A1',
  },
});
