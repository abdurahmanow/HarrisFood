import { StyleSheet, Platform } from 'react-native';

export const ITEM_HEIGHT = 44;
export const VISIBLE_COUNT = 3;
export const SELECTION_PADDING = ITEM_HEIGHT * ((VISIBLE_COUNT - 1) / 2);

const lensBgIOS = 'rgba(255,255,255,0.82)';
const lensBgAndroid = 'rgba(255,255,255,0.96)';
const fadeBg = 'rgba(255,255,255,0.92)';
const borderIOS = 'rgba(0,0,0,0.12)';
const borderAndroid = 'rgba(0,0,0,0.18)';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: ITEM_HEIGHT * VISIBLE_COUNT,
  },

  container: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  col: { flex: 1 },

  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemText: {
    fontSize: 24,
    fontFamily: 'Inter24Regular',
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
  },

  /** Центральная «линза» */
  selectionBox: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: SELECTION_PADDING,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    borderWidth: Platform.OS === 'ios' ? 1 : 1.25,
    borderColor: Platform.OS === 'ios' ? borderIOS : borderAndroid,
    backgroundColor: Platform.OS === 'ios' ? lensBgIOS : lensBgAndroid,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },

  /** Тонкие внутренние линии для Android — визуально приближают к iOS */
  selectionTopLine: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: SELECTION_PADDING,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  selectionBottomLine: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: SELECTION_PADDING + ITEM_HEIGHT - StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },

  /** Фейдеры */
  fadeTop: {
    position: 'absolute',
    left: 0, right: 0, top: 0,
    height: SELECTION_PADDING,
    backgroundColor: fadeBg,
  },
  fadeBottom: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: SELECTION_PADDING,
    backgroundColor: fadeBg,
  },

  /** Двоеточие поверх линзы */
  colonOverlay: {
    position: 'absolute',
    top: SELECTION_PADDING,
    height: ITEM_HEIGHT,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  colonText: {
    fontSize: 24,
    fontFamily: 'Inter24Bold',
  },
});
