import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage";

const LazyProductList = lazy(() => import('.'));
const ProductList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<LazyPage/>}>
    <LazyProductList {...props} />
  </Suspense>
);

export default ProductList;
