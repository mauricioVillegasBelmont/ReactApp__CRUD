import { FC } from "react";
import styles from "./NavBar.module.scss";
import { Avatar, Badge, Button, Dropdown, Navbar } from 'flowbite-react';
import LogoutButton from "features/auth/components/LogoutButton/LogoutButton";

// import { BsCartFill } from "react-icons/bs";
import { MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";
import  UseCartQuery, { MutationCartItem }  from "features/cart/hooks/useCart";
import {CartItem}  from "features/cart/CartSlice"

interface NavBarProps {
  isAuth:boolean | null;
  isAdmin:boolean | null;
  user?:string | any
}

const NavBar: FC<NavBarProps> = (props:NavBarProps) =>{
  const { isAuth,
    // isAdmin,
    user='SomeUser' } = props;
  const {
    useCartQuery,
    UseAddToCartMutation,
    // UseClearCartMutation,
    UseRemoveFromCartMutation,
    // UseUpdateCartItemMutation,
  } = UseCartQuery();
  const { cartItems, amount, total } = useCartQuery;


  const editCartItemHandler = (item: CartItem, action:boolean) => {
    const element = {
      id: item.id,
      title: item.title,
      price: item.price,
    } as MutationCartItem;
    action ? UseAddToCartMutation(element) : UseRemoveFromCartMutation(element);
  };




  return (
    <>
      <Navbar fluid rounded className={`${styles.navBar} sticky top-0 z-50 mb-5`}>
        <Navbar.Brand href="/">
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="prro">
          <Navbar.Link href="/#/">Home</Navbar.Link>
          <Navbar.Link href="/#/products">Products</Navbar.Link>
          {!isAuth ? (
            <>
              <Navbar.Link href="/#/login">login</Navbar.Link>
              <Navbar.Link href="/#/admin">Admin</Navbar.Link>
            </>
          ) : null}
          {isAuth ? (
            <>
              <Dropdown
                arrowIcon={amount > 0}
                inline
                label={
                  // <BsCartFill />
                  "Dropdown button"
                }
              >
                <Dropdown.Header>
                  <div className="flex justify-between">
                    <span className="block text-sm">Cart</span>
                    <span className="block text-sm">${total.toFixed(2)}</span>
                  </div>
                </Dropdown.Header>
                {cartItems.length > 0 ? (
                  cartItems.map((cartItem) => (
                    <Dropdown.Header key={cartItem.id}>
                      <div className="grid grid-cols-3 gap-3 w-100">
                        <div className="col-span-2 flex grow">
                          <Badge className="mr-3">{cartItem.amount}</Badge>
                          <span>{cartItem.title}</span>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            size={"xs"}
                            color="info"
                            className="ml-3 my-auto"
                            pill
                            onClick={() => editCartItemHandler(cartItem, true)}
                          >
                            <MdOutlineAddCircleOutline />
                          </Button>
                          <Button
                            size={"xs"}
                            color="failure"
                            className="ml-3 my-auto"
                            pill
                            onClick={() => editCartItemHandler(cartItem, false)}
                          >
                            <MdOutlineRemoveCircleOutline />
                          </Button>
                        </div>
                      </div>
                    </Dropdown.Header>
                  ))
                ) : (
                  <Dropdown.Item>
                    <small>empty</small>
                  </Dropdown.Item>
                )}
              </Dropdown>
            </>
          ) : null}
          {isAuth ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user}</span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <LogoutButton />
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
