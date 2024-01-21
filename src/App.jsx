import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/layout/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>

        <Cart />
        <Checkout />
        <Header />
        <Meals />

      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
