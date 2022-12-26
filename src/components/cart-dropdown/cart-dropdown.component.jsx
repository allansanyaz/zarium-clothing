import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
	// set up the navigation
	const navigate = useNavigate();
	// get the cart items from the context
	const { cartItems } = useContext(CartContext);

	const onCheckoutClick = () => {
		// navigate to the checkout page
		navigate('/checkout');
	}

	return (
		<div className={'cart-dropdown-container'}>
			<div className={'cart-items'} >
				{
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				}
			</div>
				<Button
					style={{fontSize: '12px'}}
					onClick={onCheckoutClick}
				>
					GO TO CHECKOUT
				</Button>
		</div>
	)
};

export default CartDropdown;
