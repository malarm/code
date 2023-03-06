import PDFMerger from "pdf-merger-js/browser";

export const JSONDataSort = <T>(column: string,
	sortColumn: string,
	setSortColumn: (value: string) => void,
	sortDirection: string,
	setSortDirection: (value: 'ASC' | 'DESC') => void,
	data: T[],
	setData: (value: T[]) => void) => {
	let currentDirection: 'ASC' | 'DESC' = 'ASC';
	if (sortColumn === column) {
		if (sortDirection === 'ASC') {
			currentDirection = 'DESC';
		} else {
			currentDirection = 'ASC';
		}
	} else {
		setSortColumn(column);
		currentDirection = 'ASC';
	}
	setSortDirection(currentDirection);

	const sortedData = [...data];
	sortedData.sort((a, b) => {
		const sortA = Object(a)[column];
		const sortB = Object(b)[column];
		if (sortA > sortB) {
			return currentDirection === 'ASC' ? 1 : -1;
		}
		if (sortA < sortB) {
			return currentDirection === 'ASC' ? -1 : 1;
		}
		return 0;
	});
	setData(sortedData);
}

export const isValid = (value: string | null | undefined) => value !== null && value !== undefined && value !== '';

export const decodeInput = (input1: string | null | undefined, input2: string | null | undefined): string => {
	return String(isValid(input1) ? input1 : (isValid(input2) ? input2 : ''));
}

export const calcWebshopPrice = (price: number, vat: number, discount: number) => {
	if (price != null) {
		const calPrice = (price - discount) * ((vat / 100) + 1);
		return calPrice / 100;
	}
	return price;
}
export const roundToTwo = (num: number) => +(num.toFixed(2));

//function for format number remove decimals and give space for every thousand
export const formatNumber = (num: number, digits = 0) => num.toFixed(digits).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

export const printDocument = async (inputValue: string) => {
	if (isValid(inputValue)) {
		const response = await fetch(`data:application/pdf;base64,${inputValue}`);
		const fileURL = URL.createObjectURL(await response.blob());
		window.open(fileURL);
	}
}

export const MergePDFFileReturnsUrl = async (files: string[]) => {
	if (files.length > 0) {
		const merger = new PDFMerger();
		for (const file of files) {
			const response = await fetch(`data:application/pdf;base64,${file}`);
			await merger.add(await response.blob())
		}
		const mergedPdf = await merger.saveAsBlob();
		const url = URL.createObjectURL(mergedPdf);
		return url;
	} else {
		return null;
	}
}
