import { CustomerType } from "./customer";
import { WarrantyProductErrorType } from "./warrantyProductError";
import { ProductType } from "./product";

export type errosType = {
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
	address1: string;
	city: string;
	zipCode: string;
	deliveryPayment: string;
	deliveryMethod: string;
	deliveryCost: string;
	country?: number | null;
}

export type createOrderProductsType = {
	qty: string;
	productId: string;
	variantId: string;
	itemNumber: string;
	title: string;
	buyPrice?: string;
	discount?: string;
	price?: string;
	total?: string;
	discountType?: string;
}

export type createOrderFormType = {
	country: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address1: string;
	address2: string;
	city: string;
	zipCode: string;
	countryCode: string;
	reference: string;
	deliveryCost: string;
	deliveryComments: string;
	iso: string;
	comments: string;
	vat: string;
	deliveryMethod: number;
	deliveryPayment: number;
	status: 3,
	products: Array<createOrderProductsType>
}

export type OrderStatusType= {
	id: number;
	title: string;
	type: string;
};

export type IsoItem = {
	label: string;
}

export type PaymentMethodType= {
	id: number;
	title: string;
	type: string;
};

export type OrderLineType= {
	id: number;
	itemNumber: string;
	amount: number;
	price: number;
	discount: number;
};

export type OrderType = {
	id : number;
	currency: string;
	customerComment: string;
	deliveryName: string;
	deliveryAttention: string;
	deliveryZipCode: string;
	deliveryCountry: string;
	deliveryMethod: string;
	deliveryCost: string;
	invoiceNumber: string;
	vat: number;
	iso: string;
	orderComment: string;
	orderUpdatedDate: Date;
	orderDate: Date;
	orderFulfilledDate: Date;
	dueDate: Date;
	statusId: number;
	orderStatus: OrderStatusType;
	paymentMethodId: number;
	paymentMethodType: PaymentMethodType;
	orderLines: Array<OrderLineType>;
};

export type OrderLineForWarranty = {
	id: number;
	itemNumber: string;
	amount: number;
	price: number;
	discount: number;
	product: ProductType;
};

export type OrderForWarranty = {
	customer: CustomerType;
	orderLines: Array<OrderLineForWarranty>;
	errorsList: Array<WarrantyProductErrorType>;
};

export type CreateOrderWarrantyResponse = {
	id: number;
};

export interface Label {
    base64: string;
    file_format: string;
}

export interface ShipmondoPrintLabels {
    id: number;
    labels: Label[];
}