import { StyleSheet } from 'react-native';

export const pickupListStyles = StyleSheet.create({
  pickupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DE',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginHorizontal: 24,
  },
  pickupRadioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FF9900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pickupRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9900',
  },
  pickupTextBlock: {
    flex: 1,
  },
  pickupCity: {
    fontSize: 14,
    fontFamily: 'Inter18Regular',
    fontWeight: '700',
    color: '#FF9900',
    marginBottom: 6,
  },
  pickupAddress: {
    fontSize: 12,
    fontFamily: 'Inter18Regular',
    color: '#A9A9A9',
    lineHeight: 15,
  },
  regionScrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9900',
  },
  bottomSpacer: {
    height: 100, // стандартный отступ, если надо — поменяй
  },
});
