import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage/";

const LazyProductUpdate = lazy(() => import('./ProductUpdate'));
const ProductUpdate = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<LazyPage />}>
    <LazyProductUpdate {...props} />
  </Suspense>
);

export default ProductUpdate;
