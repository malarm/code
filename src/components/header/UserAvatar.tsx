import React, { useState, MouseEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../login/loginSlice';
import { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';

const mapStateToProps = (state: RootState) => ({
	loggedInUser: state.auth.loggedInUser,
});

const mapDispatchToProps = { logout: logoutUser };

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type UserAvatarProps = PropsFromRedux

const UserAvatar = (props: UserAvatarProps) => {
	const { t } = useTranslation();
	const { logout, loggedInUser } = props;
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const open = Boolean(anchorEl);
	const history = useHistory();
	const handleMenu = (event: MouseEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		logout({});
		handleClose();
		history.replace('/');
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
			>
				<MenuItem><Typography variant="subtitle2">{loggedInUser?.name}</Typography></MenuItem>
				<MenuItem button onClick={handleLogout}><Typography variant="subtitle2" color="error">{t('logout')}</Typography></MenuItem>
			</Menu>
		</div>
	);
};

export default connector(UserAvatar);
