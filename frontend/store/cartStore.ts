import { create } from 'zustand';

// This is the shape of an item in our database
interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  // --- ADDED THESE NEW FIELDS ---
  description: string;
  imageUrl: string;
  // --------------------------
}

// This is the shape of an item *inside* our cart
// It automatically inherits the new fields from MenuItem
export interface CartItem extends MenuItem {
  quantity: number;
}

// This is the shape of the "brain" itself
interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

// This is where all the logic lives
export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  /**
   * Adds a new item to the cart.
   * If the item already exists, it increases the quantity by 1.
   */
  addItem: (itemToAdd) => {
    const items = get().items;
    const existingItemIndex = items.findIndex(i => i._id === itemToAdd._id);

    if (existingItemIndex > -1) {
      // Item already exists: update quantity
      const newItems = [...items];
      newItems[existingItemIndex].quantity += 1;
      set({ items: newItems });
    } else {
      // Item is new: add it with quantity 1
      set({ items: [...items, { ...itemToAdd, quantity: 1 }] });
    }
  },

  /**
   * Removes an item from the cart.
   * If the quantity is > 1, it decreases the quantity.
   * If the quantity is 1, it removes the item completely.
   */
  removeItem: (itemId) => {
    const items = get().items;
    const existingItem = items.find(i => i._id === itemId);

    if (existingItem && existingItem.quantity > 1) {
      // Quantity > 1: decrease it
      const newItems = items.map(i => 
        i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
      set({ items: newItems });
    } else {
      // Quantity is 1 or item doesn't exist: filter it out
      const newItems = items.filter(i => i._id !== itemId);
      set({ items: newItems });
    }
  },

  /**
   * Empties the entire cart.
   */
  clearCart: () => {
    set({ items: [] });
  },
}));
