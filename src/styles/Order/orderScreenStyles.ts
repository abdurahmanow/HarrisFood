import { StyleSheet } from 'react-native';

export const BORDER = '#A9A9A9';
export const ORANGE = '#FFA52F';

export const orderScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // общие отступы
  scroll: { padding: 24, paddingTop: 12 },
  block: { marginTop: 10 },

  // input внутри LabeledField
  input: {
    height: 24,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    color: '#000',
  },

  // сегментированная строка: [ item | item ]
  segmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemTime: {
    flex: 5,
  },
  segmentItemAsap: {
    flex: 5,
  },
  segmentItemDisabled: {
    opacity: 0.5,
  },
  segmentDivider: {
    width: 1,
    height: 22,
    backgroundColor: BORDER,
  },
  segmentText: {
    fontSize: 16,
    fontFamily: 'Inter18Regular',
    color: '#000',
  },
  segmentTextActive: {
    fontFamily: 'Inter18Bold',
    color: '#ff9900',
  },
  segmentTextDisabled: {
    color: '#666',
  },

  // кнопка отправки
  submitButton: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  submitText: {
    fontSize: 16,
    fontFamily: 'Inter18Bold',
    color: '#fff',
  },

  /* ===== Адрес (чистый, без фона и рамок) ===== */
    addressCard: {
    gap: 2,
  },
  addressMeta: {
    fontSize: 12,
    fontFamily: 'Inter18Regular',
    color: '#808080', // серый, не бросается в глаза
  },
  addressCity: {
    fontFamily: 'Inter18Bold',
    fontSize: 14,
    color: '#000',
  },
  addressStreet: {
    marginTop: 2,
    fontFamily: 'Inter18Regular',
    fontSize: 15,
    color: '#3A3A3A',
  },
  addressHours: {
    fontSize: 12,
    fontFamily: 'Inter18Regular',
    color: '#6B6B6B',
    marginTop: 2,
  },
  addressCityStreet: {
    fontSize: 14,
    fontFamily: 'Inter18Bold',
    color: '#000',
  },
});
