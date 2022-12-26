import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './product-card.styles.scss'
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
	// deconstruct the product object
	const { name, price, imageUrl } = product;
	// extract the add to cart context
	const { addItemToCart } = useContext(CartContext);

	// add to cart handler
	const onAddToCartClick = () => {
		addItemToCart(product);
	}

	return (
		<div className={'product-card-container'}>
			<img src={imageUrl} srcSet={imageUrl} alt={name} />
			<div className={'footer'}>
				<span className={'name'}>{name}</span>
				<span className={'price'}>{price}</span>
			</div>
			<Button
				buttonType={'inverted'}
				onClick={onAddToCartClick}
			>
				Add to cart
			</Button>
		</div>
	)
}

export default ProductCard
