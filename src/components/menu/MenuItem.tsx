import React, { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import { NavLink, NavLinkProps } from 'react-router-dom';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import { SvgIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	menuItem: {
		'&.active': {
			background: 'rgba(0, 0, 0, 0.08)',
			'& .MuiListItemIcon-root': {
				color: theme.palette.primary.main,
			},
		},
	},
	menuItemIcon: {
		color: theme.palette.secondary.main,
	},
}));

export type MenuItemProps = {
	name: string;
	link?: string;
	Icon?: typeof SvgIcon;
	items?: MenuItemProps[];
	target?: string;

}

const MenuItem = (props: MenuItemProps) => {
	const {
		name, link, Icon, items = [], target
	} = props;
	const { t } = useTranslation();
	const classes = useStyles();
	const isExpandable = items && items.length > 0;
	const [open, setOpen] = useState(false);

	const handleClick = () => setOpen(!open);
	const isNotLink = !link || typeof link !== 'string';

	const comp = forwardRef<HTMLAnchorElement, Omit<NavLinkProps, 'innerRef'>>((navProps, ref) => <NavLink exact {...navProps} innerRef={ref as React.Ref<HTMLAnchorElement>} target={target} />)
	comp.displayName = "CustomNavLink";

	const MenuItemRoot = (
		<ListItem
			button
			className={classes.menuItem}
			onClick={() => { if (isNotLink) handleClick() }}
			{...isNotLink ? null : { component: comp, to: {pathname: link} }}
		>
			{/* Display an icon if any */}
			{!!Icon && (
				<ListItemIcon className={classes.menuItemIcon}>
					<Icon />
				</ListItemIcon>
			)}
			<ListItemText primary={t(name)} inset={!Icon} />
			{/* Display the expand menu if the item has children */}
			{isExpandable && !open && <IconExpandMore />}
			{isExpandable && open && <IconExpandLess />}
		</ListItem>
	);

	const MenuItemChildren = isExpandable ? (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Divider />
			<List component="div" disablePadding>
				{items.map((item, index) => (
					<MenuItem {...item} key={index} />
				))}
			</List>
		</Collapse>
	) : null;

	return (
		<>
			{MenuItemRoot}
			{MenuItemChildren}
		</>
	);
};

export default MenuItem;
