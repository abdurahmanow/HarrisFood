export interface Product {
  id: string;
  category: string;
  title: string;
  description?: string;
  image: string;
  price: number;            // Цена за 1 единицу, если нет вариантов/размеров
  price_per?: number;       // Цена за N грамм/мл, если есть
  per_unit?: number;        // За сколько грамм/мл цена
  unit?: string;            // г, мл, шт и т.д.
  minQty: number;
  maxQty?: number;
  qtyStep: number;
  qtyUnitLabel: string;     // Для отображения в UI
  sizes?: ProductSize[];    // Если есть варианты размера
  variants?: ProductVariant[]; // Если есть начинки/варианты
  addons?: string[];        // ID добавок
  currency: string;
  [key: string]: any; // <-- любые другие доп. поля!
}
export interface ProductSize {
  id: string;               // Например, "s", "m", "l" или "20см"
  title: string;            // Для UI — "Маленькая", "20см"
  price: number;
  weight?: number;
  volume?: number;
  unit: string;             // г, мл, см
  minQty?: number;
}
export interface ProductVariant {
  id: string;
  title: string;
  price?: number;
}
