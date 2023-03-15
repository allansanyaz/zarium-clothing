import { useNavigate } from "react-router-dom";
import { DirectoryContainer, BackgroundImage, DirectoryBodyContainer, DirectoryTitle, DirectorySubtitle } from './directory-item.styles';
import { ICategoryItems } from "../../types/types";

const DirectoryItem = ({ title, imageUrl }: ICategoryItems) => {
	// initialise the navigate item
	const navigate = useNavigate();

	const onTitleClick = (category: string) => {
		navigate(`/categories/${category}`);
	}

	return (
		<DirectoryContainer>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryBodyContainer
		        onClick={() => onTitleClick(title)}
			>
				<DirectoryTitle>{title}</DirectoryTitle>
				<DirectorySubtitle>Shop now</DirectorySubtitle>
			</DirectoryBodyContainer>
		</DirectoryContainer>
	)
}

export default DirectoryItem;
