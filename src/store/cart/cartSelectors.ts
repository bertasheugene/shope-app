import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);

export const selectAddedCount = () =>
  createSelector([selectCartItems, (_, itemId) => itemId], (items, itemId) => {
    const addedItems = items.filter((obj) => obj.id === itemId);
    return addedItems.reduce((sum, item) => sum + item.quantity, 0);
  });
