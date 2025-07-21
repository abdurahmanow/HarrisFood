// types/navigation.ts
export type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Profile: undefined;
  CategoryProducts: { categoryId: string; categoryTitle: string }; // <-- обязательно!
};
