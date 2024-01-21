/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
})

// "state" is bound by React
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const updatedItems = [...state.items];

            if (existingCartItemIndex === -1) {
                updatedItems.push({ ...action.item, quantity: 1 });

            } else {
                const existingItem = state.items[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1, // must use addition, and not "++"
                };
                updatedItems[existingCartItemIndex] = updatedItem;

                // updatedItems[existingCartItemIndex].quantity++; // this will not work in StrictMode, and also not recommended
            }

            return { ...state, items: updatedItems };
        }

        case 'REMOVE_ITEM': {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItems = [...state.items];

            if (existingCartItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);

            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1, // must use subtraction, and not "--"
                };
                updatedItems[existingCartItemIndex] = updatedItem;

                // updatedItems[existingCartItemIndex].quantity--; // this will not work in StrictMode, and also not recommended
            }

            return { ...state, items: updatedItems };
        }

        case 'CLEAR_CART': {
            return { ...state, items: [] };
        }

        default:
            return state;
    }
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const addItem = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }

    const removeItem = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    const clearCart = () => {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;