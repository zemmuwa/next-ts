export interface IApiData<T> {
	code: number
	success: boolean
	message: string
	data?: T
	token?: string
	meta?: Meta
}

export interface Meta {
	pagination: number;
	limit: number;
	totalPage: number;
	count: number;
}
