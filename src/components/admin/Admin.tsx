import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import UserTable from './UserTable';
import { fetchUsers } from './adminSlice';
import UserFormDialog from './UserFormDialog';
import { RootState } from '../../app/store';
import { User } from '../../types/user';

const useStyles = makeStyles({
	root: {
		width: '70vw',
		margin: 20,
		padding: 30,
		marginX: 'auto',
	},
});

const mapStateToProps = (state: RootState) => ({
	users: state.admin?.users,
	showLoading: state.admin?.isFetching,
});
const mapDispatchToProps = { initiateFetchUsers: fetchUsers };

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type AdminProps = PropsFromRedux

const Admin = (props: AdminProps) => {
	const classes = useStyles();
	const { initiateFetchUsers, users, showLoading } = props;
	const [open, setOpen] = useState(false);
	const [currUser, setCurrUser] = useState<Partial<User>>({});

	useEffect(() => {
		initiateFetchUsers();
	},[initiateFetchUsers]);

	return (
		<div className={classes.root}>
			{
				showLoading ? (<CircularProgress />) : (
					<>
						<UserTable userRecords={users} setDialogOpen={setOpen} setCurrUser={setCurrUser} />
						<UserFormDialog open={open} setDialogOpen={setOpen} currUser={currUser} />
					</>
				)
			}
		</div>
	);
};

export default connector(Admin);
