import React, { lazy, Suspense } from 'react';
import LazyPage from 'components/LazyPage';



const LazyNotFound = lazy(() => import('./NotFound'));
const NotFound = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyNotFound {...props} />
  </Suspense>
);

export default NotFound;
