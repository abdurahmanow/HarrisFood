import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F4F4F4',
  },
  itemContent: {
    flex: 1,
    minHeight: 64,
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    flexShrink: 1,
    paddingRight: 4,
  },
  itemQty: {
    fontFamily: 'Inter18Regular',
    fontSize: 13,
    color: '#999',
  },
  deleteButton: {
    paddingLeft: 8,
    paddingTop: 2,
  },
  deleteText: {
    fontSize: 16,
    color: '#888',
  },
  itemDescription: {
    fontFamily: 'Inter18Regular',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  bottomPriceRow: {
    marginTop: 6,
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontFamily: 'Inter18Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9900', // как на макете
    lineHeight: 24,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginTop: 10,   // было 16 → уменьшили
    marginBottom: 12, // было 16 → уменьшили
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: '#1A1A1A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: 'Inter24Bold',
    fontSize: 17,
    color: '#1A1A1A',
  },
  totalValue: {
    fontFamily: 'Inter24Bold',
    fontSize: 17,
    color: '#1A1A1A',
  },
  submitButton: {
    backgroundColor: '#FFA52F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Inter18Bold',
    fontSize: 15,
    color: '#fff',
  },
});
