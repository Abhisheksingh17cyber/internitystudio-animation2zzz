import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isPaymentOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "OPEN_PAYMENT" }
  | { type: "CLOSE_PAYMENT" }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  isOpen: false,
  isPaymentOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity ?? 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: action.quantity }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "OPEN_PAYMENT":
      return { ...state, isOpen: false, isPaymentOpen: true };
    case "CLOSE_PAYMENT":
      return { ...state, isPaymentOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  openPayment: () => void;
  closePayment: () => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product, quantity) =>
          dispatch({ type: "ADD_ITEM", product, quantity }),
        removeItem: (productId) =>
          dispatch({ type: "REMOVE_ITEM", productId }),
        updateQty: (productId, quantity) =>
          dispatch({ type: "UPDATE_QTY", productId, quantity }),
        openCart: () => dispatch({ type: "OPEN_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        openPayment: () => dispatch({ type: "OPEN_PAYMENT" }),
        closePayment: () => dispatch({ type: "CLOSE_PAYMENT" }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
