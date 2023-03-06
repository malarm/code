import { Shipment } from './../types/shipment';
import { ProductPriceType } from "../types/product";
import {
	WarrantyProductType,
	WarrantySolutionType,
	WarrantySolutionTypes,
	WarrantyTechnicianTypes,
	WarrantyType
} from "../types/warranty";
import { WarrantyTagType } from "../types/warrantyTag";

export type AddSolutionModelProps = {
	openModel: boolean;
	title: string;
	warrantyProductId: number;
	solutionTypesLoaded: boolean;
	solutionTypes: WarrantySolutionTypes[];
	warrantySolutions: Array<WarrantySolutionType>;
	handleClose?: () => void;
	handleAddSolution?: (warrantyProductId: number, solutionSelected: number) => void;
}

export type AddTechnicianModelProps = {
	openModel: boolean;
	title: string;
	technicianNames: WarrantyTechnicianTypes[];
	technicianNamesLoaded: boolean;
	warranty?: WarrantyType;
	solution?: WarrantySolutionType;
	product?: WarrantyProductType;
	handleSubmit?: (technicianDetail: OrderTechnicianType) => void;
	handleClose?: () => void;
}

export type FinalizeRepairModelProps = {
	openModel: boolean;
	title: string;
	handleSubmit?: (technicianCost: number, sparesCost: number, isFinalize: boolean) => void;
	handleClose?: () => void;
	handleDelete?: () => void;
	techCost: string,
	spareCost: string,
	isEdit: boolean
}

export type FinalizeReplaceModelProps = {
	openModel: boolean;
	title: string;
	country?: string;
	oldProductGrossWeight?: number;
	handleSubmit?: (addZeroOrder: boolean, addReturnOrder: boolean, isSameProduct: boolean, product: ProductDetailType, newProductPriceCost: number, newProductShipmentCost: number, oldProductShipmentCost: number, isFinalize: boolean) => void;
	handleClose?: () => void;
	handleDelete?: () => void;
	costReplace: number;
	costReturnShipping: number;
	costShipping: number;
	isEdit: boolean;
	isDeleteOnly: boolean;
}

export type FinalizeCreditModelProps = {
	openModel: boolean;
	title: string;
	handleSubmit?: (sellAgain: boolean, creditAmount: number, shippingAmount: number, costToReplace: number, isFinalize: boolean) => void;
	handleClose?: () => void;
	handleDelete?: () => void;
	sellAgain: boolean
	productPricePayed: number;
	calculatedBuyingAmount: number;
	shippingCost: number;
	isDeleteOnly: boolean;
	isEdit: boolean,
	currency: string;
}

export type DeleteConfirmationModelProps = {
	openModel: boolean;
	title: string;
	content: string,
	deleteID: number,
	handleDeleteConfirm: (id: number) => void;
	handleClose: () => void;
}

export type OrderTechnicianType = {
	warrantySolutionId?: number;
	warrantyId?: number;
	warrantyProductId?: number;
	technicianId?: number;
	subject?: string;
	message?: string
}

export type OrderTechnicianCostType = {
	warrantySolutionId?: number;
	warrantyId?: number;
	costTechnician?: number;
	costSpareparts?: number;
}
export type FinalizeCompensationModelProps = {
	openModel: boolean;
	title: string;
	handleSubmit?: (returnAmount: number, isFinalize: boolean) => void;
	handleClose?: () => void;
	handleDelete?: () => void;
	isEdit: boolean,
	productPricePayed: number;
	currency: string;
}
export type CompensationAmountType = {
	warrantySolutionId?: number;
	warrantyId?: number;
	compensated?: number;
}

export type CreditAmountType = {
	warrantySolutionId?: number;
	warrantyId?: number;
	costToReplace?: number;
	shippingCost?: number,
	amountReturnToCustomer?: number,
	isEligibleToResale: boolean,
	isFinalize: boolean
}

export type NoNecessaryModelProps = {
	openModel: boolean;
	title: string;
	handleClose?: () => void;
	handleDelete?: () => void;
}
export type TagPopupModelProps = {
	maxTags: number;
	tags: Array<WarrantyTagType>;
}

export type WarrantyUploadType = {
	warrantyProductId?: number;
	warrantyId?: number;
	files: File[];
}

export type DeleteWarrantyUploadType = {
	warrantyPictureUploadId: number;
	warrantyId: number;
}

export type ProductDetailType = {
	price?: number,
	calculatedPrice?: number,
	id?: number,
	status?: number,
	statusWhenSoldOut?: number,
	buyWhenSoldOut?: number,
	stock?: number,
	discount?: number,
	discountType?: string,
	grossWeight?: number,
	calculatedBuyingPrice?: number;
	productPrices?: Array<ProductPriceType>
};

export enum ProductTypeEnum {
	same = "same",
	new = "new",
}
export type BookShipmentModelProps = {
	openModel: boolean;
	title: string;
	handleClose?: () => void;
	handleBookShipment?: () => void;
	orderId: number;
}

export type BookInfoModelProps = {
	openModel: boolean;
	title: string;
	handleClose?: () => void;
	shipment: Shipment;
}

export type CalculatePriceModelProps = {
	openModel: boolean;
	handleClose?: () => void;
}

export interface CalculatePriceCountry {
	id: number;
	country: string;
	countryCode: string;
}

export interface CalculatePriceDetailType {
	runningMetre: number;
	postnordPrice: number;
	skanlogPricePrice: number;
}

export interface TaricCodes {
	code: string;
	text: string;
}
