import { fork } from 'redux-saga/effects';
import loginSaga from '../components/login/loginSaga';
import userSettingSaga from '../components/login/usersettingSaga';
import adminSaga from '../components/admin/adminSaga';
import companySaga from '../components/company/companySaga';
import customerSaga from '../components/customer/customerSaga';
import orderSaga from '../components/order/orderSaga';
import orderStatusSaga from '../components/orderStatus/orderStatusSaga';
import paymentMethodSaga from '../components/paymentMethod/paymentMethodSaga';
import productSaga from '../components/product/productSaga';
import countrySaga from '../components/country/countrySaga';
import warrantyProductErrorSaga from '../components/warrantyProductError/warrantyProductErrorSaga';
import warrantyTagSaga from '../components/warrantyTag/warrantyTagSaga';
import shipmentPriceSaga from '../components/shipmentPrice/shipmentPriceSaga';
import warrantySaga from '../components/warranty/warrantySaga';
import warrantyStatisticsSaga from '../components/warrantyStatistics/warrantyStatisticsSaga';
import warrantyCompensationSaga from '../components/warrantyCompensation/warrantyCompensationSaga';
import bookShipmentSaga from '../components/bookShipment/bookShipmentSaga';

export default function* rootSaga() {
	yield fork(loginSaga);
	yield fork(userSettingSaga);
	yield fork(adminSaga);
	yield fork(companySaga);
	yield fork(customerSaga);
	yield fork(orderSaga);
	yield fork(orderStatusSaga);
	yield fork(paymentMethodSaga);
	yield fork(productSaga);
	yield fork(countrySaga);
	yield fork(warrantyProductErrorSaga);
	yield fork(warrantyTagSaga);
	yield fork(shipmentPriceSaga);
	yield fork(warrantySaga);
	yield fork(warrantyStatisticsSaga);
	yield fork(warrantyCompensationSaga);
	yield fork(bookShipmentSaga);
}

