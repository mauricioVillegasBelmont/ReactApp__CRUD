import React, { lazy, Suspense } from 'react';
import LazyPage from "components/LazyPage/index";
const LazyUserEdit = lazy(() => import('./UserEdit'));

const UserEdit = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<LazyPage/>}>
    <LazyUserEdit {...props} />
  </Suspense>
);

export default UserEdit;
