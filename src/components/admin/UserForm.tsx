import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../types/user';
import { connect, ConnectedProps } from 'react-redux';
import { updateAdmin } from './adminSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiFormControl-root': {
			width: '90%',
			margin: theme.spacing(2),
		},
		margin: '30px 20px',

	},
}));

const mapDispatchToProps = {
	initUpdateAdmin: updateAdmin,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type UserFormProps = PropsFromRedux & {
	currUser: Partial<User>;
	closeButton: () => void;
}

const UserForm = (props: UserFormProps) => {
	const { currUser, initUpdateAdmin, closeButton } = props;
	const { register, handleSubmit } = useForm({
		reValidateMode: 'onBlur',
		defaultValues: currUser,
	});
	const onSubmit = async (data: Partial<User>) => {
		const params = {
			id: currUser.id,
			admin: data,
		};
		await initUpdateAdmin(params);
		closeButton();
	};

	const classes = useStyles();

	return (
		<form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
			<Grid container>
				<Grid item xs={6}>
					<TextField name="name" label="Name" variant="outlined" inputRef={register} />
				</Grid>
				<Grid item xs={6}>
					<TextField name="initialName" label="Initial name" variant="outlined" inputRef={register} />
				</Grid>
				<Grid item xs={6}>
					<TextField name="email" label="Email" variant="outlined" inputRef={register} disabled />
				</Grid>
				<Grid item xs={6}>
					<TextField name="phone" label="Phone no" variant="outlined" inputRef={register} />
				</Grid>
				<Grid item xs={6}>
					<TextField name="preferredLanguage" label="Language" variant="outlined" inputRef={register} />
				</Grid>
				<Grid item xs={6}>
					<TextField name="officeLocation" label="Location" variant="outlined" inputRef={register} />
				</Grid>
				<Grid item xs={10} />
				<Grid item xs={2} style={{ paddingTop: 20 }}>
					<Button variant="contained" color="primary" type="submit">  Save </Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default connector(UserForm);
