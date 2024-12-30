import React, { lazy, Suspense } from 'react';
import LazyPage from 'components/LazyPage';


const LazyProductCreate = lazy(() => import('./index'));
const ProductCreate = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyProductCreate {...props} />
  </Suspense>
);

export default ProductCreate;
