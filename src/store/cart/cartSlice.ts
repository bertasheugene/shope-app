import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCache, setCache } from "../../utils/cache";

interface CartState {
  items: CartItemProps[];
}

type AddCartItemPayload = Omit<CartItemProps, "quantity"> & {
  quantity?: number;
};
type CartItemIdentifier = Pick<CartItemProps, "id" | "color" | "memory">;
type UpdateQuantityPayload = CartItemIdentifier & { quantity: number };

const getInitialState = (): CartState => {
  const cached = getCache("cart");
  return cached ? cached : { items: [] };
};

const initialState: CartState = getInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddCartItemPayload>) {
      const { id, color, memory, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color === color &&
          item.memory.size === memory.size
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantity || 1,
        });
      }

      setCache("cart", state);
    },
    removeFromCart: (state, action: PayloadAction<CartItemIdentifier>) => {
      const { id, color, memory } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === id &&
            item.color === color &&
            item.memory.size === memory.size
          )
      );
      setCache("cart", state);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, color, memory, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.id === id &&
          item.color === color &&
          item.memory.size === memory.size
      );

      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      setCache("cart", state);
    },
    clearCart: (state) => {
      state.items = [];
      setCache("cart", state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
