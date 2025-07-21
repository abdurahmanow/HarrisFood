import { StyleSheet } from 'react-native';

export const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#171717',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
    paddingBottom: 12,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontFamily: 'Inter18Bold',
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
    marginBottom: 8,
    paddingHorizontal: 10,
    minHeight: 44,
    textAlign: 'left',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price: {
    fontFamily: 'Inter18Bold',
    fontWeight: '600',
    fontSize: 16,
    color: '#FF9900',
  },
  qtyBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    height: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 5, // <- отступы слева и справа 10px
    minWidth: 88,          // ширина, чтобы вместить всё (для веса делай чуть шире)
  },
  qtyBtn: {
    width: 15,
    height: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 14,
    fontFamily: 'Inter18Bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  qtyBtnDisabled: {
    color: '#D2D2D2',
  },
  qtyText: {
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    color: '#1A1A1A',
    textAlign: 'center',
    marginHorizontal: 0, // <- отступы между кнопкой и числом ровно 10
    minWidth: 18,         // достаточно для "99" или "1кг"
    includeFontPadding: false,
  },
  qtyUnitLabel: {
    fontFamily: 'Inter18Regular',
    fontSize: 12,
    color: '#A9A9A9',
    marginLeft: 2,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontFamily: 'Inter18Bold',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  noImage: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#A9A9A9',
    fontSize: 16,
    fontFamily: 'Inter18Regular',
  },
});
