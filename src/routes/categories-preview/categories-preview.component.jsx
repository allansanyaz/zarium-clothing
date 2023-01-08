import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { getCategories } from "../../store/categories/categories.slice";

const CategoriesPreview = () => {
	// get the product information from redux
	const { categories, isPending } = useSelector(state => state.categories);

	// load the dispatch method
	const dispatch = useDispatch();

	// initialise the navigation hook
	const navigate = useNavigate();

	useEffect(() => {
		// load the categories
		dispatch(getCategories());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onTitleClick = (category) => {
		navigate(`/categories/${category}`);
	}

	return (
		<>
			{
				(isPending) ? (<h2>Loading...</h2>) : (
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
