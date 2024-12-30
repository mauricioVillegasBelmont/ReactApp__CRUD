import React, { lazy, Suspense } from 'react';
import LazyPage from 'components/LazyPage';

const LazyProductsAll = lazy(() => import('./ProductsAll'));

const ProductsAll = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyProductsAll {...props} />
  </Suspense>
);

export default ProductsAll;
