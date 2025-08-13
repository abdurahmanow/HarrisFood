import { StyleSheet } from 'react-native';

export const ITEM_HEIGHT = 44;
export const VISIBLE_COUNT = 3;
export const SELECTION_PADDING = ITEM_HEIGHT * ((VISIBLE_COUNT - 1) / 2);

const lensBg = 'rgba(255,255,255,0.82)';
const fadeBg = 'rgba(255,255,255,0.92)';
const border = 'rgba(0,0,0,0.12)';

export const styles = StyleSheet.create({
  wrapper: { position: 'relative', height: ITEM_HEIGHT * VISIBLE_COUNT },
  container: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12,
  },
  col: { flex: 1 },
  item: { height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  itemText: {
    fontSize: 24,
    fontFamily: 'Inter24Regular',
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
  },

  selectionBox: {
    position: 'absolute',
    left: 8, right: 8, top: SELECTION_PADDING, height: ITEM_HEIGHT,
    borderWidth: 1, borderColor: border, borderRadius: 12, backgroundColor: lensBg,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  fadeTop:    { position: 'absolute', left: 0, right: 0, top: 0, height: SELECTION_PADDING, backgroundColor: fadeBg },
  fadeBottom: { position: 'absolute', left: 0, right: 0, bottom: 0, height: SELECTION_PADDING, backgroundColor: fadeBg },

  colonOverlay: {
    position: 'absolute',
    top: SELECTION_PADDING, height: ITEM_HEIGHT, left: 0, right: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  colonText: { fontSize: 24, fontFamily: 'Inter24Bold' },

  // подпись под «:»
  dayUnderColonBox: {
    position: 'absolute',
    top: SELECTION_PADDING + ITEM_HEIGHT + 6, // ниже линзы (см. макет)
    left: 0, right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dayUnderColonText: {
    fontSize: 12,
    fontFamily: 'Inter24Regular',
    opacity: 0.9,
  },

  // совместимость с android-версией:
  selectionTopLine: { display: 'none' as any },
  selectionBottomLine: { display: 'none' as any },
});
