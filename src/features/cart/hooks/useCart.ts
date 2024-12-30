import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  clearItemFromCart,
  updateCartItemAmount,
  selectCurrentCart,
} from "features/cart/CartSlice";
import type { CartItem } from "features/cart/CartSlice";

export type MutationCartItem = Omit<CartItem, "amount" | "subtotal">;
export type MutationUpdateCartItem = Omit<CartItem, 'subtotal' | 'price' | 'title'>

const UseCartQuery = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCurrentCart);
  const useCartQuery = useMemo(() => {
    return {
      getCartItemById:(id:string|number)=>{
        return cart.cartItems.find((item)=> item.id === id)
      },
      cartItems: cart.cartItems,
      amount: cart.amount,
      total: cart.total,
    };
  }, [cart]);

  const UseAddToCartMutation = (item: MutationCartItem) => {
    dispatch(addToCart(item));
  };
  const UseClearCartMutation = () => {
    dispatch(clearCart());
  };
  const UseRemoveFromCartMutation = (item: MutationCartItem) => {
    dispatch(removeFromCart(item));
  };
  const UseUpdateCartItemAmountMutation = (item: MutationUpdateCartItem) => {
    dispatch(updateCartItemAmount(item));
  };
  const UseClearItemFromCartMutation = (item: MutationCartItem) => {
    dispatch(clearItemFromCart(item));
  };

  return {
    useCartQuery,
    UseAddToCartMutation,
    UseClearCartMutation,
    UseRemoveFromCartMutation,
    UseUpdateCartItemAmountMutation,
    UseClearItemFromCartMutation,
  };
};

export default UseCartQuery;