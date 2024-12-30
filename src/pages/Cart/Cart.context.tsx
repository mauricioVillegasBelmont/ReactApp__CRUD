import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Cart {
  id: string;
}
export interface CartContextProps {
  CartConfig: Cart | null;
  children: ReactElement;
}

export const CartContext = createContext<Cart | null>(null);
export const CartContextProvider = (props: CartContextProps) => {
  const { CartConfig, children } = props;

  const [Cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    if (CartConfig !== null) {
      setCart({
        id: CartConfig.id,
      });
    }
  }, [CartConfig]);

  return (
    <>
      <CartContext.Provider value={Cart}>{children}</CartContext.Provider>
    </>
  );
};

export default function useCartContext() {
  const context = useContext<Cart | null>(
    CartContext
  );
  if (!context) throw new Error("Cart context error!!");
  return context;
}
