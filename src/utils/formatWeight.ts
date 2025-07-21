export function formatWeight(value: number, unit: string = 'г'): string {
  if (unit === 'г' || unit === 'гр' || unit === 'грамм' || unit === 'граммов') {
    if (value < 1000) {
      return `${value} г`;
    } else {
      // 1200 -> 1.2 кг, 1250 -> 1.25 кг, 2000 -> 2 кг
      const kg = value / 1000;
      // Обрезаем лишние нули после точки
      return `${kg % 1 === 0 ? kg.toFixed(0) : kg.toFixed(2).replace(/\.?0+$/, '')} кг`;
    }
  }
  // Для других единиц просто возвращаем значение с единицей
  return `${value} ${unit}`;
}
