import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
	// get the cart items from the context
	const { cartItems } = useContext(CartContext);

	return (
		<div className={'cart-dropdown-container'} style={{fontSize: '10px'}}>
			<div className={'cart-items'} >
				{
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				}
			</div>
				<Button style={{fontSize: '12px'}}>GO TO CHECKOUT</Button>
		</div>
	)
};

export default CartDropdown;
