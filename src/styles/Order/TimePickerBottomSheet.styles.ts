import { StyleSheet } from 'react-native';

export const ORANGE = '#FFA52F';
export const BORDER = '#E0E0E0';
export const TEXT_MUTED = '#6B6B6B';
export const BG = '#FFFFFF';

export const HANDLE_ESTIMATE = 24;

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },

  header: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter18Bold',
    fontWeight: 600,
    fontSize: 18,
    color: '#000',
  },
  doneBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ff9900',
  },
  doneText: {
    fontFamily: 'Inter18Bold',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  // низ шита
  footerRow: {
    marginTop: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {
    fontFamily: 'Inter18Regular',
    fontSize: 14,
    color: TEXT_MUTED,
  },

  handleIndicator: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CFCFCF',
    alignSelf: 'center',
    marginVertical: 8,
  },
  sheetBackground: {
    backgroundColor: BG,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
