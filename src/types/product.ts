export type BrandType = {
	id: number;
	webshopId: number;
	title: string;
};

export type SupplierType = {
	id: number;
	title: string;
	compensationStatus: number;
	compensationNeeded: number;
};

export type ProductPriceType = {
	id: number;
	price: number;
	discount: number;
	amount: number;
	currency: string;
	iso: string;
};

export type StatusItem = {
	label: number
}

export type ProductType = {
	id: number;
	webshopId: number;
	itemNumber: string;
	title: string;
	variantId: number;
	recommendedPrice: number;
	status: number;
	ean: string;
	customsCode: string;
	originCountry: string;
	stock: number;
	netWidth: number;
	netDepth: number;
	netHeight: number;
	netWeight: number;
	grossWidth: number;
	grossDepth: number;
	grossHeight: number;
	grossWeight: number;
	statusWhenSoldOut: number;
	buyWhenSoldOut: number;
	dateCreated: Date;
	dateUpdated: Date;
	brandId: number;
	BrandType: BrandType;
	supplierId: number;
	SupplierType: SupplierType;
	productPrices: Array<ProductPriceType>;
	price?: number;
	discount?: number;
	calculatedBuyingPrice: number;
};
