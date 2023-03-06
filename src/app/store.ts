import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import LoginReducer from '../components/login/loginSlice';
import UserSettingReducer from '../components/login/usersettingSlice';
import AdminReducer from '../components/admin/adminSlice';
import CompanyReducer from '../components/company/companySlice';
import CustomerReducer from '../components/customer/customerSlice';
import OrderReducer from '../components/order/orderSlice';
import OrderStatus from '../components/orderStatus/orderStatusSlice';
import PaymentMethod from '../components/paymentMethod/paymentMethodSlice';
import ProductReducer from '../components/product/productSlice';
import CountryReducer from '../components/country/countrySlice';
import NotificationReducer from '../components/notification/notificationSlice';
import WarrantyProductErrorReducer from '../components/warrantyProductError/warrantyProductErrorSlice';
import WarrantyTagReducer from '../components/warrantyTag/warrantyTagSlice';
import ShipmentPriceReducer from '../components/shipmentPrice/shipmentPriceSlice';
import WarrantyReducer from '../components/warranty/warrantySlice';
import rootSaga from './saga';
import WarrantyStatisticsReducer from '../components/warrantyStatistics/warrantyStatisticsSlice';
import WarrantyCompensationReducer from '../components/warrantyCompensation/warrantyCompensationSlice';
import BookShipmentReducer from '../components/bookShipment/bookShipmentSlice';



const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

const rootReducer = combineReducers({
	auth: LoginReducer,
	userSetting: UserSettingReducer,
	admin: AdminReducer,
	company: CompanyReducer,
	customer: CustomerReducer,
	order: OrderReducer,
	orderStatus: OrderStatus,
	paymentMethod: PaymentMethod,
	product: ProductReducer,
	country: CountryReducer,
	notification: NotificationReducer,
	warrantyProductError: WarrantyProductErrorReducer,
	warrantyTag: WarrantyTagReducer,
	shipmentPrice: ShipmentPriceReducer,
	warranty: WarrantyReducer,
	warrantyStatistics: WarrantyStatisticsReducer,
	warrantyCompensation: WarrantyCompensationReducer,
	bookShipment: BookShipmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = { // configuration object for redux-persist
	key: 'root',
	storage,
	whitelist: ['auth'], // define which reducer state needs to be peristed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
