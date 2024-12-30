
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useGetCategoriesQuery,
} from "features/product/productsSlice";

const useProductsQuery = () => {
  return {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
  };
};

export default useProductsQuery;
