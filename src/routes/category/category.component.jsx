import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from 'react-router-dom'

import { ProductContainer } from "./category.styles";
import { getCategories } from "../../store/categories/categories.slice";

const Category = () => {
	// get the params from the browser URL
	const { category } = useParams();
	// load the state from redux
	const { categories, isPending } = useSelector(state => state.categories);
	// state for the categories
	const [products, setProducts] = useState([])
	// set up the dispatch
	const dispatch = useDispatch();

	// get initialise the fetch of the categories
	useEffect(() => {
		// run the result fetch from the redux slice
		dispatch(getCategories());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// set the products state to the products in the category when not pending
		if(!isPending) {
			// set the product from the category
			setProducts(categories[category]);
			// only run again when the below change
		}
	},[category, categories, isPending])

	return (
		<>
			<h2>{category}</h2>
			{
				(isPending) ? <h2>Loading...</h2> :
					(
						<ProductContainer>
						{
							products && products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))
						}
						</ProductContainer>
					)
			}
		</>
	)
}

export default Category;
