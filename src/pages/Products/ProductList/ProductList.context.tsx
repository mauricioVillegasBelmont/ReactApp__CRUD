import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductList {
  id: string;
}
export interface ProductListContextProps {
  ProductListConfig: ProductList | null;
  children: ReactElement;
}

export const ProductListContext = createContext<ProductList | null>(null);
export const ProductListContextProvider = (props: ProductListContextProps) => {
  const { ProductListConfig, children } = props;

  const [ProductList, setProductList] = useState<ProductList | null>(null);
  useEffect(() => {
    if (ProductListConfig !== null) {
      setProductList({
        id: ProductListConfig.id,
      });
    }
  }, [ProductListConfig]);

  return (
    <>
      <ProductListContext.Provider value={ProductList}>{children}</ProductListContext.Provider>
    </>
  );
};

export default function useProductListContext() {
  const context = useContext<ProductList | null>(
    ProductListContext
  );
  if (!context) throw new Error("ProductList context error!!");
  return context;
}
