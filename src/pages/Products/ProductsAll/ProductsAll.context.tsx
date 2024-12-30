import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductsAll {
  id: string;
}
export interface ProductsAllContextProps {
  ProductsAllConfig: ProductsAll | null;
  children: ReactElement;
}

export const ProductsAllContext = createContext<ProductsAll | null>(null);
export const ProductsAllContextProvider = (props: ProductsAllContextProps) => {
  const { ProductsAllConfig, children } = props;

  const [ProductsAll, setProductsAll] = useState<ProductsAll | null>(null);
  useEffect(() => {
    if (ProductsAllConfig !== null) {
      setProductsAll({
        id: ProductsAllConfig.id,
      });
    }
  }, [ProductsAllConfig]);

  return (
    <>
      <ProductsAllContext.Provider value={ProductsAll}>{children}</ProductsAllContext.Provider>
    </>
  );
};

export default function useProductsAllContext() {
  const context = useContext<ProductsAll | null>(
    ProductsAllContext
  );
  if (!context) throw new Error("ProductsAll context error!!");
  return context;
}
