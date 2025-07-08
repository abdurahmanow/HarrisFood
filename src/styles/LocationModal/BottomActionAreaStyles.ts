import { StyleSheet } from 'react-native';

export const bottomActionAreaStyles = StyleSheet.create({

    fixedOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // bottom и paddingBottom добавим в компонент через StyleSheet.compose, так как зависит от safe-area
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
    backgroundColor: '#fff',
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
