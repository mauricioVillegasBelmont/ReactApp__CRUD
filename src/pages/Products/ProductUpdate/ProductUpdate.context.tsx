import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductUpdate {
  id: string;
}
export interface ProductUpdateContextProps {
  ProductUpdateConfig: ProductUpdate | null;
  children: ReactElement;
}

export const ProductUpdateContext = createContext<ProductUpdate | null>(null);
export const ProductUpdateContextProvider = (props: ProductUpdateContextProps) => {
  const { ProductUpdateConfig, children } = props;

  const [ProductUpdate, setProductUpdate] = useState<ProductUpdate | null>(null);
  useEffect(() => {
    if (ProductUpdateConfig !== null) {
      setProductUpdate({
        id: ProductUpdateConfig.id,
      });
    }
  }, [ProductUpdateConfig]);

  return (
    <>
      <ProductUpdateContext.Provider value={ProductUpdate}>{children}</ProductUpdateContext.Provider>
    </>
  );
};

export default function useProductUpdateContext() {
  const context = useContext<ProductUpdate | null>(
    ProductUpdateContext
  );
  if (!context) throw new Error("ProductUpdate context error!!");
  return context;
}
