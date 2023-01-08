import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
	// set up the navigation
	const navigate = useNavigate();
	// get the cart items from redux
	const { cartItems } = useSelector(state => state.cart);

	const onCheckoutClick = () => {
		// navigate to the checkout page
		navigate('/checkout');
	}

	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{
					(cartItems.length) ? (cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)) 
                    : 
                    (<EmptyMessage>Your cart is empty</EmptyMessage>)
				}
			</CartItemsContainer>
				<Button
					style={{fontSize: '12px'}}
					onClick={onCheckoutClick}
				>
					GO TO CHECKOUT
				</Button>
		</CartDropdownContainer>
	)
};

export default CartDropdown;
