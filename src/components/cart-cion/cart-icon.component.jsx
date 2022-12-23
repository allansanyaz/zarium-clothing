import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.component.scss';

const CartIcon = ({ clickHandler }) => {
	return (
		<div className={'cart-icon-container'}
			onClick={clickHandler}
		>
			<ShoppingIcon className="shopping-icon" />
			<span className={'item-count'}>0</span>
		</div>
	)
}

export default CartIcon;
