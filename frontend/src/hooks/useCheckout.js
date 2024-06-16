import { useContext, useState } from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import useHttp from "./useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function useCheckout() {
  const [activePaymentMethod, setActivePaymentMethod] = useState();
  const [modalView, setModalView] = useState("checkout"); // 'checkout' or 'cardForm'
  const [customerData, setCustomerData] = useState(null);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleCardPayment() {
    setModalView("cardForm");
  }

  function handleQrCodePayment() {
    console.log("Navigating to QR Code Payment Form");
    userProgressCtx.showQrCodePaymentForm();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    setCustomerData(customerData);

    if (activePaymentMethod === 0) {
      sendRequest(
        JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        })
      );
    } else if (activePaymentMethod === 1) {
      handleCardPayment();
    } else if (activePaymentMethod === 2) {
      handleQrCodePayment();
    }
  }

  function handleCardDetailsSubmit(event) {
    event.preventDefault();
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  function handleGoToCheckout() {
    setModalView("checkout");
  }

  return {
    data,
    error,
    isSending,
    activePaymentMethod,
    setActivePaymentMethod,
    modalView,
    userProgressCtx,
    cartTotal,
    handleClose,
    handleFinish,
    handleSubmit,
    handleCardDetailsSubmit,
    handleGoToCheckout,
  };
}
