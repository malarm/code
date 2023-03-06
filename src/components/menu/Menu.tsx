import React from 'react';
import { Drawer, Hidden, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	AccountBox,
	Build as SettingsIcon,
	Close as CloseIcon,
	Dashboard as IconDashboard,
	ShoppingCart as IconShoppingCart,
	People as IconPeople,
	Business as IconBusiness,
	LocalShipping as LocalShippingIcon,
	Link as LinkIcon,
	ViewDay
} from '@material-ui/icons';
import MenuItem, { MenuItemProps } from './MenuItem';

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	closeMenuButton: {
		marginRight: 'auto',
		marginLeft: 0,
	},
}));

const drawerWidth = 240;
const menuList: MenuItemProps[] = [
	{
		name: 'dashboard',
		link: '/home',
		Icon: IconDashboard,

	},
	{
		name: 'admin',
		link: '/admin',
		Icon: IconPeople,
	},
	{
		name: 'company',
		link: '/company',
		Icon: IconBusiness,

	},
	{
		name: 'customers',
		link: '/customers',
		Icon: AccountBox,

	},
	{
		name: 'product',
		link: '/products',
		Icon: ViewDay,
	},
	{
		name: 'Orders',
		Icon: IconShoppingCart,
		items: [
			{
				name: 'orderList',
				link: '/orders',
			},
			{
				name: 'orderStatus',
				link: '/orderStatus',

			},
			{
				name: 'paymentMethod',
				link: '/paymentMethod',

			},
		],
	},
	{
		name: 'Warranties',
		Icon: SettingsIcon,
		items: [
			{
				name: 'Warranties List',
				link: '/warranties',
			},
			{
				name: 'Product Error',
				link: '/warrantyProductError',
			},
			{
				name: 'Tag',
				link: '/warrantyTag',
			},
			{
				name: 'Warranty statistics',
				link: '/warrantyStatistics',
			},
			{
				name: 'Warranty Compensation',
				link: '/warrantyCompensation',
			},
		],
	},
	{
		name: 'Shipment',
		Icon: LocalShippingIcon,
		items: [
			{
				name: 'Shipment Price',
				link: '/shipmentPrice',
			},
			{
				name: 'Book Shipment',
				link: '/bookshipment',
			},
			{
				name: 'booked_today',
				link: '/bookedtoday',
			},
			{
				name: 'previous_shipment',
				link: '/previousshipments',
			},
		],
	},
	{
		name: 'Links',
		Icon: LinkIcon,
		items: [
			{
				name: 'DHL Multishipping',
				link: 'https://www.dhlmultishipping.com/login/#/to/dhlse',
				target: '_blank'
			},
			{
				name: 'Dropboy',
				link: 'https://app.wuxus.com/?redirect=/login/',
				target: '_blank'
			},
			{
				name: 'Fakturafil',
				link: 'https://fakturafil.dk/invoice/login.php',
				target: '_blank'
			},
			{
				name: 'FreshDesk vidensdatabase',
				link: 'https://wineandbarrelsas.freshdesk.com/support/solutions',
				target: '_blank'
			},
			{
				name: 'Refusioner - Trello',
				link: 'https://trello.com/b/hei7eNLG/refusion',
				target: '_blank'
			},
			{
				name: 'ScanNet backend',
				link: 'https://webshop.scannet.dk/',
				target: '_blank'
			},
			{
				name: 'Winebuyers',
				link: 'https://www.winebuyers.com/admin/orders/',
				target: '_blank'
			},
			{
				name: 'Get carriers',
				link: '/getcarriers?country=DK',
			},
			{
				name: 'Get Products',
				link: '/getproducts',
			},
			{
				name: 'Get single product',
				link: '/getproducts?sender=DK&receiver=DK&ownagreements=true&carrier=pdk',
			},
		],
	},

];

type MenuProps = {
	handleMenuToggle: () => void;
	mobileOpen: boolean;
}

const Menu = (props: MenuProps) => {
	const { handleMenuToggle, mobileOpen } = props;
	const classes = useStyles();
	const theme = useTheme();
	const drawer = (
		<div>
			<List>
				{menuList.map((item, index) => (
					<MenuItem {...item} key={index} />
				))}
			</List>

		</div>
	);

	return (
		<nav className={`${classes.drawer} no-print`}>
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={mobileOpen}
					onClose={handleMenuToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<IconButton onClick={handleMenuToggle} className={classes.closeMenuButton}>
						<CloseIcon />
					</IconButton>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.toolbar} />
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};

export default Menu;
