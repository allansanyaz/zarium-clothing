export interface IUser {
	uid: string;
	displayName: string;
	email: string;
	photoURL?: string;
	createAt?: string;
}

export type ICategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
}

export interface ICategoryItems {
	title: string;
	imageUrl: string;
	items: ICategoryItem[];
}

export interface ICategories {
	[category: string]: ICategoryItem;
}

export type IParams = {
	category: string;
}

export type CartClickHandler = {
	clickHandler: () => void;
}