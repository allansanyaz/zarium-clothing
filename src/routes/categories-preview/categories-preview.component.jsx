import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {initialiseCategories} from "../../store/categories/categories.slice";
import { categoriesSelector } from "../../store/categories/categories.selector";

import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
	// get the product information from redux
	const { categories, isPending } = useSelector(categoriesSelector);

	// load the dispatch method
	const dispatch = useDispatch();

	// initialise the navigation hook
	const navigate = useNavigate();

	useEffect(() => {
		// load the categories
		// dispatch(getCategories());
		dispatch(initialiseCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onTitleClick = (category) => {
		navigate(`/categories/${category}`);
	}

	return (
		<>
			{
				(isPending) ? <Spinner /> : (
					Object.keys(categories).map((title, idx) => {
						return (
							<CategoryPreview
								key={idx}
								title={title}
								products={categories[title]}
								onTitleClick={onTitleClick}
							/>
						)
					})
				)
			}
		</>
	)
}

export default CategoriesPreview;
