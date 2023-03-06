import PDFMerger from 'pdf-merger-js/browser';
import React, { useEffect, useState } from 'react';
import { isValid } from '../shared/utils';

// files: Array of PDF File or Blob objects
const Merger = (files: any) => {
	const [mergedPdfUrl, setMergedPdfUrl] = useState<string>();

	useEffect(() => {
		const render = async () => {
			const merger = new PDFMerger();

			for (const file of files) {
				await merger.add(file)
			}

			const mergedPdf = await merger.saveAsBlob();
			const url = URL.createObjectURL(mergedPdf);

			return setMergedPdfUrl(url);
		};

		render().catch((err) => {
			throw err;
		});

		() => setMergedPdfUrl('');
	}, [files, setMergedPdfUrl]);

	return (

		isValid(mergedPdfUrl) &&
		<iframe
			height={1000}
			src={`${mergedPdfUrl}`}
			title='pdf-viewer'
			width='100%s'
		></iframe>

	);
};

export default Merger;