
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
// const location = useLocation();

import PublicOutlet from "router/PublicOutlet";
import PrivateOutlet from "router/ProtectedOutlet";
import AdminOutlet from "router/AdminOutlet";



import Landing from "../pages/Landing/Landing.lazy";
import Login from "../pages/Login/Login.lazy";
import Admin from "../pages/Admin/Admin.lazy";

import Cart from "../pages/Cart/Cart.lazy";

import ProductsAll from "../pages/Products/ProductsAll/ProductsAll.lazy";
import ProductItem from "../pages/Products/ProductItem/ProductItem.lazy";
import ProductList from "../pages/Products/ProductList/ProductList.lazy";
import ProductCreate from "../pages/Products/ProductCreate/ProductCreate.lazy";
import ProductUpdate from "../pages/Products/ProductUpdate/ProductUpdate.lazy";


import UserItem from "../pages/User/UserItem/UserItem.lazy";
import UserCreate from "../pages/User/UserEdit/UserEdit.lazy";
import UserEdit from "../pages/User/UserEdit/UserEdit.lazy";
import UserList from "../pages/User/UserList/UserList.lazy";

import NotFound from "../pages/NotFound/NotFound.lazy";


const router = createHashRouter([
  {
    path: "",
    element: <PublicOutlet />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "products",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <ProductsAll />,
          },
          {
            path: ":id",
            element: <ProductItem />,
          },
        ],
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to="/not-found" />,
      },
    ],
  },
  {
    path: "cart",
    element: <PrivateOutlet />,
    children: [
      {
        path: "",
        element: <Cart />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminOutlet />,
    children: [
      {
        path: "products",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <ProductList />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: ":id",
            element: <ProductItem />,
          },
          {
            path: "update/:id",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserCreate />,
          },
          {
            path: ":id",
            element: <UserItem />,
          },
          {
            path: "update/:id",
            element: <UserEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
