import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { Grid, Button, Paper, TextField, MenuItem, Typography, InputAdornment, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import { fetchpaymentMethod } from '../../paymentMethod/paymentMethodSlice';
import { showNotification } from '../../notification/notificationSlice';
import { fetchorderStatus } from '../../orderStatus/orderStatusSlice';
import { fetchCountry } from '../../country/countrySlice';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../../../app/store';
import { CountryType } from '../../../types/country';
import { PaymentMethodType } from '../../../types/paymentMethod';
import { OrderStatusType } from '../../../types/orderStatus';
import { DeliveryMethodType } from '../../../types/deliveryMethod';
import { createOrderFormType, errosType, createOrderProductsType } from '../../../types/order';
import { createOrder } from '../orderSlice';
import { ProductPriceType, ProductType } from '../../../types/product';
import { searchProductByValue } from '../../product/productService';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '70vw',
		minHeight: '70vh',
		margin: 20,
		padding: 30,
		marginX: 'auto',
		'& .MuiFormControl-root': {
			width: '90%',
			marginTop: theme.spacing(1),
		},
	},
	section: {
		margin: 20,
		padding: 30,
		marginX: 'auto',
	}
}));

const mapStateToProps = (state: RootState) => ({
	orderStatuses: state.orderStatus?.orderStatus,
	paymentMethods: state.paymentMethod?.paymentMethod,
	countries: state.country?.countries,
	loggedInUser: state.auth.loggedInUser,
});

const mapDispatchToProps = {
	initiateFetchOrderStatus: fetchorderStatus,
	initiateFetchPaymentMethod: fetchpaymentMethod,
	initiateFetchCountry: fetchCountry,
	showNotification: showNotification,
	initiateCreateOrder: createOrder,
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type productDetailType = {
	price?: number,
	calculatedPrice?: number,
	id?: number,
	status?: number,
	statusWhenSoldOut?: number,
	stock?: number,
	discount?: number,
	discountType?: string,
	productPrices?: Array<ProductPriceType>
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type CreateOrderProps = PropsFromRedux;

const calcWebshopPrice = (price: number, vat: number) => {
	const calPrice = price / ((vat / 100) + 1);
	return calPrice / 100;
}
const calcWebshopDiscount = (discount: number, vat: number, discountType: string, calcWebshopPrice: number) => {
	const calDiscount = discountType === 'p' ? calcWebshopPrice * (discount / 100) : (discount / ((vat / 100) + 1)) / 100;
	return calDiscount
}

const generateOrderCreateReq = (formData: createOrderFormType, selectedCountryDetail?: Partial<CountryType>) => {
	const orderCustomer = {
		Country: formData.countryCode,
		CountryCode: selectedCountryDetail?.telephoneCode,
		Company: '',
		Cvr: '',
		Firstname: formData.firstName,
		Lastname: formData.lastName,
		Email: formData.email,
		Address: formData.address1,
		Address2: formData.address2,
		City: formData.city,
		Zip: formData.zipCode,
		Phone: formData.phone,
		State: ''
	};

	const orderLines: Array<any> = [];
	formData?.products?.forEach((product: Partial<createOrderProductsType>) => orderLines.push({
		ProductId: product.productId,
		Amount: product.qty,
		BuyPrice: calcConversionPrice(parseInt(product?.buyPrice ?? "", 10), selectedCountryDetail?.iso),
		Discount: calcWebshopDiscount(parseInt(product?.discount ?? "", 10), selectedCountryDetail?.vat ?? 0, product?.discountType ?? '', calcWebshopPrice((product?.price ?? "", 10), selectedCountryDetail?.vat ?? 0)),
		Price: calcWebshopPrice(parseInt(product?.price ?? "", 10), selectedCountryDetail?.vat ?? 0),
		Unit: 'stk.'
	}));

	const order = {
		CurrencyId: selectedCountryDetail?.currency?.id,
		LanguageISO: selectedCountryDetail?.iso,
		CustomerComment: formData?.comments,
		DeliveryComment: formData?.deliveryComments,
		DeliveryPrice: formData?.deliveryCost,
		PaymentId: formData?.deliveryPayment,
		DeliveryId: formData?.deliveryMethod,
		ReferenceNumber: formData?.reference,
		SiteId: 1,
		Origin: 'Intranet',
		OrderCustomer: orderCustomer,
		OrderLines: { item: orderLines },
	};

	return order;

}

const calcDisplayPrice = (price: number, discount: number, discountType: string) => {
	const discountAmount = discountType === 'p' ? (price * (discount / 100)) : discount;
	const priceAmount = price - discountAmount;
	return priceAmount / 100;
}

const calcConversionPrice = (price: number, iso?: string) => {
	let conversionRate: number;
	switch (iso) {
		case 'DK':
			conversionRate = 1;
			break;
		case 'SE':
			conversionRate = 0.675;
			break;
		case 'NO':
			conversionRate = 0.595;
			break;
		case 'UK':
			conversionRate = 7.65;
			break;
		case 'CH':
			conversionRate = 7.45;
			break;
		case 'DE':
			conversionRate = 7.45;
			break;
		default:
			conversionRate = 7.45;
			break;
	}
	return price / conversionRate;
}

const CreateOrder = (props: CreateOrderProps) => {
	const { t } = useTranslation();
	const { initiateFetchOrderStatus, initiateCreateOrder, initiateFetchPaymentMethod, showNotification, initiateFetchCountry, countries, orderStatuses, loggedInUser } = props;
	const { control, register, watch, handleSubmit, setValue, reset, errors, getValues } = useForm<errosType>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			country: null
		},

	});

	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "products", // unique name for your Field Array
		// keyName: "id", default to "id", you can change the key name
	});
	const selectedCountry = watch('country', null);
	const products = watch('products', []);
	const selectedCountryDetail = countries.find(ctry => ctry.id === selectedCountry);
	const countryDeliveryMethods = selectedCountryDetail?.deliveryMethods ?? [];
	const countryPaymentMethods = selectedCountryDetail?.paymentMethods ?? [];
	const [productSuggestions, setProductSuggestions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState<productDetailType>({});
	const updateTotalAmount = () => {
		const { deliveryCost } = getValues();
		const totalProductPrice = products.reduce((acc: number, curr: { qty: string; calculatedPrice: string; }) => acc + (parseInt(curr.qty, 10) * parseInt(curr.calculatedPrice, 10)), parseInt(deliveryCost, 10));
		setValue('totalAmount' as never, totalProductPrice);
	}

	const selectedDelivery = watch('deliveryMethod', '');
	if (selectedDelivery && selectedDelivery !== '') {
		const selectedDm = countryDeliveryMethods?.find(dm => dm.id === parseInt(selectedDelivery, 10));
		if (selectedDm) {
			setValue('deliveryCost' as never, selectedDm.deliveryPrice ?? 0, { shouldDirty: true, shouldValidate: true });
			updateTotalAmount();
		}
	}

	if (products.length > 0) {
		updateTotalAmount();
	}

	const handleAddProduct = () => {
		if (selectedProduct.id) {
			if (selectedProduct.status === 0) {
				showNotification({ message: t('item_not_available'), severity: 'warning' });
			} else if (selectedProduct.statusWhenSoldOut === 0 && selectedProduct.stock === 0) {
				showNotification({ message: t('item_stock_less_than_zero'), severity: 'warning' });
			} else {
				const isExists = fields?.find((fld) => fld.id === selectedProduct.id);
				if (!isExists) {
					const tempProduct = { ...selectedProduct }
					if (selectedCountryDetail?.iso) {
						const tempProductPrice = tempProduct.productPrices?.find((pp) => pp?.iso === selectedCountryDetail.iso);
						if (tempProductPrice) {
							tempProduct.price = tempProductPrice.price;
							tempProduct.discount = tempProductPrice.discount;
							tempProduct.calculatedPrice = calcDisplayPrice(tempProduct.price, tempProduct.discount, tempProduct?.discountType ?? '');
						} else {
							if (tempProduct.price) {
								tempProduct.price = calcConversionPrice(tempProduct.price, selectedCountryDetail.iso);
								tempProduct.calculatedPrice = calcDisplayPrice(tempProduct.price, tempProduct?.discount ?? 0, tempProduct?.discountType ?? '');
							}
						}
					}
					append(tempProduct);
				} else {
					showNotification({ message: t('item_already_added'), severity: 'warning' });
				}
				setSelectedProduct({});
			}
		} else {
			showNotification({ message: t('no_item_selected'), severity: 'warning' });
		}
	}
	const onProductSelect = (e: React.ChangeEvent<unknown>, value: string | productDetailType | null, reason?: AutocompleteChangeReason, details?: AutocompleteChangeDetails<productDetailType>) => {
		if (value && typeof value !== 'string') {
			setSelectedProduct(value);
		}
	}
	const onProductSearch = async (
		event: React.ChangeEvent<unknown>,
		value: string,
		reason: AutocompleteInputChangeReason,
	) => {
		const prodSuggestions = await searchProductByValue(value);
		setProductSuggestions(prodSuggestions);
	}
	useEffect(() => {
		initiateFetchPaymentMethod();
		initiateFetchOrderStatus();
		initiateFetchCountry();
	}, [initiateFetchOrderStatus, initiateFetchPaymentMethod, initiateFetchCountry])

	const resetForm = () => {
		reset();
	}

	const onSubmit = (data: createOrderFormType) => {
		const orderData = generateOrderCreateReq(data, selectedCountryDetail);
		initiateCreateOrder(orderData);
		reset();
	};
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={8} />
					<Grid item xs={4}>
						<Controller
							name="country"
							control={control}
							render={(props) => (
								<TextField
									select
									label="Country"
									variant="outlined"
									onChange={(e) => props.onChange(e.target.value)}
									value={props.value}
									fullWidth
								>
									{
										countries.map((ctry: CountryType, index) => <MenuItem key={`ctry${index}`} value={ctry.id}>{ctry.country}</MenuItem>)
									}
								</TextField>
							)}
						/>
					</Grid>
					{selectedCountry && <Grid item xs={12}>
						<Paper className={classes.section} elevation={10}>
							<Grid container spacing={2} direction="row" justify="flex-start">
								<Grid item xs={12}>
									<Typography variant="h6" align="left">{t('customer_information')}</Typography>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="firstName"
										label={t('first_name')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('firstname_validation'),
											},
										})}
										error={!!(errors)?.firstName}
										helperText={(errors)?.firstName?.message ?? ''} >
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="lastName"
										label={t('last_name')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('lastname_validation'),
											},
										})}
										error={!!(errors)?.lastName}
										helperText={(errors)?.lastName?.message ?? ''} >
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="email"
										label={t('email')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('email_validation'),
											},
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: t('invalid_email_validation'),
											}
										})}
										error={!!(errors)?.email}
										helperText={(errors)?.email?.message ?? ''}>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="phone"
										label={t('phone')}
										variant="outlined"
										InputProps={{
											startAdornment: <InputAdornment position="start">{selectedCountryDetail?.telephoneCode ?? ''}</InputAdornment>,
										}}
										inputRef={register({
											required: {
												value: true,
												message: t('phone_validation'),
											},
										})}
										error={!!(errors)?.phone}
										helperText={(errors)?.phone?.message ?? ''}>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="address1"
										label={t('address_1')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('address1_validation'),
											},
										})}
										error={!!(errors)?.address1}
										helperText={(errors)?.address1?.message ?? ''}>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="address2"
										label={t('address_2')}
										variant="outlined"
										inputRef={register}
									>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="city"
										label={t('city')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('city_validation'),
											},
										})}
										error={!!(errors)?.city}
										helperText={(errors)?.city?.message ?? ''}>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="zipCode"
										label={t('zip_code')}
										variant="outlined"
										inputRef={register({
											required: {
												value: true,
												message: t('zipcode_validation'),
											},
										})}
										error={!!(errors)?.zipCode}
										helperText={(errors)?.zipCode?.message ?? ''}>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="countryCode"
										label={t('country_code')}
										variant="outlined"
										defaultValue={selectedCountryDetail?.countryCode ?? ''}
										inputRef={register}
										inputProps={{ readOnly: true }}
									>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="reference"
										label={t('reference')}
										variant="outlined"
										inputRef={register}
										defaultValue={loggedInUser?.name ?? ''}>
									</TextField>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					}
					{selectedCountry && <Grid item xs={12}>
						<Paper className={classes.section} elevation={10}>
							<Grid container spacing={2} direction="row" justify="flex-start">
								<Grid item xs={12}>
									<Typography variant="h6" align="left">{t('search_product')}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
										autoComplete
										includeInputInList
										freeSolo
										filterOptions={(options, state) => options}
										options={productSuggestions}
										value={selectedProduct}
										getOptionLabel={(option: Partial<ProductType>) => option.itemNumber ? `${option.itemNumber} - ${option.title}` : ""}
										onChange={onProductSelect} // click on the show tags
										onInputChange={onProductSearch} //** on every input change hitting my api**
										renderInput={(params: AutocompleteRenderInputParams) => (
											<TextField
												{...params}
												variant="outlined"
												label={t('search_product_text')}
												fullWidth
											/>)} />
								</Grid>
								<Grid item xs={3}>
									<Button variant="contained" color="primary" onClick={handleAddProduct}>
										{t('add_product')}
									</Button>
								</Grid>
								{
									fields.map((item, index) => (
										<Grid container key={item.id}>
											<Grid item xs={1}>
												<TextField
													name={`products[${index}].qty`}
													label="Qty"
													variant="outlined"
													defaultValue={1}
													onChange={(e) => {
														let tmpQty;
														if (e.target.value && e.target.value !== "") {
															tmpQty = parseInt(e.target.value, 10);
														} else {
															tmpQty = 0;
														}
														setValue(`products[${index}].total` as never, tmpQty * item.calculatedPrice);
													}}
													inputRef={register()}>
												</TextField>
												<TextField
													style={{ display: 'none' }}
													name={`products[${index}].productId`}
													variant="outlined"
													defaultValue={item.webshopId}
													inputRef={register()}>
												</TextField>
												<TextField
													style={{ display: 'none' }}
													name={`products[${index}].variantId`}
													variant="outlined"
													defaultValue={item.variantId}
													inputRef={register()}>
												</TextField>
											</Grid>
											<Grid item xs={2}>
												<TextField
													name={`products[${index}].itemNumber`}
													label="Item Number"
													variant="outlined"
													defaultValue={item.itemNumber}
													inputRef={register()}>
												</TextField>
											</Grid>
											<Grid item xs={3}>
												<TextField
													name={`products[${index}].title`}
													label="Title"
													variant="outlined"
													defaultValue={item.title}
													inputRef={register()}>
												</TextField>
											</Grid>
											<Grid item xs={2}>
												<TextField
													name={`products[${index}].calculatedPrice`}
													label="Price"
													variant="outlined"
													defaultValue={item.calculatedPrice}
													inputRef={register()}
													InputProps={{
														endAdornment: <InputAdornment position="start">{selectedCountryDetail?.currency.currency ?? ''}</InputAdornment>,
													}}>
												</TextField>
												<TextField
													style={{ display: 'none' }}
													name={`products[${index}].price`}
													variant="outlined"
													defaultValue={item.price}
													inputRef={register()}
												></TextField>
												<TextField
													style={{ display: 'none' }}
													name={`products[${index}].buyPrice`}
													label="Buy Price"
													variant="outlined"
													defaultValue={item.calculatedBuyingPrice}
													inputRef={register()}
												></TextField>
											</Grid>
											<Grid item xs={2}>
												<TextField
													name={`products[${index}].discount`}
													label="Discount"
													variant="outlined"
													defaultValue={item.discount ?? 0}
													inputRef={register()}>
												</TextField>
											</Grid>
											<Grid item xs={1}>
												<IconButton
													size="small"
													color="primary"
													onClick={() => remove(index)}>
													<DeleteIcon />
												</IconButton>
											</Grid>
										</Grid>
									))
								}
							</Grid>
						</Paper>
					</Grid>
					}
					{selectedCountry && <Grid item xs={12}>
						<Paper className={classes.section} elevation={10}>
							<Grid container spacing={2} direction="row" justify="flex-start">
								<Grid item xs={12}>
									<Typography variant="h6" align="left">{t('delivery')}</Typography>
								</Grid>
								<Grid item xs={4}>
									<Controller
										name="deliveryMethod"
										control={control}
										rules={{
											required: {
												value: true,
												message: t('delivery_method_validation'),
											},
										}}
										render={(props) => (
											<TextField
												select
												label={t('delivery_method')}
												variant="outlined"
												onChange={(e) => props.onChange(e.target.value)}
												value={props.value}
												fullWidth
												error={!!(errors)?.deliveryMethod}
												helperText={(errors)?.deliveryMethod?.message ?? ''}
											>
												{
													countryDeliveryMethods.map((dm: DeliveryMethodType, index) => <MenuItem key={`dm${index}`} value={dm.id}>{dm.title}</MenuItem>)
												}
											</TextField>
										)}
									/>
								</Grid>
								<Grid item xs={8}>
									<TextField
										name="deliveryComments"
										label={t('delivery_comments')}
										variant="outlined"
										inputRef={register}>
									</TextField>
								</Grid>
								<Grid item xs={4}>
									<TextField
										name="deliveryCost"
										label={t('delivery_cost')}
										variant="outlined"
										inputRef={register}
										onBlur={updateTotalAmount}
										defaultValue={0}
										InputProps={{
											endAdornment: <InputAdornment position="start">{selectedCountryDetail?.currency.currency ?? ''}</InputAdornment>,
										}}>
									</TextField>
								</Grid>
								<Grid item xs={4}>
									<Controller
										name="deliveryPayment"
										control={control}
										rules={{
											required: {
												value: true,
												message: t('delivery_payment_validation'),
											},
										}}
										render={(props) => (
											<TextField
												select
												label={t('delivery_payment')}
												variant="outlined"
												onChange={(e) => props.onChange(e.target.value)}
												value={props.value}
												fullWidth
												error={!!(errors)?.deliveryPayment}
												helperText={(errors)?.deliveryPayment?.message ?? ''}
											>
												{
													countryPaymentMethods.map((pymt: PaymentMethodType, index) => <MenuItem key={`pymt${index}`} value={pymt.id}>{pymt.paymentMethodTitle}</MenuItem>)
												}
											</TextField>
										)}
									/>
								</Grid>


							</Grid>
						</Paper>
					</Grid>
					}
					{selectedCountry && <Grid item xs={12}>
						<Paper className={classes.section} elevation={10}>
							<Grid container spacing={2} direction="row" justify="flex-start">
								<Grid item xs={12}>
									<Typography variant="h6" align="left">General</Typography>
								</Grid>
								<Grid item xs={4}>
									<Controller
										name="status"
										control={control}
										render={(props) => (
											<TextField
												select
												label="Order Status"
												variant="outlined"
												onChange={(e) => props.onChange(e.target.value)}
												value={props.value}
												fullWidth
											>
												{
													orderStatuses.map((os: OrderStatusType, index) => <MenuItem key={`os_${index}`} value={os.id}>{os.title}</MenuItem>)
												}
											</TextField>
										)}
									/>
								</Grid>
								<Grid item xs={8}>
									<TextField
										name="comments"
										label={t('order_comment')}
										variant="outlined"
										inputRef={register}>
									</TextField>
								</Grid>
								<Grid item xs={3}>
									<TextField
										name="iso"
										label="ISO"
										variant="outlined"
										defaultValue={selectedCountryDetail?.iso ?? ''}
										inputRef={register}
										inputProps={{ readOnly: true }}>
									</TextField>
								</Grid>
								<Grid item xs={3}>
									<TextField
										name="vat"
										label="VAT"
										variant="outlined"
										defaultValue={selectedCountryDetail?.vat ?? ''}
										inputRef={register}
										inputProps={{ readOnly: true }}>
									</TextField>
								</Grid>
								<Grid item xs={3}>
									<TextField
										name="totalAmount"
										label="Total"
										variant="outlined"
										defaultValue={0}
										inputRef={register()}
										inputProps={{ readOnly: true }}
										InputProps={{
											endAdornment: <InputAdornment position="start">{selectedCountryDetail?.currency.currency ?? ''}</InputAdornment>,
										}}>
									</TextField>
								</Grid>
								<Grid item xs={3}>
									<TextField
										name="totalMargin"
										label="Margin"
										variant="outlined"
										defaultValue={0}
										inputRef={register()}
										inputProps={{ readOnly: true }}
									>
									</TextField>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					}
					<Grid item xs={8} />
					{selectedCountry && <Grid item xs={2} style={{ paddingTop: 20 }}>
						<Button variant="contained" color="primary" onClick={resetForm}>
							{t('reset')}
						</Button>
					</Grid>
					}
					{selectedCountry && <Grid item xs={2} style={{ paddingTop: 20 }}>
						<Button variant="contained" color="primary" type="submit">
							{t('order_create_button')}
						</Button>
					</Grid>
					}
				</Grid>
			</form>
		</Paper>
	);
};

export default connector(CreateOrder);
