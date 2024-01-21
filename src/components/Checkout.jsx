import { useContext } from "react";
import Modal from "./ui/modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/Input";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, meal) => {
        return totalPrice + meal.price * meal.quantity;
    }, 0);

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData,
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button type="submit">Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>OK</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" required />
                <Input label="E-Mail Address" id="email" type="email" required />
                <Input label="Street" id="street" type="text" required />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" required />
                    <Input label="City" id="city" type="text" required />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}

export default Checkout;