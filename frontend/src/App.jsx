import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { ActiveContentProvider } from "./store/ActiveContentText.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <ActiveContentProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </ActiveContentProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
