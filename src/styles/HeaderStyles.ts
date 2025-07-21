import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: 2,
    marginRight: 'auto',
    borderRadius: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    borderRadius: 5,
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    paddingLeft: 12,
    paddingRight: 0,
    marginLeft: 12,
  },
  deliveryTextBlock: {
    justifyContent: 'center',
    maxWidth: 180,
    marginRight: 12,
  },
  deliveryTypeText: {
    fontFamily: 'Inter18Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#A9A9A9',
    textAlign: 'right',
  },
  addressText: {
    fontFamily: 'Inter18Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#101010',
    textAlign: 'right',
  },
  iconContainer: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(255, 153, 0, 0.10)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
