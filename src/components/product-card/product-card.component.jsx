import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ProductCardContainer, FooterContainer, NameContainer, PriceContainer, ProductButton } from './product-card.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
	// deconstruct the product object
	const { name, price, imageUrl } = product;
	// extract the add to cart context
	const { addItemToCart } = useContext(CartContext);

	// add to cart handler
	const onAddToCartClick = () => {
		// add the item to the cart
		addItemToCart(product);
	}

	return (
		<ProductCardContainer>
			<img src={imageUrl} srcSet={imageUrl} alt={name} />
			<FooterContainer>
				<NameContainer>{name}</NameContainer>
				<PriceContainer>{price}</PriceContainer>
			</FooterContainer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={onAddToCartClick}
			>
				Add to cart
			</Button>
		</ProductCardContainer>
	)
}

export default ProductCard
