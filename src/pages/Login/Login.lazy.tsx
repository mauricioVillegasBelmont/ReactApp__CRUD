import React, { lazy, Suspense } from 'react';
import LazyPage from 'components/LazyPage';

const LazyLogin = lazy(() => import('./Login'));

const Login = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<LazyPage />}>
    <LazyLogin {...props} />
  </Suspense>
);

export default Login;
