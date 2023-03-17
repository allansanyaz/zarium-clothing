export interface IUser {
	uid: string;
	displayName: string;
	email: string;
	photoURL?: string;
	createAt?: string;
}
export interface AdditionalInformation {
	displayName?: string;
}
export type ICategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
}

export interface ICartItem {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
}

export interface ICategoryItems {
	title: string;
	imageUrl: string;
	items: ICategoryItem[];
}

export interface ICategories {
	[category: string]: ICategoryItem[];
}

export interface IProductItem {
	product: ICategoryItem;
}

export type IParams = {
	category: string;
}

export type CartClickHandler = {
	clickHandler: () => void;
}