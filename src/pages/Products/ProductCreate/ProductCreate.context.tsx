import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ProductCreate {
  id: string;
}
export interface ProductCreateContextProps {
  ProductCreateConfig: ProductCreate | null;
  children: ReactElement;
}

export const ProductCreateContext = createContext<ProductCreate | null>(null);
export const ProductCreateContextProvider = (props: ProductCreateContextProps) => {
  const { ProductCreateConfig, children } = props;

  const [ProductCreate, setProductCreate] = useState<ProductCreate | null>(null);
  useEffect(() => {
    if (ProductCreateConfig !== null) {
      setProductCreate({
        id: ProductCreateConfig.id,
      });
    }
  }, [ProductCreateConfig]);

  return (
    <>
      <ProductCreateContext.Provider value={ProductCreate}>{children}</ProductCreateContext.Provider>
    </>
  );
};

export default function useProductCreateContext() {
  const context = useContext<ProductCreate | null>(
    ProductCreateContext
  );
  if (!context) throw new Error("ProductCreate context error!!");
  return context;
}
