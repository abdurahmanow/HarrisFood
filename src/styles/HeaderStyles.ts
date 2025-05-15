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
  logo: {
    marginTop: 12,
    marginRight: 'auto',
  },
  deliveryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTextBlock: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 10,
    maxWidth: 180,
  },
  deliveryTypeText: {
    color: '#9E9E9E',
    fontFamily: 'Inter18Regular',
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'right',
    marginBottom: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: '#101010',
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 6,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF4E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
