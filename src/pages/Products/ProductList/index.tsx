import React, { useEffect, useState } from "react";
import useProductsQuery from "../../../hooks/UseProductsQuery/UseProductsQuery";

// import styles from "./ProductList.module.scss";

import DinamicTable from "components/DinamicTable/DinamicTable";
import LazyPage from "components/LazyPage";


type TableItem = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const ProductList: React.FC = () => {
  const { useGetProductsQuery, useDeleteProductMutation } = useProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [productsList, setProductsList] = useState<TableItem[]>([]);

  const { data, isLoading,
    // isError, error
  } = useGetProductsQuery();
  useEffect(() => {
    if (data !== undefined) {
      const tableList = data.map((element)=>{
        return {
          id: element.id,
          name: element.title,
          category: element.category,
          price: element.price,
        } as TableItem;
      });
      setProductsList(tableList);
    }
  }, [data]);


  if (isLoading) {
    return <LazyPage />;
  }
  // return (<p>productsList: {JSON.stringify(productsList[0])}</p>);
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-5 mb-52 h-full">
          <DinamicTable
            rows={productsList}
            module="products"
            readItems={true}
            updateItems={true}
            deleteItemsCallback={(id: string | number) => {
              console.log(id)
              deleteProduct(id);
            }}
            itemsPerPage={5}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
