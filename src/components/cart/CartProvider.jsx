import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "halo_cart_v1";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { open: false, items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { open: false, items: [] };
    return { open: false, items: parsed.items };
  } catch {
    return { open: false, items: [] };
  }
}

/**
 * item schema:
 * { id, name, price, qty, image?, meta? }
 */
function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    case "TOGGLE":
      return { ...state, open: !state.open };

    case "ADD": {
      const item = action.item;
      const addQty = clamp(action.qty ?? 1, 1, 99);
      const idx = state.items.findIndex((x) => x.id === item.id);

      if (idx >= 0) {
        const next = state.items.slice();
        next[idx] = { ...next[idx], qty: clamp((next[idx].qty ?? 1) + addQty, 1, 99) };
        return { ...state, items: next };
      }

      return { ...state, items: [...state.items, { ...item, qty: addQty }] };
    }

    case "REMOVE":
      return { ...state, items: state.items.filter((x) => x.id !== action.id) };

    case "CLEAR":
      return { ...state, items: [] };

    case "SET_QTY": {
      const q = clamp(action.qty ?? 1, 1, 99);
      return {
        ...state,
        items: state.items.map((x) => (x.id === action.id ? { ...x, qty: q } : x)),
      };
    }

    case "INC":
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.id ? { ...x, qty: clamp((x.qty ?? 1) + 1, 1, 99) } : x
        ),
      };

    case "DEC":
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === action.id ? { ...x, qty: clamp((x.qty ?? 1) - 1, 1, 99) } : x
        ),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  // persist items only
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      // ignore
    }
  }, [state.items]);

  const api = useMemo(() => {
    const subtotal = state.items.reduce((sum, x) => sum + (x.price ?? 0) * (x.qty ?? 1), 0);
    const itemCount = state.items.reduce((sum, x) => sum + (x.qty ?? 1), 0);

    return {
      open: state.open,
      items: state.items,
      subtotal,
      itemCount,

      openCart: () => dispatch({ type: "OPEN" }),
      closeCart: () => dispatch({ type: "CLOSE" }),
      toggleCart: () => dispatch({ type: "TOGGLE" }),

      addItem: (item, qty = 1) => dispatch({ type: "ADD", item, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),

      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      inc: (id) => dispatch({ type: "INC", id }),
      dec: (id) => dispatch({ type: "DEC", id }),
    };
  }, [state.open, state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>.");
  return ctx;
}