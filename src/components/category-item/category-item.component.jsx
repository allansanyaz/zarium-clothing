import { useNavigate } from "react-router-dom";
import './category-item.styles.scss';

const CategoryItem = ({ title, imageUrl }) => {
	// initialise the navigate item
	const navigate = useNavigate();

	const onTitleClick = (category) => {
		navigate(`/categories/${category}`);
	}

	return (
		<div className={"category-container"}>
			<div className={"background-image"} style={{
				backgroundImage: `url(${imageUrl})`
			}} />
			<div
				className={"category-body-container"}
		        onClick={() => onTitleClick(title)}
			>
				<h2>{title}</h2>
				<p>Shop now</p>
			</div>
		</div>
	)
}

export default CategoryItem;
