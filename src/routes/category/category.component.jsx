import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categoriesContext";
import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from 'react-router-dom'

const Category = () => {
	// get the params from the browser URL
	const { category } = useParams();
	// load the context of the categories
	const { categoriesMap } = useContext(CategoriesContext);
	// state for the categories
	const [products, setProducts] = useState([])

	useEffect(() => {
		// set the product from the category
		setProducts(categoriesMap[category]);
		// only run again when the below change
	},[category, categoriesMap])

	return (
		<>
			<h2>{category}</h2>
			<div className={'products-container'}>
				{
					products && products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))
				}
			</div>
		</>
	)
}

export default Category;
