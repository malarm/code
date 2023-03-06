export type User = {
	id?: number,
	roles?: Array<string>,
	name: string;
	initialName: string,
	email: string,
	phone: string,
	jobTitle: string,
	officeLocation: string,
	preferredLanguage: string,
}

export type JwtPayload = {
	user: User,
	iat: number,
	exp: number,
}
