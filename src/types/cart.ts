export type Addition = {
  id: string;
  title: string;
  count: number;
  price: number;
};

export type CartItem = {
  cartItemId: string; // ✅ обязательно уникальный ID
  id: string;
  title: string;
  image?: string;
  size?: string;
  variant?: string;
  price: number;
  qty: number;
  additions: Addition[]; // тип уже должен быть определён
};


export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
};

// 💡 Можно добавить утилиту прямо сюда
export const getItemTotal = (item: CartItem): number => {
  const additionsTotal =
    item.additions?.reduce((sum, a) => sum + a.price * a.count, 0) || 0;
  return (item.price + additionsTotal) * item.qty;
};
