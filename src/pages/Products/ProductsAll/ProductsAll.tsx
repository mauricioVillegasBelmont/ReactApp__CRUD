import React, { useEffect, useState } from "react";
// import { useProductsAllHooks } from "./ProductsAll.hooks";
import styles from "./ProductsAll.module.scss";
import CardsProductCard from "components/cards/ProductCard/cards/ProductCard";
import useProductsQuery from "../../../hooks/UseProductsQuery/UseProductsQuery";
import { Pagination, Spinner } from "flowbite-react";
import { IProduct } from "../../../features/product/interface";






const ProductsAll: React.FC = () => {
  const { useGetProductsQuery } = useProductsQuery();
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const {
    data,
    isLoading,
    // isError,
    // error,
  } = useGetProductsQuery();
  useEffect(() => {
    if (data !== undefined) {
      setTotalPages(Math.ceil(Object.keys(data).length / itemsPerPage));
      setProductsList(data);
    }
  }, [data]);
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  };


  if (isLoading){
    return <Spinner />;
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-52">
          {productsList
            .filter(
              (element: IProduct, index: number) =>
                index < currentPage * itemsPerPage &&
                index >= (currentPage - 1) * itemsPerPage
            )
            .map((element: IProduct) => (
              <CardsProductCard
                key={element.id}
                id={element.id}
                title={element.title}
                price={element.price}
                description={element.description}
                category={element.category}
                image={element.image}
                rating={element.rating}
              />
              // <div key={element.id} className="flex justify-center">
              // </div>
            ))}
        </div>
      </div>
      <div
        className={`${styles.productsAll__paginator_footer} fixed w-full left-0 bottom-0	flex overflow-x-auto sm:justify-center bg-white py-5 z-50`}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default ProductsAll;