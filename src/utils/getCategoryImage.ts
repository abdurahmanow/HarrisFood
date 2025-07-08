// utils/getCategoryImage.ts

export function getCategoryImage(name: string) {
  switch (name) {
    case 'soups.png':
      return require('../assets/img/burgers.png');
    case 'hot_dishes.png':
      return require('../assets/img/burgers.png');
    case 'starters.png':
      return require('../assets/img/burgers.png');
    case 'salads.png':
      return require('../assets/img/burgers.png');
    case 'desserts.png':
      return require('../assets/img/burgers.png');
    case 'cheburek_yantyk.png':
      return require('../assets/img/burgers.png');
    case 'mangal.png':
      return require('../assets/img/burgers.png');
    case 'rolls.png':
      return require('../assets/img/burgers.png');
    case 'fastfood.png':
      return require('../assets/img/burgers.png');
    case 'pizza.png':
      return require('../assets/img/burgers.png');
    case 'drinks.png':
      return require('../assets/img/burgers.png');
    case 'tea_coffee.png':
      return require('../assets/img/burgers.png');
    default:
      return require('../assets/img/burgers.png'); // fallback
  }
}
