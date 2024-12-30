import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../features/product/productsSlice"
import { usersApi } from "../features/user/usersSlice";
import { authApi } from "../features/auth/authApi";

import  authReducer  from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice";

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  cart: cartReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(usersApi.middleware)
      .concat(authApi.middleware)
    ,
    // preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);