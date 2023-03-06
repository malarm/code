import React from 'react'
import { useBarcode } from 'react-barcodes';

export type BarCodeProps = {
	inputValue: string;
}

const BarCode = (props: BarCodeProps) => {
	const { inputValue } = props;
	const { inputRef } = useBarcode({
		value: inputValue,
		options: {
			background: 'transparent',
			height: 50
		}
	});


	return <canvas ref={inputRef} />;
}

export default BarCode;
