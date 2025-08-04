// utils/getCategoryImage.ts

export function getCategoryImage(idOrName: string) {
  const key = idOrName.replace('.png', '').toLowerCase();

  switch (key) {
    case 'soups':
      return require('../assets/img/categories/soups.png');
    case 'hot_dishes':
      return require('../assets/img/categories/hot_dishes.png');
    case 'pizza':
      return require('../assets/img/categories/pizza.png');
    case 'starters':
      return require('../assets/img/categories/defolt.png');
    case 'salads':
      return require('../assets/img/categories/salads.png');
    case 'desserts':
      return require('../assets/img/categories/desserts.png');
    case 'cheburek_yantyk':
      return require('../assets/img/categories/cheburek_yantyk.png');
    case 'mangal':
      return require('../assets/img/categories/mangal.png');
    case 'rolls':
      return require('../assets/img/categories/rolls.png');
    case 'fastfood':
      return require('../assets/img/categories/fastfood.png');
    case 'snacks':
      return require('../assets/img/categories/snacks.png');
    case 'drinks':
      return require('../assets/img/categories/drinks.png');
    case 'tea_coffee':
      return require('../assets/img/categories/tea_coffee.png');
    case 'cold_drinks':
      return require('../assets/img/categories/cold_drinks.png');
    case 'fresh':
      return require('../assets/img/categories/fresh.png');
    case 'sets':
      return require('../assets/img/categories/sets.png');
    case 'burgers':
      return require('../assets/img/categories/burgers.png');
    case 'big_menu':
      return require('../assets/img/categories/big_menu.png');
    default:
      return require('../assets/img/categories/defolt.png'); // fallback
  }
}
