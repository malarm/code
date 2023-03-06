import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { User } from '../../types/user';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
	table: {
		width: '100%',
		minHeight: '60vh',
	},
});

type UserTableProps = {
	userRecords: User[];
	setDialogOpen: (state: boolean) => void;
	setCurrUser: (currUser: User) => void;
}

const UserTable = (props: UserTableProps) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const { userRecords, setDialogOpen, setCurrUser } = props;

	const handleEditAction = (user: User) => {
		setCurrUser(user);
		setDialogOpen(true);
	};

	return (
		<TableContainer component={Paper} className={classes.table}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="left">{t('name')}</TableCell>
						<TableCell align="left">{t('email')}</TableCell>
						<TableCell align="left">{t('phone')}</TableCell>
						<TableCell align="left">{t('location')}</TableCell>
						<TableCell align="left">{t('title')}</TableCell>
						<TableCell align="left">{t('initial')}</TableCell>
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{userRecords.map((row) => (
						<TableRow key={row.name}>
							<TableCell align="left">
								{row.name}
							</TableCell>
							<TableCell align="left">{row.email}</TableCell>
							<TableCell align="left">{row.phone ?? '-'}</TableCell>
							<TableCell align="left">{row.officeLocation ?? '-'}</TableCell>
							<TableCell align="left">{row.jobTitle}</TableCell>
							<TableCell align="left">{row.initialName}</TableCell>
							<TableCell align="center">
								<IconButton size="small" color="primary" onClick={() => handleEditAction(row)}>
									<EditOutlinedIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default connect(null, null)(UserTable);
