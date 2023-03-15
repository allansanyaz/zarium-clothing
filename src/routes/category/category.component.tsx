import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { useParams } from 'react-router-dom'

import { ProductContainer } from "./category.styles";
import { initialiseCategories } from "../../store/categories/categories.slice";
import {categoriesSelector} from "../../store/categories/categories.selector";

import Spinner from "../../components/spinner/spinner.component";
import { AppDispatch } from "../../store/store";
import { ICategoryItem, IParams } from "../../types/types";

const Category = () => {
	// get the params from the browser URL
	const { category } = useParams<keyof IParams>() as IParams;
	// load the state from redux
	const { categories, isPending } = useSelector(categoriesSelector);
	// state for the categories
	const [products, setProducts] = useState<ICategoryItem[] | []>([]);
	// set up the dispatch
	const dispatch = useDispatch();

	// get initialise the fetch of the categories
	useEffect(() => {
		// run the result fetch from the redux slice
		// dispatch(getCategories());
		dispatch(initialiseCategories());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// set the products state to the products in the category when not pending
		if(!isPending) {
			// set the product from the category
			// let us try find the category
			const categoryProducts = categories[category];
			// set the products state
			setProducts(categoryProducts);
			// setProducts(categories[category]);
			// only run again when the below change
		}
	},[category, categories, isPending])

	return (
		<>
			<h2>{category}</h2>
			{
				(isPending) ? <Spinner /> :
					(
						<ProductContainer>
						{
							products && products.map((product: ICategoryItem) => (
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
