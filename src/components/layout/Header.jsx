import { useContext } from 'react';
import logoImg from '../../assets/logo.jpg'
import Button from '../ui/Button';
import CartContext from '../../store/CartContext';
import UserProgressContext from '../../store/UserProgressContext';

const Header = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, meal) => {
        return totalNumberOfItems + meal.quantity
    }, 0);

    const handleShowCart = () => {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>React Food</h1>
            </div>
            <nav>
                <Button
                    textOnly // react will automatically set "textOnly=true"
                    id="test"
                    onClick={handleShowCart}
                >
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}

export default Header;