export type PaginatedData<Data = unknown> = {
	count: number;
	data: Data[];
	totalPages: number;
	currentPage: number;
}
