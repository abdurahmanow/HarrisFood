export type Addition = {
  id: string;
  title: string;
  count: number;
  price: number;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  size?: string;
  variant?: string;
  additions?: Addition[];
  image?: any;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

// 💡 Можно добавить утилиту прямо сюда
export const getItemTotal = (item: CartItem): number => {
  const additionsTotal =
    item.additions?.reduce((sum, a) => sum + a.price * a.count, 0) || 0;
  return (item.price + additionsTotal) * item.qty;
};
