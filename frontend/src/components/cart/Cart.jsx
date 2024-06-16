import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import CartItem from "./CartItem.jsx";
import classes from "./Cart.module.css";
import Close from "../../assets/close.svg";
import useCart from "../../hooks/useCart.js";
import { useActiveContent } from "../../store/ActiveContentText.jsx";

const content = [["Go to Check Out"], ["Go to Check Out"], ["Place Order"]];

export default function Cart() {
  const {
    cartCtx,
    userProgressCtx,
    cartTotal,
    tax,
    deliveryFee,
    handleCloseCart,
    handleGoToCheckout,
  } = useCart();
  const { activeContentIndex, setActiveContentIndex, orderTypes } =
    useActiveContent();

  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <div className={classes.cartHeader}>
        <div>
          <h2>Your Cart</h2>
          <span>Reyven V</span>
        </div>
        <Button textOnly onClick={handleCloseCart}>
          <img src={Close} alt="" />
        </Button>
      </div>
      {cartCtx.items.length > 0 ? (
        <div>
          <div id={classes.tabs}>
            <menu className={classes.menu}>
              {orderTypes.map((type, index) => (
                <button
                  key={type}
                  className={activeContentIndex === index ? classes.active : ""}
                  onClick={() => setActiveContentIndex(index)}
                >
                  {type}
                </button>
              ))}
            </menu>
          </div>
          <ul className={classes.cartItemContainer}>
            {cartCtx.items.map((item) => (
              <CartItem
                key={item.id}
                img={item.image}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onIncrease={() => cartCtx.addItem(item)}
                onDecrease={() => cartCtx.removeItem(item.id)}
              />
            ))}
          </ul>
          <div className={classes.cartTotal}>
            <div className={classes.compute}>
              <div>
                <p>Sub Total:</p>
                <p>Tax 0%:</p>
                {activeContentIndex === 2 ? <p>Delivery Fee:</p> : ""}
              </div>
              <div>
                <p>{currencyFormatter.format(cartTotal)}</p>
                <p>{currencyFormatter.format(tax)}</p>
                {activeContentIndex === 2 ? (
                  <p>{currencyFormatter.format(deliveryFee)}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={classes.total}>
              <p>Total Amount:</p>
              <p>
                {currencyFormatter.format(
                  cartTotal + tax + (activeContentIndex === 2 ? deliveryFee : 0)
                )}
              </p>
            </div>
          </div>
          <p className={classes.btn}>
            <Button onClick={handleGoToCheckout}>
              {content[activeContentIndex].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Button>
          </p>
        </div>
      ) : (
        <p className={classes.cartEmpty}>Nothing in the cart yet!</p>
      )}
    </Modal>
  );
}
