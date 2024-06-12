import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";

export default function CartItem({
  name,
  quantity,
  price,
  img,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="cart">
      <li className="cart-item-1">
        <div>
          <div className="product">
            <div>
              <img src={img} alt={name} />
            </div>
            <p className="product-name">{name}</p>
          </div>
          <p className="product-price">{currencyFormatter.format(price)}</p>
          <Input placeholder="Order Note..." type="text" />
        </div>
        {/* <div className="btn"> */}
        <div>
          <div className="number-1">
            <p className="product-qty">{quantity}</p>
            <p className="product-price">{currencyFormatter.format(price)}</p>
          </div>
          {/* <div>
            <button className="product-qty" onClick={onIncrease}>
              +
            </button>
            <button className="product-qty" onClick={onDecrease}>
              -
            </button>
          </div> */}
        </div>
      </li>
    </div>
  );
}
