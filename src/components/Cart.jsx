import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

import Close from "../assets/close.svg";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      // className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <div className="cart-header">
        <h2>Your Cart</h2>
        <Button textOnly onClick={handleCloseCart}>
          <img src={Close} alt="" />
        </Button>
      </div>
      <div>
        <p className="btn-action">
          <button>Dine In</button>
          <button>To Go</button>
          <button>Deliver</button>
        </p>
      </div>
      <li className="cart-item">
        <p>Item</p>
        <div className="number">
          <p>QTY</p>
          <p>Price</p>
        </div>
      </li>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            img={item.img}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <div className="total">
        <p>Total</p>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      </div>
      <p className="modal-actions">
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
