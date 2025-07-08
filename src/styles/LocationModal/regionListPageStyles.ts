import { StyleSheet } from 'react-native';

export const regionListPageStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    paddingRight: 18,
    paddingVertical: 8,
  },
  backBtnText: {
    color: '#FFA52F',
    fontSize: 16,
    fontFamily: 'Inter18Bold',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Inter24Bold',
    fontWeight: 'bold',
    color: '#222',
  },
  headerRightStub: {
    width: 60,
  },
  keyboardAvoid: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  listContentRegion: {
    paddingBottom: 110, // для региона (чтобы кнопка не перекрывала)
  },
  listContentCity: {
    paddingBottom: 110, // для города (если понадобится другой отступ — вынеси отдельно)
  },
  emptyText: {
    padding: 24,
    fontFamily: 'Inter18Regular',
    color: '#A9A9A9',
    fontSize: 16,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#FFA52F',
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnDisabled: {
    backgroundColor: '#E0E0E0',
  },
  nextBtnText: {
    color: '#fff',
    fontFamily: 'Inter18Bold',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextBtnTextDisabled: {
    color: '#A9A9A9',
  },
  flatListWrap: {
  maxHeight: 490,
  marginTop: 16,
  overflow: 'hidden',
},

scrollContent: {
  paddingBottom: 32,
  paddingHorizontal: 24,
  flexGrow: 1,
},
});
