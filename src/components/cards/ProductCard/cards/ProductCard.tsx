import { FC } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Rating, } from 'flowbite-react';
import styles from "./ProductCard.module.scss";

import { HiCheck, HiUser,HiStar } from "react-icons/hi";
import { BsCartFill, BsCartPlusFill, BsCartXFill } from "react-icons/bs";

import UseCartQuery from "features/cart/hooks/useCart";
import type { MutationCartItem } from "features/cart/hooks/useCart";
import { useAuth } from "features/auth/hooks/useAuth";




export interface productRating {
  rate: number;
  count: number;
}

export interface CardsProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: productRating;
}

const CardsProductCard: FC<CardsProductCardProps> = (props:CardsProductCardProps) =>{
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
  } = props;

  const auth = useAuth();

  const {
    useCartQuery,
    UseAddToCartMutation,
    UseClearItemFromCartMutation,
  } = UseCartQuery();
  const { cartItems, } = useCartQuery;
  const currentItem = cartItems.filter((item) => item.id === id);


  // clearCart
  const addItemHandler = ()=>{
    const element = {
      id: id,
      title: title,
      price: price,
    } as MutationCartItem;
    UseAddToCartMutation(element);
  }

  const removeElementHandler = ()=>{
    const element = {
      id: id,
      title: title,
      price: price,
    } as MutationCartItem;
    UseClearItemFromCartMutation(element);
  }


  const round_rate = Math.round(rating.rate);

  return (
    <>
      <Card
        className={`${styles.cards__productCard} max-w-sm mx-auto relative test-class`}
        imgAlt={title}
        imgSrc={image}
      >
        <div className="flex items-center justify-end absolute top-0 left-0 p-3">
          {currentItem.length ? (
            <>
              <Badge
                color="info"
                onClick={removeElementHandler}
                className="flex"
              >
                <div className="flex">
                  <BsCartFill className="h-5 w-5 mr-3" />{" "}
                  <span>{currentItem[0].amount}</span>
                </div>
              </Badge>
            </>
          ) : null}
        </div>

        <Link to={`/products/${id}`}>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
        </Link>

        <Badge icon={HiCheck} className="py-2 px-5 my-3 mr-auto">
          {category}
        </Badge>
        <p>{description}</p>
        <div className="mb-5 mt-2.5 flex items-center">
          <Rating className="mb-2">
            <Rating.Star filled={round_rate >= 1} />
            <Rating.Star filled={round_rate >= 2} />
            <Rating.Star filled={round_rate >= 3} />
            <Rating.Star filled={round_rate >= 4} />
            <Rating.Star filled={round_rate >= 5} />
            <Badge icon={HiStar} className="inline-flex py-1 px-3   mx-3 my-6 ">
              {rating.rate}
            </Badge>
            <Badge
              icon={HiUser}
              className="inline-flex py-1 px-3   mx-3 my-6 "
              color="gray"
            >
              {rating.count}
            </Badge>
          </Rating>
        </div>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white mr-auto">
            ${price.toFixed(2)}
          </span>
          <Button as={Link} to={`/products/${id}`} className="" outline>
            ver detalles
          </Button>
        </div>
        {auth.user !== null ? (
          <>
            <div className="flex items-center justify-end">
              {cartItems.some((item) => item.id === id) ? (
                <>
                  <Button color="failure" onClick={removeElementHandler}>
                    Remove from Cart <BsCartXFill className="h-5 w-5 ml-3" />
                  </Button>
                </>
              ) : (
                <>
                  <Button color="blue" onClick={addItemHandler}>
                    Add to Cart <BsCartPlusFill className="h-5 w-5 ml-3" />
                  </Button>
                </>
              )}
            </div>
          </>
        ) : null}
      </Card>
    </>
  );
}

export default CardsProductCard;
