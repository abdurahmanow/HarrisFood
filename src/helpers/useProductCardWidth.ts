import { useWindowDimensions } from 'react-native';

export function useProductCardWidth() {
  const { width } = useWindowDimensions();
  const horizontalPadding = 24 * 2; // 24px слева + 24px справа
  const gap = 9; // Между карточками
  const cardsInRow = 2;
  return (width - horizontalPadding - gap) / cardsInRow;
}
