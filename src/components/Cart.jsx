import { useContext } from "react";
import Modal from "./ui/modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, meal) => {
        return totalPrice + meal.price * meal.quantity;
    }, 0);

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    }

    const handleCheckout = () => {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((meal) => (
                    <CartItem
                        key={meal.id}
                        onInc={() => cartCtx.addItem(meal)}
                        onDec={() => cartCtx.removeItem(meal.id)}
                        {...meal}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleCheckout}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    )
}

export default Cart;