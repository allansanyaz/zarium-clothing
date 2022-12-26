import ProductCard from "../../components/product-card/product-card.component";
import { useContext } from 'react';
import { ProductContext } from "../../contexts/product.context";
import './shop.styles.scss'

const Shop = () => {
	// get the product information from the context
	const { products } = useContext(ProductContext);

	return (
		<div className={'products-container'}>
			{
				products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					>
					</ProductCard>
					)
				)
			}
		</div>
	)
}

export default Shop;
