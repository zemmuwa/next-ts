import { IApiData } from '../../interfaces/InterfaceApiData'
import { getSession, useSession } from 'next-auth/react'
type METHODS = 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE'

const ConsumeApi = async <Type>(
	url: string,
	method: METHODS,
	optional?: { body?: any; tokenArg?: string; header?: any; noJson?: boolean }
): Promise<IApiData<Type>> => {
	let json: IApiData<Type> = {
		code: 400,
		data: undefined,
		message: 'Server Error',
		success: false,
	}
	try {
		const secureData = await getSession()
		const  token = secureData
			? JSON.parse(secureData.user.token|| '')
			: null
		const  value  = token ? JSON.parse(token) : null
		const bearer = optional?.tokenArg
			? `Bearer ${optional?.tokenArg}`
			: value
			? `Bearer ${value}`
			: ''
		let bodyData = undefined
		if (optional?.body && !optional.noJson)
			bodyData = JSON.stringify(optional.body)
		else if (optional?.body && optional.noJson) bodyData = optional.body

		const response = await fetch(`${process.env.BASE_URL}${url}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: bearer,
				...optional?.header,
			},
			method,
			body: bodyData,
		})
		json = await response.json()
	} catch (error) {
		console.error(error)
	} finally {
		return json
	}
}

export default ConsumeApi
