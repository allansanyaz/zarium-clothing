import { useDispatch } from "react-redux";
import { ProductCardContainer, FooterContainer, NameContainer, PriceContainer } from './product-card.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { IProductItem } from "../../types/types";
import { addItem } from "../../store/cart/cart.slice";

const ProductCard = ({ product }: IProductItem) => {
	// deconstruct the product object
	const { name, price, imageUrl } = product;
	// load the dispatch method
	const dispatch = useDispatch();

	// add to cart handler
	const onAddToCartClick = () => {
		// add the item to the cart
		dispatch(addItem(product));
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
