import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductItem {
  id: string;
}
export interface ProductItemContextProps {
  ProductItemConfig: ProductItem | null;
  children: ReactElement;
}

export const ProductItemContext = createContext<ProductItem | null>(null);
export const ProductItemContextProvider = (props: ProductItemContextProps) => {
  const { ProductItemConfig, children } = props;

  const [ProductItem, setProductItem] = useState<ProductItem | null>(null);
  useEffect(() => {
    if (ProductItemConfig !== null) {
      setProductItem({
        id: ProductItemConfig.id,
      });
    }
  }, [ProductItemConfig]);

  return (
    <>
      <ProductItemContext.Provider value={ProductItem}>{children}</ProductItemContext.Provider>
    </>
  );
};

export default function useProductItemContext() {
  const context = useContext<ProductItem | null>(
    ProductItemContext
  );
  if (!context) throw new Error("ProductItem context error!!");
  return context;
}
