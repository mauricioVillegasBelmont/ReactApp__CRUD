import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useProductItemHooks } from "./ProductItem.hooks";
import styles from "./ProductItem.module.scss";
import { useParams } from "react-router-dom";
import useProductsQuery from "../../../hooks/UseProductsQuery/UseProductsQuery";
import { Button, Rating, Spinner, TextInput } from 'flowbite-react';
import { Badge } from "flowbite-react";

import { HiCheck, HiUser,HiStar } from "react-icons/hi";
import { BsCartPlusFill, BsCartXFill } from "react-icons/bs";

import UseCartQuery, { MutationCartItem, MutationUpdateCartItem } from "features/cart/hooks/useCart";
import { CartItem } from "features/cart/CartSlice";
import { useAuth } from "features/auth/hooks/useAuth";


const ProductItem: React.FC = () => {
  const { useGetProductQuery } = useProductsQuery();
  const { id } = useParams();
  const auth = useAuth();
  const [inCartAmount, setInCartAmount] = useState(0);
  const {
    data: productItem,
    isLoading,
    // isError,
    // error,
  } = useGetProductQuery(id as string);

  useEffect(() => {
    if(!productItem) return;
  }, [productItem]);


  const {
    useCartQuery,
    UseAddToCartMutation,
    // UseClearCartMutation,
    UseUpdateCartItemAmountMutation,
    UseClearItemFromCartMutation,
  } = UseCartQuery();
  const {
    getCartItemById,
    cartItems,
    // amount,
    // total
   } = useCartQuery;

  const useCatItem = getCartItemById(Number(id));
  useEffect(() => {
    if (useCatItem) setInCartAmount(useCatItem?.amount);
  }, [useCatItem, cartItems]);


  const removeCartItemHandler = (item: CartItem) => {
    const element = {
      id: item.id,
      title: item.title,
      price: item.price,
    } as MutationCartItem;

    UseClearItemFromCartMutation(element);
  };

  const addCartItemHandler =()=>{
    const element = {
      id: Number(id),
      title: productItem.title,
      price: productItem.price,
    } as MutationCartItem;
    UseAddToCartMutation(element);
  };

  const numberInputHandler = (event:any)=>{
    const element = {
      id: Number(id),
      amount: event.target.value as number,
    } as MutationUpdateCartItem;
    UseUpdateCartItemAmountMutation(element);
  };

  if (isLoading) {
    return <Spinner />;
  }
  const round_rate = Math.round(productItem.rating.rate);
  return (
    <>
      <div className={`${styles.ProductItem} container mx-auto`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 my-auto">
          <div className="px-5">
            <img src={productItem.image} alt={productItem.title} />
          </div>
          <div className="lg:col-span-2">
            <h1 className={`${styles.productItem__heading} mb-6`}>
              {productItem.title}
            </h1>
            <Badge icon={HiCheck} className="inline-flex py-2 px-5 my-6">
              {productItem.category}
            </Badge>
            <p>{productItem.description}</p>

            <div className="mb-5 mt-2.5 flex items-center">
              <Rating className="mb-2">
                <Rating.Star filled={round_rate >= 1} />
                <Rating.Star filled={round_rate >= 2} />
                <Rating.Star filled={round_rate >= 3} />
                <Rating.Star filled={round_rate >= 4} />
                <Rating.Star filled={round_rate >= 5} />
                <Badge
                  icon={HiStar}
                  className="inline-flex py-1 px-3   mx-3 my-6 "
                >
                  {productItem.rating.rate}
                </Badge>
                <Badge
                  icon={HiUser}
                  className="inline-flex py-1 px-3   mx-3 my-6 "
                  color="gray"
                >
                  {productItem.rating.count}
                </Badge>
              </Rating>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${productItem.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-end">
            {auth.user !== null ? (
              <>
                  {useCatItem ? (
                    <>
                      <TextInput
                        type="number"
                        value={inCartAmount}
                        min={1}
                        onChange={numberInputHandler}
                        className="mx-3"
                      />
                      <Button
                        color="failure"
                        onClick={() => removeCartItemHandler(useCatItem)}
                      >
                        Remove from Cart{" "}
                        <BsCartXFill className="h-5 w-5 ml-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button color="blue" onClick={() => addCartItemHandler()}>
                        Add to Cart <BsCartPlusFill className="h-5 w-5 ml-3" />
                      </Button>
                    </>
                  )}
              </>
            ) : (
              <>
                <Button as={Link} to={`/login`} color="blue" className="inline-flex ml-auto">
                  login to buy
                </Button>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;