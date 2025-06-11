interface CartState {
  items: CartItemProps[];
}

export const getCache = (code: string): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem(code);
    if (!serializedState) return undefined;

    const parsed = JSON.parse(serializedState);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.items)) {
      return parsed as CartState;
    }
    return undefined;
  } catch (err) {
    console.error("Failed to get cart from localStorage:", err);
    return undefined;
  }
};

export const setCache = (code: string, state: CartState): void => {
  try {
    localStorage.setItem(code, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};
