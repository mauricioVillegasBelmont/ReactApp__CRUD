
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

import type { MutationCartItem, MutationUpdateCartItem } from "./hooks/useCart";



export type CartItem = {
  id: number | string;
  title: string;
  price: number;
  amount: number;
  subtotal: number;
};

export type CartState = {
  cartItems: CartItem[];
  amount: number;
  total: number;
};

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

function updateCartStateObject(cartState: CartItem[]) {
  var total = 0;
  var amount = 0;

  const items = cartState.filter((element) => element.amount > 0);
  const cartItems = items.map((element) => {
    element.subtotal = element.amount * element.price;
    amount += element.amount;
    total += element.subtotal;
    return element;
  });

  return {
    cartItems,
    total,
    amount,
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState as CartState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    addToCart: (state, action) => {
      const item = action.payload as MutationCartItem;
      const itemList = state.cartItems;
      const index = itemList.findIndex((element) => element.id === item.id);

      if (index < 0) {
        itemList.push({
          ...item,
          amount: 1,
          subtotal: 0,
        });
      } else {
        itemList[index].amount += 1;
      }
      const newState = updateCartStateObject(itemList);
      state.cartItems = newState.cartItems;
      state.amount = newState.amount;
      state.total = newState.total;
    },

    removeFromCart: (state, action) => {
      const item = action.payload as MutationCartItem;
      const itemList = state.cartItems;
      const index = itemList.findIndex((element) => element.id === item.id);

      if (index < 0) return;
      itemList[index].amount -= 1;

      const newState = updateCartStateObject(itemList);
      state.cartItems = newState.cartItems;
      state.amount = newState.amount;
      state.total = newState.total;
    },
    clearItemFromCart: (state, action) => {
      const item = action.payload as MutationCartItem;
      const itemList = state.cartItems;
      const index = itemList.findIndex((element) => element.id === item.id);
      if (index < 0) return;
      itemList[index].amount = 0;
      const newState = updateCartStateObject(itemList);
      state.cartItems = newState.cartItems;
      state.amount = newState.amount;
      state.total = newState.total;
    },
    updateCartItemAmount: (state, action) => {
      const item = action.payload as MutationUpdateCartItem;
      const itemList = state.cartItems;
      const index = itemList.findIndex((element) => element.id === item.id);
      if (index < 0) return;
      const elemnt = itemList[index];
      const amount = Number(item.amount);

      itemList[index] = {
        ...elemnt,
        amount,
      };

      const newState = updateCartStateObject(itemList);
      state.cartItems = newState.cartItems;
      state.amount = newState.amount;
      state.total = newState.total;
    },
  },
});

export const {
  clearCart,
  addToCart,
  updateCartItemAmount,
  removeFromCart,
  clearItemFromCart,
} = cartSlice.actions;


export default cartSlice.reducer;

export const selectCurrentCart = (state: RootState) => state.cart;
