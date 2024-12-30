import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage";

const LazyUserCreate = lazy(() => import('./UserCreate'));
const UserCreate = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<LazyPage />}>
    <LazyUserCreate {...props} />
  </Suspense>
);

export default UserCreate;
