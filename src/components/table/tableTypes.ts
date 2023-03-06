export type TableField = {
	label: string;
	field: string;
	sortField?: string;
	isLink?: boolean;
	link?: string;
};

export type sortCriteriaType = {
	order: any;
	orderBy: string;
};

export type ToolbarProps = {
	title: string;
	itemFormName: string;
	changeSearch?: (field: string) => void;
	searchCriteria?: string;
	showFilter?: boolean;
};

export type pagingProps = {
	totalCount: number;
	totalPages: number;
	page: number;
	size: number;
};

export type TablePaginationActionsProps = {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (page: number) => any;
};

export type TableProps = {
	title: string;
	items: Array<any>;
	fields: Array<TableField>;
	hasActions: boolean;
	itemFormName: string;
	titleField: string;
	showLoading: boolean;
	showAddAction?: boolean;
	showEditAction?: boolean;
	showFilter?: boolean;
	deleteAction?: (id: number) => void;
	sortCriteria?: sortCriteriaType;
	changeSort?: (field: string) => void;
	searchCriteria?: string;
	changeSearch?: (field: string) => void;
	pagingInfo?: pagingProps;
	handlePageChange?: (page: number) => void;
	handlePageSizeChange?: (size: number) => void;
	showDetailPage?: boolean;
	showCheckbox?: boolean;
	showWarrantyAction?: boolean;
	routeToDetail?: (id: number, mode: string) => void;
	routeToWarrantyDetails?: (id: number, mode: string) => void;
};

export type TableViewProps = {
	title: string;
	items: Array<any>;
	showActions: boolean;
	showLoading: boolean;
	itemFormName: string;
	openItemDialog?: (state: boolean) => void;
	setCurrItem?: (currItem: any) => void;
	fields: Array<TableField>;
	setActionMode?: (state: string) => void;
	showFilter?: boolean;
	showEditAction?: boolean;
	deleteAction?: (id: number) => void;
	sortCriteria?: sortCriteriaType;
	changeSort?: (field: string) => void;
	searchCriteria?: string;
	changeSearch?: (field: string) => void;
	subTable?: boolean;
	pagingInfo?: pagingProps;
	handlePageChange?: (page: number) => void;
	handlePageSizeChange?: (size: number) => void;
	showCheckbox?: boolean;
	showWarrantyAction?: boolean;
	routeToDetail?: (id: number, mode: string) => void;
	routeToWarrantyDetails?: (id: number, mode: string) => void;
};

export type DataGridProps = {
	title: string;
	items: Array<any>;
	showActions: boolean;
	// showLoading: boolean;
	itemFormName: string;
	openItemDialog?: (state: boolean) => void;
	setCurrItem?: (currItem: any) => void;
	fields: Array<any>;
	setActionMode?: (state: string) => void;
	showFilter?: boolean;
	showEditAction?: boolean;
	deleteAction?: (id: number) => void;
	sortCriteria?: sortCriteriaType;
	changeSort?: (field: string) => void;
	searchCriteria?: string;
	changeSearch?: (field: string) => void;
	subTable?: boolean;
	pagingInfo?: pagingProps;
	handlePageChange?: (page: number) => void;
	handlePageSizeChange?: (size: number) => void;
	showCheckbox?: boolean;
	showWarrantyAction?: boolean;
	open?: boolean;
	setEditView?: (state: boolean) => void;
	routeToDetail?: (id: number, mode: string) => void;
	handleColumnVisibilityChange?: (field: string, isVisible: boolean) => void;
};

export type TableItemDialogProps = {
	open: boolean;
	titleField: string;
	currItem: any;
	openItemDialog: (state: boolean) => void;
	actionMode: string;
};

export type FilterDialogProps = {
	open: boolean;
	openFilterDialog: (state: boolean) => void;
};
