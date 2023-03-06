import { FinalizeReplaceModelProps, ProductDetailType, ProductTypeEnum } from "./modelTypes";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
	Grid,
	Checkbox,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputAdornment
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, AutocompleteRenderInputParams } from "@material-ui/lab";
import { ProductType } from "../types/product";
import { searchProductByValue } from "../components/product/productService";
import { shippingPriceCalculation } from "../app/ShippingPrice"
import { useStyles } from "./styles"
import { showNotification } from "../components/notification/notificationSlice";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";
import DialogTitle from "./DialogTitle";

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
	showNotification: showNotification
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type FinalizeReplaceProps = PropsFromRedux & FinalizeReplaceModelProps;

const FinalizeReplaceModel = (props: FinalizeReplaceProps) => {
	const classes = useStyles();
	const {
		openModel,
		title,
		country,
		oldProductGrossWeight,
		handleSubmit,
		handleClose,
		handleDelete,
		costReplace,
		costReturnShipping,
		costShipping,
		isEdit,
		isDeleteOnly,
		showNotification
	} = props;

	const [addZeroOrder, setAddZeroOrder] = useState(false);
	const [addReturnOrder, setAddReturnOrder] = useState(false);
	const [productType, setProductType] = useState("");
	const [costReplaceState, setcostReplaceCost] = useState(String(costReplace));
	const [costReturnShippingState, setCostReturnShippingState] = useState(String(costReturnShipping));
	const [costShippingState, setCostShippingState] = useState(String(costShipping));
	const [productSuggestions, setProductSuggestions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState<ProductDetailType>({});

	const handleOnTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /(^\d+(\.\d{1,2})?$)|(^(\d+\.{0,1})$)/
		if (regex.test(event.target.value)) {
			if (field === 'costReplace' && event != null) {
				setcostReplaceCost(event.target.value);
			} else if (field === 'costReturnShipping' && event != null) {
				setCostReturnShippingState(event.target.value);
			} else if (field === 'costShipping' && event != null) {
				setCostShippingState(event.target.value);
			}
		}
	};

	const handleOnClickClose = () => {
		handleClose && handleClose();
	};

	const handleOnSubmit = () => {
		handleSubmit && handleSubmit(addZeroOrder, addReturnOrder, productType == ProductTypeEnum.same, selectedProduct, Number(costReplaceState), Number(costReturnShippingState), Number(costShippingState), !isEdit);
	};

	const onProductSelect = (e: React.ChangeEvent<unknown>, value: ProductDetailType | string | null, reason?: AutocompleteChangeReason, details?: AutocompleteChangeDetails<ProductDetailType>) => {
		if (value && typeof value !== 'string') {
			if (value?.status != 1) {
				setSelectedProduct({});
				showNotification({ message: 'Status inactive', severity: 'warning' });
			} else if (value.buyWhenSoldOut === 0 && (value.stock === undefined || value.stock < 1)) {
				setSelectedProduct({});
				showNotification({ message: 'item buyWhenSoldOut inactive!!', severity: 'warning' });
			} else if (value.statusWhenSoldOut === 0 && (value.stock === undefined || value.stock < 1)) {
				setSelectedProduct({});
				showNotification({ message: 'item statusWhenSoldOut inactive!!', severity: 'warning' });
			} else {
				setSelectedProduct(value);
				setcostReplaceCost(String(value?.calculatedBuyingPrice ?? 0));
				setCostShippingState(String(shippingPriceCalculation(country, value.grossWeight)));
			}
		}
	}
	const onProductSearch = async (
		event: React.ChangeEvent<unknown>,
		value: string,
		reason: AutocompleteInputChangeReason,
	) => {
		const prodSuggestions = await searchProductByValue(value);
		setProductSuggestions(prodSuggestions.filter((x: ProductDetailType) => (x.status == 1 && (x.buyWhenSoldOut ?? 0) > 0 && (x.statusWhenSoldOut ?? 0) > 0)));
	}

	useEffect(() => {
		if (!isEdit && !isDeleteOnly) {
			calculateReturnShippingPrice();
		}
	});

	const calculateReturnShippingPrice = () => {
		setCostReturnShippingState(String(shippingPriceCalculation(country, oldProductGrossWeight)));
	}

	return (
		<>
			<Dialog onClose={handleOnClickClose} open={openModel} >
				<DialogTitle onClose={handleOnClickClose}>
					{title}
				</DialogTitle>
				<DialogContent dividers>
					{!isDeleteOnly ? <Fragment>
						{!isEdit ?
							<Grid container spacing={1} justify="center" alignItems="center">
								<Grid item xs={6}>
									Add 0-order to customer
								</Grid>
								<Grid item xs={6}>
									<Checkbox value={addZeroOrder} onChange={() => {
										const zeroOrder = !addZeroOrder;
										setAddZeroOrder(zeroOrder);
										zeroOrder ? setProductType(ProductTypeEnum.same) : setProductType(ProductTypeEnum.same);

									}} />
								</Grid>
								<Grid item xs={6}>
									Add Return order
								</Grid>
								<Grid item xs={6}>
									<Checkbox value={addReturnOrder} onChange={() => setAddReturnOrder(!addReturnOrder)} />
								</Grid>
								{
									addZeroOrder == true ?
										<Grid item xs={12}>
											<RadioGroup row aria-label="productType" name="row-radio-buttons-group" value={productType}
												onChange={(e) => {
													setProductType(e.target.value == "same" ? ProductTypeEnum.same : ProductTypeEnum.new)
													if (e.target.value == "same") {
														setCostShippingState(String(shippingPriceCalculation(country, oldProductGrossWeight)));
													}
												}}>
												<FormControlLabel value="same" control={<Radio />} label="Same Product" />
												<FormControlLabel value="new" control={<Radio />} label="New Product" />
											</RadioGroup>
										</Grid> : <></>
								}
								{productType === "new" && <Grid item xs={12}>
									<Autocomplete
										key="NewProductAutocomplete"
										autoComplete
										includeInputInList
										freeSolo
										filterOptions={(options, state) => options}
										options={productSuggestions}
										value={selectedProduct}
										getOptionLabel={(option: Partial<ProductType>) => option.itemNumber ? `${option.itemNumber} - ${option.title}` : ""}
										onChange={onProductSelect} // click on the show tags
										onInputChange={onProductSearch} //** on every input change hitting my api**
										renderInput={(params: AutocompleteRenderInputParams) => {
											return <TextField
												{...params}
												variant="outlined"
												label={'Select New Product'}
												fullWidth
											/>
										}} />

								</Grid>
								}
							</Grid>
							:
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										name=""
										value={costReplaceState}
										label="Cost Replace"
										variant="outlined"
										fullWidth
										onChange={handleOnTextChange('costReplace')}
										InputProps={{
											endAdornment: <InputAdornment position="start">DKK</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name=""
										value={costReturnShippingState}
										label="Cost Return Shipping"
										variant="outlined"
										fullWidth
										onChange={handleOnTextChange('costReturnShipping')}
										InputProps={{
											endAdornment: <InputAdornment position="start">DKK</InputAdornment>,
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name=""
										value={costShippingState}
										label="Cost Shipping"
										variant="outlined"
										fullWidth
										onChange={handleOnTextChange('costShipping')}
										InputProps={{
											endAdornment: <InputAdornment position="start">DKK</InputAdornment>,
										}}
									/>
								</Grid>
							</Grid>}
					</Fragment> : <Grid item xs={12}>
						<Typography
							color="textPrimary"
							align="left"
							paragraph>
							Replace Solution is yet to be finalized.
						</Typography>
					</Grid>}
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.saveSolution}
						onClick={handleOnClickClose}
					>
						{'Close'}
					</Button>
					{
						isEdit ? <Button
							variant="contained"
							color="primary"
							type="button"
							autoFocus
							className={classes.saveSolution}
							onClick={handleDelete}
						>
							{'Delete'}
						</Button> : null
					}
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						disabled={isDeleteOnly}
						className={classes.saveSolution}
						onClick={handleOnSubmit}
					>
						{isEdit ? "Update Costs" : "Add Exchange"}
					</Button>
				</DialogActions>
			</Dialog>

		</>
	);
}

export default connector(FinalizeReplaceModel);
