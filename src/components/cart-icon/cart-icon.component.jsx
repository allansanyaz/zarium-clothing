import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.component.scss';

const CartIcon = ({ clickHandler }) => {

	const { totalCartItems } = useContext(CartContext);

	return (
		<div className={'cart-icon-container'}
			onClick={clickHandler}
		>
			<ShoppingIcon className="shopping-icon" />
			<span className={'item-count'}>{totalCartItems}</span>
		</div>
	)
}

export default CartIcon;
