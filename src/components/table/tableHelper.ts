import CompanyForm from "../company/CompanyForm";
import CustomerFilterForm from "../customer/CustomerFilterForm";
import CustomerForm from "../customer/CustomerForm";
import OrderFilterForm from "../order/OrderFilterForm";
import OrderForm from "../order/OrderForm";
import OrderStatusForm from "../orderStatus/OrderStatusForm";
import OrderWarrantyForm from "../order/OrderWarrantyForm";
import PaymentMethodForm from "../paymentMethod/PaymentMethodForm";
import ProductForm from "../product/ProductForm";
import ProductFilterForm from "../product/ProductFilterForm";
import WarrantyProductErrorForm from "../warrantyProductError/WarrantyProductErrorForm";
import WarrantyTagForm from "../warrantyTag/WarrantyTagForm";
import ShipmentPriceForm from "../shipmentPrice/ShipmentPriceForm";
import WarrantyForm from "../warranty/WarrantyForm";
import WarrantyFilterForm from "../warranty/WarrantyFilterForm";

export const formComponents: { [key: string]: any; } = {
	company: CompanyForm,
	customer: CustomerForm,
	customerFilter: CustomerFilterForm,
	order: OrderForm,
	orderFilter: OrderFilterForm,
	orderStatus: OrderStatusForm,
	orderWarranty: OrderWarrantyForm,
	paymentMethod: PaymentMethodForm,
	product: ProductForm,
	productFilter: ProductFilterForm,
	warrantyProductError: WarrantyProductErrorForm,
	warrantyTag: WarrantyTagForm,
	shipmentPrice: ShipmentPriceForm,
	warranty: WarrantyForm,
	warrantyFilter: WarrantyFilterForm,
}
