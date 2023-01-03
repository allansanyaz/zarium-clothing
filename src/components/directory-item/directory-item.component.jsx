import { useNavigate } from "react-router-dom";
import { DirectoryContainer, BackgroundImage, DirectoryBodyContainer, DirectoryTitle, DirectorySubtitle } from './directory-item.styles';

const DirectoryItem = ({ title, imageUrl }) => {
	// initialise the navigate item
	const navigate = useNavigate();

	const onTitleClick = (category) => {
		navigate(`/categories/${category}`);
	}

	return (
		<DirectoryContainer>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryBodyContainer
		        onClick={() => onTitleClick(title)}
			>
				<h2>{title}</h2>
				<p>Shop now</p>
			</DirectoryBodyContainer>
		</DirectoryContainer>
	)
}

export default DirectoryItem;
