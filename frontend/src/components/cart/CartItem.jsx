import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import classes from "./CartItem.module.css";

import Delete from "../../assets/delete.svg";

export default function CartItem({
  name,
  quantity,
  price,
  img,
  onIncrease,
  onDecrease,
}) {
  console.log(img, name);
  return (
    <div className="cart">
      <li className={classes.itemContainer}>
        <div className={classes.cartItem}>
          <div>
            <div className={classes.product}>
              <div>
                <img src={`http://localhost:3000/${img}`} alt={name} />
              </div>
              <div>
                <p className={classes.productName}>{name}</p>
                <p className={classes.productPrice}>
                  {currencyFormatter.format(price)}
                </p>
                <p className={classes.productQty}>{quantity}x</p>
              </div>
            </div>
          </div>
          <div>
            <div className="number-1">
              <p className="product-price">
                {currencyFormatter.format(quantity * price)}
              </p>
            </div>
          </div>
        </div>
        <div className={classes.productAction}>
          <input
            className={classes.productNote}
            placeholder="Order Note..."
            type="text"
          />
          <button className={classes.productDelete} onClick={onDecrease}>
            <img src={Delete} alt="" />
          </button>
        </div>
      </li>
    </div>
  );
}
