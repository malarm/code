import { OrderType } from "./order";

export type CountryItem = {
	label: string;
}

export type CustomerType = {
	id : number,
	firstName: string;
	lastName: string;
	address1: string;
	address2: string;
	email: string;
	mobile: string;
	city: string;
	zipCode: string;
	country: string;
	countryCode: number;
	orders?: Array<OrderType>;
}
