// // Checkout.jsx
import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import Error from "../Error.jsx";
import classes from "../Checkout/Checkout.module.css";
import Close from "../../assets/close.svg";
import Money from "../../assets/money.svg";
import Card from "../../assets/card.svg";
import QrCode from "../../assets/qr-code.svg";
import Success from "../../assets/success.svg";
import useCheckout from "../../hooks/useCheckout.js";
import useCart from "../../hooks/useCart.js";
import { useActiveContent } from "../../store/ActiveContentText.jsx";

export default function Checkout() {
  const {
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
  } = useCheckout();

  const { activeContentIndex, orderTypes } = useActiveContent();
  const { deliveryFee, tax } = useCart();

  let actions = <Button type="submit">Submit Order</Button>;

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <div className={classes.successContainer}>
          <div className={classes.successHeader}>
            <img src={Success} alt="" />
            <h2>Order Success!</h2>
            <p>
              {currencyFormatter.format(
                cartTotal + tax + (activeContentIndex === 2 ? deliveryFee : 0)
              )}
            </p>
          </div>
          <div className={classes.successContent}>
            <p>Your order was submitted successfully.</p>
            <p>
              We will get back to you with more details via email within the
              next few minutes.
            </p>
            <p className="modal-actions">
              <Button onClick={handleFinish}>Okay</Button>
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      {modalView === "cardForm" ? (
        <div>
          <div className={classes.checkoutClose}>
            <Button type="button" textOnly onClick={handleClose}>
              <img src={Close} alt="Close" />
            </Button>
          </div>
          <div className={classes.formContainer}>
            <div>
              <form onSubmit={handleCardDetailsSubmit}>
                <h2 className={classes.checkoutTitle}>Card Payment</h2>
                <Input
                  label="Name On Card"
                  type="text"
                  placeholder="Reyven Villaester"
                  id="cardName"
                />
                <Input
                  label="Card Number"
                  type="number"
                  placeholder="0000 0000 0000 0000"
                  id="cardNumber"
                />
                <div className="control-row">
                  <Input
                    label="Expiry Date"
                    type="text"
                    placeholder="MM / YY"
                    id="expiryDate"
                  />
                  <Input label="CVV" placeholder="***" type="text" id="cvv" />
                </div>
                <Button type="submit">
                  Pay
                  {currencyFormatter.format(
                    cartTotal +
                      tax +
                      (activeContentIndex === 2 ? deliveryFee : 0)
                  )}
                </Button>
                <div className={classes.orContainer}>
                  <div className={classes.line}></div>
                  <p className={classes.or}>Or</p>
                  <div className={classes.line}></div>
                </div>
              </form>
              <button
                className={classes.cancel}
                type="button"
                onClick={handleGoToCheckout}
              >
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.checkoutClose}>
            <Button type="button" textOnly onClick={handleClose}>
              <img src={Close} alt="Close" />
            </Button>
          </div>
          <div className={classes.formContainer}>
            <div>
              <form onSubmit={handleSubmit}>
                <h2 className={classes.checkoutTitle}>Checkout Details</h2>
                <Input
                  label="Full Name"
                  placeholder="Reyven Villaester"
                  type="text"
                  id="name"
                />
                <Input
                  label="Email Address"
                  placeholder="reyvenvillaester26@gmail.com"
                  type="email"
                  id="email"
                />
                <Input
                  label="Street"
                  type="text"
                  placeholder="Aiandi 5/1-17"
                  id="street"
                />
                <div className="control-row">
                  <Input
                    label="Postal Code"
                    type="text"
                    placeholder="12916"
                    id="postal-code"
                  />
                  <Input
                    label="City"
                    placeholder="Tallinn"
                    type="text"
                    id="city"
                  />
                </div>
                <div className={classes.orderType}>
                  {/* <p>Order Type</p> */}
                  {/* <p>{orderTypes[activeContentIndex]}</p> */}
                </div>
                <div className={classes.checkoutTotal}>
                  <div className={classes.checkoutCompute}>
                    <div>
                      <p>Order Type</p>
                      <p>Sub Total:</p>
                      <p>Tax 0%:</p>
                      {activeContentIndex === 2 ? <p>Delivery Fee:</p> : ""}
                    </div>
                    <div>
                      <p>{orderTypes[activeContentIndex]}</p>
                      <p>{currencyFormatter.format(cartTotal)}</p>
                      <p>{currencyFormatter.format(0)}</p>
                      {activeContentIndex === 2 ? (
                        <p>{currencyFormatter.format(deliveryFee)}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={classes.overAllTotal}>
                    <p>Total Amount:</p>
                    <p>
                      {currencyFormatter.format(
                        cartTotal +
                          tax +
                          (activeContentIndex === 2 ? deliveryFee : 0)
                      )}
                    </p>
                  </div>
                </div>
                <div className={classes.paymentMethod}>
                  <menu>
                    <p>
                      <button
                        type="button"
                        className={
                          activePaymentMethod === 0 ? classes.active : ""
                        }
                        onClick={() => setActivePaymentMethod(0)}
                      >
                        <img src={Money} alt="Cash" />
                      </button>
                      <span>Cash</span>
                    </p>
                    <p>
                      <button
                        type="button"
                        className={
                          activePaymentMethod === 1 ? classes.active : ""
                        }
                        onClick={() => setActivePaymentMethod(1)}
                      >
                        <img src={Card} alt="Card" />
                      </button>
                      <span>Credit/Debit Card</span>
                    </p>
                    <p>
                      <button
                        type="button"
                        className={
                          activePaymentMethod === 2 ? classes.active : ""
                        }
                        onClick={() => setActivePaymentMethod(2)}
                      >
                        <img src={QrCode} alt="QR Code" />
                      </button>
                      <span>QR Code</span>
                    </p>
                  </menu>
                </div>
                {error && (
                  <Error title="Failed to submit order" message={error} />
                )}
                <p className="modal-actions">{actions}</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
