import { useContext, useState } from "react";

import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";

export default function useCart() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const tax = 0;
  const deliveryFee = 5;

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return {
    cartCtx,
    userProgressCtx,
    activeContentIndex,
    setActiveContentIndex,
    cartTotal,
    tax,
    deliveryFee,
    handleCloseCart,
    handleGoToCheckout,
  };
}
