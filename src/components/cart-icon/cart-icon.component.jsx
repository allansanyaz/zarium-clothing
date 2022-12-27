import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = ({ clickHandler }) => {

	const { totalCartItems } = useContext(CartContext);

	return (
		<CartIconContainer
			onClick={clickHandler}
		>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount>{totalCartItems}</ItemCount>
		</CartIconContainer>
	)
}

export default CartIcon;
