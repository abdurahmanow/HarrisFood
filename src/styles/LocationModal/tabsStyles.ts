import { StyleSheet } from 'react-native';

export const deliveryTabsStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 15,
  },
  tab: {
    width: '48%',          // Ширина таба, как в макете
    height: 36,            // Можно 48-54 для комфортного тапа
    borderRadius: 10,      // Скругление, как в макете
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  tabActive: {
    backgroundColor: '#FF9900',
  },
  tabText: {
    fontFamily: 'Inter28Bold',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 27,
    color: '#FFA52F',
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  tabTextActive: {
    color: '#fff',
  },
  leftTab: {
    marginRight: 9,
  },
});
