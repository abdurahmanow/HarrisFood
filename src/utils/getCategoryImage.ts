// utils/getCategoryImage.ts

export function getCategoryImage(idOrName: string) {
  const key = idOrName.replace('.png', '').toLowerCase();

  switch (key) {
    case 'soups':
      return require('../assets/img/burgers.png');
    case 'hot_dishes':
      return require('../assets/img/burgers.png');
    case 'starters':
      return require('../assets/img/burgers2.png');
    case 'salads':
      return require('../assets/img/burgers.png');
    case 'desserts':
      return require('../assets/img/burgers.png');
    case 'cheburek_yantyk':
      return require('../assets/img/burgers.png');
    case 'mangal':
      return require('../assets/img/burgers3.png');
    case 'rolls':
      return require('../assets/img/burgers6.png');
    case 'fastfood':
      return require('../assets/img/burgers.png');
    case 'pizza':
      return require('../assets/img/burgers4.png');
    case 'drinks':
      return require('../assets/img/burgers1.png');
    case 'tea_coffee':
      return require('../assets/img/burgers1.png');
    default:
      return require('../assets/img/burgers1.png'); // fallback
  }
}
