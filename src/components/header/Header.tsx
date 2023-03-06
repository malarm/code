import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import UserAvatar from './UserAvatar';
import LanguageSelect from './LanguageSelect';

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

type HeaderProps = {
	handleMenuToggle: () => void
}

const Header = (props: HeaderProps) => {
	const { handleMenuToggle } = props;
	const classes = useStyles();

	return (
		<AppBar position="fixed" className={`${classes.appBar} no-print`}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="Menu"
					edge="start"
					onClick={handleMenuToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap className={classes.title} align="left">
          Wineandbarrels
				</Typography>
				<LanguageSelect />
				<UserAvatar />
			</Toolbar>

		</AppBar>
	);
};

export default Header;
