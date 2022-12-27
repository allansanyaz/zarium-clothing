import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categoriesContext";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import './categories-preview.styles.scss'

const CategoriesPreview = () => {
	// get the product information from the context
	const { categoriesMap } = useContext(CategoriesContext);

	// initialise the navigation hook
	const navigate = useNavigate();

	const onTitleClick = (category) => {
		navigate(`/categories/${category}`);
	}

	return (
		<div className={'categories-preview-container'}>
			{
				Object.keys(categoriesMap).map((title, idx) => {
					return (
						<CategoryPreview
							key={idx}
							title={title}
							products={categoriesMap[title]}
							onTitleClick={onTitleClick}
						/>
					)
				})
			}
		</div>
	)
}

export default CategoriesPreview;
