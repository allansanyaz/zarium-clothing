import { useNavigate } from "react-router-dom";
import { DirectoryContainer, BackgroundImage, DirectoryBodyContainer, DirectoryTitle, DirectorySubtitle } from './directory-item.styles';

interface IDirectoryProps {
	title: string;
	imageUrl: string;
}

const DirectoryItem = ({ title, imageUrl}: IDirectoryProps) => {
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
