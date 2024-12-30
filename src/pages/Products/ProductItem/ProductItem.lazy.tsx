import React, { lazy, Suspense } from 'react';
import LazyPage from 'components/LazyPage';

const LazyProductItem = lazy(() => import("./ProductItem"));
const ProductItem = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyProductItem {...props} />
  </Suspense>
);

export default ProductItem;
