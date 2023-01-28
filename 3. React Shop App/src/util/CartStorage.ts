export interface newCartItem {
  id: string;
  count: number;
  price: number;
}

export const loadCart = (): newCartItem[] => {
  const cartJson = localStorage.getItem("cartItem");

  if (!cartJson) {
    return [];
  }

  try {
    return JSON.parse(cartJson);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const loadTheme = () => {
  return localStorage.getItem("cart-theme");
};
