let API_URL: string | undefined
if (process.env.NODE_ENV === "production") {
	API_URL = process.env.REACT_APP_API_BASE_URL
} else {
	API_URL = process.env.REACT_APP_API_BASE_URL_DEV
}

interface ReqConfig extends Omit<RequestInit, "body"> {
	body?: object
}

const client = (endpoint: string, { body, ...customConfig }: ReqConfig = {}) => {
	const config: RequestInit = {
		method: body ? "POST" : "GET",
		...customConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...customConfig.headers,
		},
	}

	if (body) {
		config.body = JSON.stringify(body)
	}

	return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
		// Return if there is no response body
		if (response.status === 204) return { success: true }

		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

export default client
