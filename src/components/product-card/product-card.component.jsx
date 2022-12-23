import './product-card.styles.scss'
import Button from '../button/button.component';

const ProductCard = ({ name, imageUrl, price }) => {
	return (
		<div className={'product-card-container'}>
			<img src={imageUrl} srcSet={imageUrl} alt={name} />
			<div className={'footer'}>
				<span className={'name'}>{name}</span>
				<span className={'price'}>{price}</span>
			</div>
			<Button buttonType={'inverted'}>Add to cart</Button>
		</div>
	)
}

export default ProductCard
