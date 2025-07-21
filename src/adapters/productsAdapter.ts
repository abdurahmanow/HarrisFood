import { Product, ProductSize, ProductVariant } from '../types/product';
import { productImages } from '../types/productsImagesMap';

export function parseRawProduct(raw: any): Product {
  const minQty: number = raw.minQty ?? 1;
  const qtyStep: number = raw.qtyStep ?? 1;
  const unit: string =
    raw.unit ?? (raw.weight ? 'г' : raw.volume ? 'мл' : 'шт');
  const qtyUnitLabel: string = raw.qtyUnitLabel ?? unit;

  // Фото
  let image: any = null;
  if (raw.image) {
    image = productImages[raw.image] || require('../assets/img/products/image.png');
  } else {
    image = require('../assets/img/products/image.png');
  }

  // Размеры/опции
  let sizes: ProductSize[] | undefined;
  const optionsArr = raw.options || raw.sizes || [];
  if (Array.isArray(optionsArr) && optionsArr.length) {
    sizes = optionsArr.map(
      (opt: any, idx: number): ProductSize => ({
        id: opt.id ??
          (opt.title?.toLowerCase().replace(/\s/g, '_') || String(idx)),
        title: opt.title || '',
        price: Number(opt.price ?? 0),
        weight: opt.weight,
        volume: opt.volume ?? opt.value,
        unit: opt.unit ?? unit,
        minQty: opt.minQty ?? minQty,
      }),
    );
  }

  // Варианты
  let variants: ProductVariant[] | undefined;
  if (Array.isArray(raw.variants)) {
    variants = raw.variants.map(
      (v: any, idx: number): ProductVariant => ({
        id: v.id ?? String(idx),
        title: v.title ?? '',
        price: v.price,
      }),
    );
  }

  // Цена
  let basePrice: number = 0;
  if (sizes && sizes.length > 0) {
    basePrice = Number(sizes[0].price);
  } else if (typeof raw.price_per !== 'undefined') {
    basePrice = Number(raw.price_per);
  } else if (typeof raw.price !== 'undefined') {
    basePrice = Number(raw.price);
  }

  // Категории
  let category: string | string[] = raw.category;
  if (Array.isArray(category)) {
    category = category.filter(Boolean);
  } else if (typeof category === 'string') {
    category = category.trim();
  }

  return {
    ...raw, // все поля из raw (image перезапишется ниже)
    id: raw.id,
    category,
    title: raw.title,
    description: raw.description ?? '',
    image, // вот require-объект
    price: basePrice,
    price_per: raw.price_per,
    per_unit: raw.per_unit,
    unit,
    minQty,
    qtyStep,
    qtyUnitLabel,
    sizes,
    variants,
    addons: raw.addons ?? raw.additives ?? [],
    currency: raw.currency ?? '₽',
  };
}

export function parseProducts(rawList: any[]): Product[] {
  return rawList.map(parseRawProduct);
}
