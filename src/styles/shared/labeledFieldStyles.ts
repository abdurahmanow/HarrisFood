import { StyleSheet } from 'react-native';

export const LAB_BORDER = '#A9A9A9';
export const LAB_BORDER_FOCUS = '#FFA52F';
export const LAB_BG = '#FFFFFF';

export const labeledFieldStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: LAB_BORDER,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: LAB_BG,
    position: 'relative',
    marginBottom: 7, // ⬅️ отступ между полями
  },
  /** Компактный вариант: минимальные внутренние отступы */
  containerCompact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  containerHighlighted: {
    borderColor: LAB_BORDER_FOCUS,
  },
  legendWrap: {
    position: 'absolute',
    left: 12,
    top: -10,
    paddingHorizontal: 6,
    backgroundColor: LAB_BG,
  },
  legendText: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'Inter18Regular',
    color: '#4A4A4A',
  },
  required: {
    color: '#E53935',
    fontFamily: 'Inter18Bold',
  },
  inner: {},
});
