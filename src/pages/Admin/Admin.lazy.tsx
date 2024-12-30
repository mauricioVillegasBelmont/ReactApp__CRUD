import React, { lazy, Suspense } from "react";


const LazyAdmin = lazy(() => import("./Admin"));
const Admin = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyAdmin {...props} />
  </Suspense>
);

export default Admin;
