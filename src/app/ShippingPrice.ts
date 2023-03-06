export const ShippingPriceList = [{
	Country: "DK",
	ShippingCostSmall: 80,
	ShippingCostLarge: 250
},
{
	Country: "NO",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1500
},
{
	Country: "SE",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1000
},
{
	Country: "UK",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1500
},
{
	Country: "DE",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1000
},
{
	Country: "CH",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1000
},
{
	Country: "NL",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1000
},
{
	Country: "DK2",
	ShippingCostSmall: 80,
	ShippingCostLarge: 250
},
{
	Country: "UK2",
	ShippingCostSmall: 150,
	ShippingCostLarge: 1000
}];

export const shippingPriceCalculation = (country: string | undefined, grossWeight: number | undefined) => {
	if (!country || !grossWeight) {
		return 0;
	}
	let selectedShipping = ShippingPriceList.filter(x => x.Country === country);
	if (selectedShipping.length == 0) {
		selectedShipping = ShippingPriceList.filter(x => x.Country === 'DE')
	}
	if (grossWeight > 0 && selectedShipping.length > 0) {
		if (grossWeight > 80) {
			return selectedShipping[0].ShippingCostLarge;
		}
		return selectedShipping[0].ShippingCostSmall;
	}
	return 0;
}
