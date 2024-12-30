import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage/";

const LazyUserItem = lazy(() => import('./UserItem'));
const UserItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<LazyPage/>}>
    <LazyUserItem {...props} />
  </Suspense>
);

export default UserItem;
