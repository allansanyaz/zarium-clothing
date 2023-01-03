import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({ title, products, onTitleClick }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title onClick={() => onTitleClick(title)}>{title}</Title>
			</h2>
			<Preview>
				{
					products.filter((_, idx) => (idx < 4)).map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))
				}
			</Preview>
		</CategoryPreviewContainer>
	)
}

export default CategoryPreview;
