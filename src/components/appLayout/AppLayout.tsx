import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import Admin from '../admin/Admin';
import Company from '../company/Company';
import Customer from '../customer/Customer';
import Order from '../order/order';
import CustomerDetail from '../customer/CustomerDetail';
import OrderDetail from '../order/OrderDetail';
import OrderStatus from '../orderStatus/OrderStatus';
import PaymentMethod from '../paymentMethod/PaymentMethod';
import product from '../product/product';
import ProductDetail from '../product/ProductDetail';
import CreateOrder from '../order/create/CreateOrder';
import WarrantyProductError from '../warrantyProductError/WarrantyProductError';
import WarrantyTag from '../warrantyTag/WarrantyTag';
import ShipmentPrice from '../shipmentPrice/ShipmentPrice';
import OrderWarrantyDetails from "../order/OrderWarrantyDetails";
import Warranty from "../warranty/Warranty";
import warrantyStatistics from './../warrantyStatistics/warrantyStatistics';
import warrantyCompensation from './../warrantyCompensation/warrantyCompensation';
import BookShipment from '../bookShipment/BookShipment';
import BookedToday from '../bookShipment/BookedToday';
import PreviousBooking from '../bookShipment/BookedPrevious';
import PrintOrder from '../bookShipment/PrintOrder';
import PrintEOD from '../bookShipment/PrintEOD';
import PrintShipments from '../bookShipment/PrintShipment';
import GetProducts from '../bookShipment/GetProducts';
import GetCarriers from '../bookShipment/GetCarriers';



const PageDashboard = () => <Typography variant="h3" component="h1">Dashboard page</Typography>;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},

	toolbar: theme.mixins.toolbar,

	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

}));

const AppLayout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleMenuToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header handleMenuToggle={handleMenuToggle} />
			<Menu handleMenuToggle={handleMenuToggle} mobileOpen={mobileOpen} />
			<main className={`${classes.content} pl-0 pr-0`}>
				<div className={classes.toolbar} />
				<Switch>
					<Route path="/home" component={PageDashboard} exact />
					<Route path="/orders" component={Order} exact />
					<Route path="/orders/:id" component={OrderDetail} exact />
					<Route path="/createOrder" component={CreateOrder} exact />
					<Route path="/company" component={Company} exact />
					<Route path="/customers" component={Customer} exact />
					<Route path="/customers/:id" component={CustomerDetail} exact />
					<Route path="/orderStatus" component={OrderStatus} exact />
					<Route path="/paymentMethod" component={PaymentMethod} exact />
					<Route path="/admin" component={Admin} exact />
					<Route path="/products" component={product} exact />
					<Route path="/products/:id" component={ProductDetail} exact />
					<Route path="/warrantyProductError" component={WarrantyProductError} exact />
					<Route path="/warrantyTag" component={WarrantyTag} exact />
					<Route path="/ShipmentPrice" component={ShipmentPrice} exact />
					<Route path="/BookShipment" component={BookShipment} exact />
					<Route path="/BookedToday" component={BookedToday} exact />
					<Route path="/previousshipments" component={PreviousBooking} exact />
					<Route path="/orders/:id/warranty" component={OrderWarrantyDetails} exact />
					<Route path="/warranties" component={Warranty} exact />
					<Route path="/warranties/:id/:action" component={Warranty} exact />
					<Route path="/warrantyStatistics" component={warrantyStatistics} exact />
					<Route path="/warrantyCompensation" component={warrantyCompensation} exact />
					<Route path="/printorder/:orderIds" component={PrintOrder} exact />
					<Route path="/printeod/:reportDate" component={PrintEOD} exact />
					<Route path="/printshipments/:Ids" component={PrintShipments} exact />
					<Route path="/getproducts" component={GetProducts} exact />
					<Route path="/getcarriers" component={GetCarriers} exact />
				</Switch>
			</main>
		</div>
	);
};

export default AppLayout;
