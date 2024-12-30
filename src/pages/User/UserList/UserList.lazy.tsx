import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage";

const LazyUserList = lazy(() => import('./UserList'));
const UserList = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyUserList {...props} />
  </Suspense>
);

export default UserList;
