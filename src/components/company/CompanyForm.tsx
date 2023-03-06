import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps} from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyType } from '../../types/company';
import { updateCompany, addCompany } from './companySlice';
import { RootState } from '../../app/store';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiFormControl-root': {
			width: '90%',
			margin: theme.spacing(2),
		},
		margin: '30px 20px',

	},
}));

const mapStateToProps = (state: RootState) => ({
	isRefreshing: state.company?.isFetching,
});

const mapDispatchToProps = { initiateUpdateCompany: updateCompany, initiateAddCompany: addCompany };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type CompanyFormProps = PropsFromRedux & {
	item: Partial<CompanyType>;
	mode: string;
	openItemDialog: (state: boolean) => void;
}

const CompanyForm = (props: CompanyFormProps) => {
	const { item, mode, initiateUpdateCompany, isRefreshing, openItemDialog, initiateAddCompany } = props;
	const { register, handleSubmit, errors } = useForm({
		reValidateMode: 'onBlur',
		defaultValues: mode === 'New' ? {} : item,
	});
	const onSubmit = (data: Partial<CompanyType>) => {
		console.log(data);
		if(mode === 'New') {
			initiateAddCompany({ company: data});
		} else {
			initiateUpdateCompany({ id: item.id, company: data});
		}
	}
	if(isRefreshing){
		openItemDialog(false);
	}
	const classes = useStyles();

	return (
		<form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
			<Grid container>
				<Grid item xs={6}>
					<TextField name="name" label="Company Name" variant="outlined"
						inputRef={register({
							required: {
								value: true,
								message: 'Name is required',
							},
						})}
						inputProps={{readOnly: mode === 'View'}}
						error={!!errors.name}
						helperText={errors?.name?.message ?? ''}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField name="address" label="Company Address" variant="outlined"
						inputRef={register({
							required: {
								value: true,
								message: 'Address is required',
							},
						})}
						inputProps={{readOnly:  mode === 'View'}}
						error={!!errors.address}
						helperText={errors?.address?.message ?? ''}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField name="phoneNo" label="Phone No" variant="outlined" inputRef={register} inputProps={{readOnly:  mode === 'View'}}/>
				</Grid>
				<Grid item xs={6}>
					<TextField name="vat" label="VAT" variant="outlined" inputRef={register} inputProps={{readOnly:  mode === 'View'}}/>
				</Grid>
				<Grid item xs={10} />
				<Grid item xs={2} style={{ paddingTop: 20 }}>
					{ mode !== 'View' && <Button variant="contained" color="primary" type="submit">  Save </Button>}
				</Grid>

			</Grid>
		</form>
	);
};

export default connector(CompanyForm);
