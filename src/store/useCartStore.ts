import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isCartOpen: false,
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id && i.size === item.size);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id, size) => set((state) => ({
    items: state.items.filter((i) => !(i.id === id && i.size === size)),
  })),
  updateQuantity: (id, size, quantity) => set((state) => ({
    items: state.items.map((i) =>
      i.id === id && i.size === size ? { ...i, quantity } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));
